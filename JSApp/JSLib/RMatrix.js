import { RBlas } from "./RBlas.js";
import { ArrayOffset } from "./RBlas.js";

export class RMatrix {
    // constructor creates a matrix of rows x columns.
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.elements = new Array(rows * columns);
        for (let i = 0; i < rows * columns; i++) {
            this.elements[i] = 0.0;
        }
    }

    // create an identity matrix.
    static Identity(rows) {
        let imat = new RMatrix(rows, rows);
        let index = 0;
        for (let row = 0; row < rows; row++) {
            imat.elements[index] = 1.0;
            index += rows + 1;
        }
        return imat;
    }

    // format print the matrix in the console.
    print() {
        console.log(`rows = ${this.rows}, columns = ${this.columns}`);
        for (let row = 0; row < this.rows; row++) {
            let strLine = "";
            for (let column = 0; column < this.columns; column++) {
                strLine += (column === 0) ? "" : ", ";
                strLine += this.elements[column + row * this.columns];
            }
            console.log(strLine);
        }
    }

    // return true if sizes of two matrices mismatch.
    sizeMismatch(m) {
        return (this.rows != m.rows) || (this.columns != m.columns);
    }

    sizeMismatchAbort(m, location) {
        if (this.sizeMismatch(m)) {
            throw new Error(`size mismatch @ ${location}`);
        }
    }
    // add two matrices.
    // this: a matrix
    // m: a matrix
    add(m) {
        this.sizeMismatchAbort(m, "RMatrix.add");
        let msum = new RMatrix(this.rows, this.columns);
        let count = this.rows * this.columns;
        RBlas.add(
            new ArrayOffset(msum.elements, 0), 
            new ArrayOffset(this.elements, 0), 
            new ArrayOffset(m.elements, 0), count);
        return msum;
    }

    // add two matrices in-place
    // this: a matrix
    // m: a matrix
    addIp(m) {
        this.sizeMismatchAbort(m, "RMatrix.addIp");
        let count = this.rows * this.columns;
        RBlas.addIp(
            new ArrayOffset(this.elements, 0),            
            new ArrayOffset(m.elements, 0) , count);
    }

    // subtract a matrix from another one.
    // this: a matrix
    // m: a matrix
    subtract(m) {
        this.sizeMismatchAbort(m, "RMatrix.subtract");
        let mdiff = new RMatrix(this.rows, this.columns);
        let count = this.rows * this.columns;
        RBlas.subtract(
            new ArrayOffset(mdiff.elements, 0), 
            new ArrayOffset(this.elements, 0), 
            new ArrayOffset(m.elements, 0), count);
        return mdiff;
    }

    // subtract a matrix from another one in-place.
    // this: a matrix
    // m: a matrix
    subtractIp(m) {
        this.sizeMismatchAbort(m, "RMatrix.subtractIp");
        let count = this.rows * this.columns;
        RBlas.subtractIp(
            new ArrayOffset(this.elements, 0),
            new ArrayOffset(m.elements, 0), count);
    }

    // create a transpose matrix.
    transpose() {
        let tm = new RMatrix(this.columns, this.rows);
        let srcoffs = 0;
        let dstoffs = 0;
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                tm.elements[dstoffs + column * tm.columns] = this.elements[srcoffs++];
            }
            dstoffs++;
        }
        return tm;
    }

    // multiply two matrices.
    // this: a matrix
    // m: a matrix
    multiply(m) {
        if (this.columns !== m.rows) {
            throw new Error("size mismatch @ RMatrix.multiply");
        }
        let tm = m.transpose();
        let prod = new RMatrix(this.rows, tm.rows);
        let thisArray = new ArrayOffset(this.elements, 0);
        for (let row0 = 0; row0 < this.rows; row0++) {
            let mArray = new ArrayOffset(tm.elements, 0);
            for (let row1 = 0; row1 < tm.rows; row1++) {
                prod.set(row0, row1, RBlas.prodSum(thisArray, mArray, this.columns));
                mArray.offs += tm.columns;
            }
            thisArray.offs += this.columns;
        }
        return prod;
    }

    // clone a matrix.
    // return the clone.
    clone() {
        let newMat = new RMatrix(this.rows, this.columns);
        RBlas.copy(
            new ArrayOffset(newMat.elements, 0),
            new ArrayOffset(this.elements, 0),
            this.elements.length
        )
        return newMat;
    }

    // elements in the row are multiplied by scale.
    scaleRow(row, scale) {
        let rowHead = new ArrayOffset(this.elements, row * this.columns);
        RBlas.scaleIp(rowHead, scale, this.columns);
    }

    // a scaled row is added to another row.
    // rowDst : destination of in-place addition
    // rowToScale : a row to be scaled and added to another row.
    // scale : a scaling factor.
    scaleAddRow(rowDst, rowToScale, scale) {
        let dstHead = new ArrayOffset(this.elements, rowDst * this.columns);
        let srcHead = new ArrayOffset(this.elements, rowToScale * this.columns);
        RBlas.scaleAddIp(dstHead, srcHead, scale, this.columns);
    }

    // merge two matrices in column direction
    // this: left matrix to merge
    // m: right matrix to merge
    // return : merged matrix.
    mergeCol(m) {
        if (this.rows !== m.rows) {
            throw new Error("rows mismatch in mergeCol()");
        }
        let mWork = new RMatrix(this.rows, this.columns + m.columns);
        for (let row = 0; row < this.rows; row++) {
            let dst = new ArrayOffset(mWork.elements, mWork.columns * row);
            let src = new ArrayOffset(this.elements, this.columns * row);
            RBlas.copy(dst, src, this.columns);
            dst.offs += this.columns;
            src = new ArrayOffset(m.elements, m.columns * row);
            RBlas.copy(dst, src, m.columns);
        }
        return mWork;
    }

    // merge two matrices in row direction
    // this: top matrix to merge
    // m: bottom matrix to merge.
    // return: merged matrix.
    mergeRow(m) {
        if (this.columns !== m.columns) {
            throw new Error("columns mismatch in mergeRow()");
        }
        let mWork = new RMatrix(this.rows + m.rows, this.columns);
        let dst = new ArrayOffset(mWork.elements, 0);
        let src = new ArrayOffset(this.elements, 0);
        let copySize = this.rows * this.columns;
        RBlas.copy(dst, src, copySize);
        dst.offs += copySize;
        src = new ArrayOffset(m.elements, 0);
        copySize = m.rows * m.columns;
        RBlas.copy(dst, src, copySize);
        return mWork;
    }

    // get a value of an element.
    get(row, column) {
        return this.elements[column + row * this.columns];
    }

    set(row, column, value) {
        this.elements[column + row * this.columns] = value;
    }

    // get a right side submatrix.
    // column : beginning of the submatrix
    rightSubmat(column) {
        let subcolumns = this.columns - column;
        if (subcolumns <= 0) {
            throw new Error("invalid parameter in rightSubmat()");
        }
        let mSub = new RMatrix(this.rows, subcolumns);
        for (let row = 0; row < this.rows; row++) {
            let dst = new ArrayOffset(mSub.elements, row * mSub.columns);
            let src = new ArrayOffset(this.elements, row * this.columns + column);
            RBlas.copy(dst, src, subcolumns);
        }
        return mSub;
    }

    // swap rows
    // row0: the 1st row to swap.
    // row1: the 2nd row to swap.
    swapRows(row0, row1) {
        if ((row0 >= this.rows) || (row1 >= this.rows)) {
            throw new Error("row out of range.");
        }
        let row0Array = new ArrayOffset(this.elements, row0 * this.columns);
        let row1Array = new ArrayOffset(this.elements, row1 * this.columns);
        RBlas.swap(row0Array, row1Array, this.columns);
    }

    // invert a matrix.
    // this: a matrix to invert.
    // return: the inverted matrix.
    inv() {
        if (this.rows !== this.columns) {
            throw new Error("this is not a square matrix in RMatrix.inv().");
        }
        return this.solve(RMatrix.Identity(this.rows));
    }

    // find the best pivot row.
    // rowpv: row number of the pivot element.
    findPivot(rowpv) {
        // if rowpv is the last row
        if (rowpv === (this.rows - 1)) return rowpv;
        // otherwise
        let tailSpan = this.rows - (rowpv + 1);
        let absPv = Math.abs(this.get(rowpv, rowpv));
        let absTail = RBlas.absSum(
            new ArrayOffset(this.elements, 1 + rowpv + rowpv * this.columns),
            tailSpan);
        let absPvRatio = absPv / absTail;
        let foundRow = rowpv;
        for (let row = rowpv + 1; row < this.rows; row++) {
            let absPvCandidate = Math.abs(this.get(row, rowpv));
            let absTailCandidate = RBlas.absSum(
                new ArrayOffset(this.elements, 1 + rowpv + row * this.columns),
                tailSpan
            );
            let absPvRatioCandidate = absPvCandidate / absTailCandidate;
            if (absPvRatioCandidate > absPvRatio) {
                absPvRatio = absPvRatioCandidate;
                foundRow = row;
            }
        }
        return foundRow;
    }

    // solve a linear equation this*x = rhs;
    // rhs: right hand side matrix.
    // return : x
    solve(rhs) {
        if (this.rows !== this.columns) {
            throw new Error("this is not a square matrix in RMatrix.solve().");
        }
        if (this.rows !== rhs.rows) {
            throw new Error("invalid parameter in RMatrix.solve()")
        }
        let mWork = this.mergeCol(rhs);
        let columnSpan = mWork.columns;
        for (let rowpv = 0; rowpv < mWork.rows; rowpv++) {
            // select the best pivot row.
            let newRowPv = this.findPivot(rowpv);
            if (newRowPv !== rowpv) { // better pivot row was found and swap.
                mWork.swapRows(rowpv, newRowPv);
            }

            // normalize the pivot row.
            let scale = 1.0 / mWork.get(rowpv, rowpv);
            mWork.scaleRow(rowpv, scale);

            // delete elements in a pivot column.
            for (let row = 0; row < mWork.rows; row++) {
                if (row === rowpv) continue;
                scale = -mWork.get(row, rowpv);
                mWork.scaleAddRow(row, rowpv, scale);
            }
        }
        return mWork.rightSubmat(this.columns);
    }

    // solve a redundant linear equation this*x = rhs by LMS algorithm.
    // rhs: right  hand side matrix.
    // return: x
    solveLMS(rhs) {
        if ((this.rows < this.columns) || (this.rows !== rhs.rows)) {
            throw new Error("invalid size in RMatrix.solveLMS()");
        }
        let t = this.transpose();
        let tThis = t.multiply(this);
        let tRhs = t.multiply(rhs);
        return tThis.solve(tRhs);
    }
}