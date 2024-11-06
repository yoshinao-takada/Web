import { RMatrix } from "./RMatrix.js";
import { RTestUtils } from "./RTestUtils.js"

export class RMatrixUT extends RTestUtils {
    static IdentityUT() {
        let result = true;
        do {
            let imat = RMatrix.Identity(3);
            imat.print();
        } while(false);
        console.log(`IdentityUT() = ${result}`);
        return result;
    }

    static addUT() {
        let result = true;
        do {
            let m0 = new RMatrix(2, 3);
            m0.elements = [1.0, 2.0, 3.0, -1.0, -2.0, -3.0];
            let m1 = new RMatrix(2, 2);
            result = false;
            try {
                let msum = m0.add(m1);
            } catch (exp) {
                result = true;
            }
            m1 = new RMatrix(2, 3);
            m1.elements = [-1.0, -2.0, -3.0, 1.0, 2.0, 3.0];
            let msum2 = m0.add(m1);
            if (this.AreNotEqual(msum2.elements[0], this._0, this._tol) ||
                this.AreNotEqual(msum2.elements[1], this._0, this._tol) ||
                this.AreNotEqual(msum2.elements[2], this._0, this._tol) ||
                this.AreNotEqual(msum2.elements[3], this._0, this._tol) ||
                this.AreNotEqual(msum2.elements[4], this._0, this._tol) ||
                this.AreNotEqual(msum2.elements[5], this._0, this._tol)) {
                    console.log('Fail @ addUT()');
                    result = false;
                    break;
                }
        } while (false);
        console.log(`addUT() = ${result}`);
        return result;
    }

    static addIpUT() {
        let result = true;
        do {
            let m0 = new RMatrix(2, 3);
            m0.elements = [1.0, 2.0, 3.0, -1.0, -2.0, -3.0];
            let m1 = new RMatrix(2, 3);
            m1.elements = [-1.0, -2.0, -3.0, 1.0, 2.0, 3.0];
            m0.addIp(m1);
            if (this.AreNotEqual(m0.elements[0], this._0, this._tol) ||
                this.AreNotEqual(m0.elements[1], this._0, this._tol) ||
                this.AreNotEqual(m0.elements[2], this._0, this._tol) ||
                this.AreNotEqual(m0.elements[3], this._0, this._tol) ||
                this.AreNotEqual(m0.elements[4], this._0, this._tol) ||
                this.AreNotEqual(m0.elements[5], this._0, this._tol)) {
                    console.log('Fail @ addIpUT()');
                    result = false;
                    break;
                }
        } while (false);
        console.log(`addIpUT() = ${result}`);
        return result;
    }

    static subtractUT() {
        let result = true;
        do {
            let m0 = new RMatrix(2, 3);
            m0.elements = [1.0, 2.0, 3.0, -1.0, -2.0, -3.0];
            let m1 = new RMatrix(2, 3);
            m1.elements = [-1.0, -2.0, -3.0, 1.0, 2.0, 3.0];
            let mdiff = m0.subtract(m1);
            if (this.AreNotEqual(mdiff.elements[0], 2.0, this._tol) ||
                this.AreNotEqual(mdiff.elements[1], 4.0, this._tol) ||
                this.AreNotEqual(mdiff.elements[2], 6.0, this._tol) ||
                this.AreNotEqual(mdiff.elements[3], -2.0, this._tol) ||
                this.AreNotEqual(mdiff.elements[4], -4.0, this._tol) ||
                this.AreNotEqual(mdiff.elements[5], -6.0, this._tol)) {
                    console.log('Fail @ subtractUT()');
                    result = false;
                    break;
                }
        } while (false);
        console.log(`subtractUT() = ${result}`);
        return result;
    }

    static subtractIpUT() {
        let result = true;
        do {
            let m0 = new RMatrix(2, 3);
            m0.elements = [1.0, 2.0, 3.0, -1.0, -2.0, -3.0];
            let m1 = new RMatrix(2, 3);
            m1.elements = [-1.0, -2.0, -3.0, 1.0, 2.0, 3.0];
            m0.subtractIp(m1);
            if (this.AreNotEqual(m0.elements[0], 2.0, this._tol) ||
                this.AreNotEqual(m0.elements[1], 4.0, this._tol) ||
                this.AreNotEqual(m0.elements[2], 6.0, this._tol) ||
                this.AreNotEqual(m0.elements[3], -2.0, this._tol) ||
                this.AreNotEqual(m0.elements[4], -4.0, this._tol) ||
                this.AreNotEqual(m0.elements[5], -6.0, this._tol)) {
                    console.log('Fail @ subtractIpUT()');
                    result = false;
                    break;
                }
        } while (0);
        console.log(`subtractIpUT() = ${result}`);
        return result;
    }

    static transposeUT() {
        let result = true;
        do {
            let m0 = new RMatrix(2, 3);
            m0.elements = [1.0, 2.0, 3.0, -1.0, -2.0, -3.0];
            let m1 = m0.transpose();
            for (let row = 0; row < 2; row++) {
                for (let col = 0; col < 3; col++) {
                    if (this.AreNotEqual(m0.get(row,col), m1.get(col, row), this._tol)) {
                        result = false;
                        console.log('Fail @ transposeUT()');
                        break;
                    }
                }
                if (!result) break;
            }
        } while (false);
        console.log(`transposeUT() = ${result}`);
        return result;
    }

    static multiplyUT() {
        let result = true;
        do {
            let m0 = new RMatrix(2, 3);
            m0.elements = [
                1.0, 2.0, 3.0,
                -1.0, -2.0, -3.0
            ];
            let m1 = new RMatrix(3, 2);
            m1.elements = [
                1, 2,
                3, 4,
                5, 6
            ];
            let mprod = m0.multiply(m1);
            if (this.AreNotEqual(22.0, mprod.get(0,0), this._tol) ||
                this.AreNotEqual(28.0, mprod.get(0,1), this._tol) ||
                this.AreNotEqual(-22.0, mprod.get(1, 0), this._tol) ||
                this.AreNotEqual(-28.0, mprod.get(1,1), this._tol)) {
                    result = false;
                    console.log('Fail @ multiplyUT()');
                    break;
                }
        } while (false);
        console.log(`multiplyUT() = ${result}`);
        return result;
    }

    static mergeColUT() {
        let result = true;
        do {
            let m0 = new RMatrix(3, 2);
            m0.elements = [
                1.0, 2.0,
                3.0, 4.0,
                5.0, 6.0,
            ];
            let m1 = new RMatrix(3, 1);
            m1.elements = [
                -1.0,
                -2.0,
                -3.0,
            ];
            let mmerged = m0.mergeCol(m1);
            let vref = [
                1.0, 2.0, -1.0,
                3.0, 4.0, -2.0,
                5.0, 6.0, -3.0,
            ];
            if ((mmerged.rows != m0.rows) || 
                (mmerged.columns != (m0.columns + m1.columns))) {
                    result = false;
                    console.log("Fail @ mergeColUT(), resulted size mismatch.");
                    break;
            }
            for (let i = 0; i < vref.length; i++) {
                if (this.AreNotEqual(vref[i], mmerged.elements[i], this._tol)) {
                    result = false;
                    console.log("Fail @ mergedColUT(), element mismatch.");
                    break;
                }
            }
        } while (false);
        console.log(`mergeColUT() = ${result}`);
        return result;
    }

    static scaleRowUT() {
        let result = true;
        do {
            let m0 = new RMatrix(2, 3);
            m0.elements = [
                0.1, 0.2, 0.3,
                1.0, 2.0, 3.0,
            ];
            let m1 = m0.clone();
            m1.scaleRow(0, 2.0);
            let vref = [
                0.2, 0.4, 0.6,
                1.0, 2.0, 3.0,
            ];
            for (let i = 0; i < vref.length; i++) {
                if (this.AreNotEqual(vref[i], m1.elements[i], this._tol)) {
                    result = false;
                    console.log("Fail @ scaleRowUT(), element mismatch.");
                    break;
                }
            }
        } while (false);
        console.log(`scaleRowUT() = ${result}`);
        return result;
    }

    static scaleAddRowUT() {
        let result = true;
        do {
            let m0 = new RMatrix(3,3);
            m0.elements = [
                1.0, 2.0, 3.0,
                1.0, 1.0, 0.5,
                0.0, 2.0, 3.0,
            ];

            m0.scaleAddRow(2, 1, -2.0);
            let vref = [
                1.0, 2.0, 3.0,
                1.0, 1.0, 0.5,
                -2.0, 0.0, 2.0,
            ];
            for (let i = 0; i < vref.length; i++) {
                if (this.AreNotEqual(vref[i], m0.elements[i], this._tol)) {
                    result = false;
                    console.log('Fail @ scaleAddRowUT(), element mismatch.');
                    break;
                }
            }
        } while(false);
        console.log(`scaleAddRowUT() = ${result}`);
        return result;
    }

    static rightSubmatUT() {
        let result = true;
        do {
            let m0 = new RMatrix(3,3);
            m0.elements = [
                1.0, 2.0, 3.0,
                -1.0, -2.0, -3.0,
                3.0, 2.0, 1.0,
            ];
            let m1 = m0.rightSubmat(1);
            if (m1.rows != m0.rows || m1.columns != 2) {
                result = false;
                console.log('Fail @ rightSubmatUT(), size mismatch');
                break;
            }
            let vref = [
                2.0, 3.0,
                -2.0, -3.0,
                2.0, 1.0,
            ];
            for (let i = 0; i < vref.length; i++) {
                if (this.AreNotEqual(vref[i], m1.elements[i], this._tol)) {
                    result = false;
                    console.log('Fail @ rightSubmatUT(), element mismatch');
                    break;
                }
            }
        } while (false);
        console.log(`rightSubmatUT() = ${result}`);
        return result;
    }

    static swapRowsUT() {
        let result = true;
        do {
            let m0 = new RMatrix(3,3);
            m0.elements = [
                1.0, 2.0, 3.0,
                -1.0, -2.0, -3.0,
                3.0, 2.0, 1.0,
            ];
            m0.swapRows(0, 1);
            m0.swapRows(1, 2);
            let vref = [
                -1.0, -2.0, -3.0,
                3.0, 2.0, 1.0,
                1.0, 2.0, 3.0,
            ];
            for (let i = 0; i < vref.length; i++) {
                if (this.AreNotEqual(vref[i], m0.elements[i], this._tol)) {
                    result = false;
                    console.log('Fail @ swapRows(), element mismatch.');
                    break;
                }
            }
        } while (false);
        console.log(`swapRowsUT() = ${result}`);
        return result;
    }

    static findPivotUT() {
        let result = true;
        do {
            let m = new RMatrix(4, 4);
            m.elements = [
                1, 2, 3, 4,
                2, 1, 0.5, 1,
                3, 3, 3, 4,
                5, 0, 15, 20,
            ];
            let newPv = m.findPivot(0);
            if (newPv != 1) {
                result = false;
                console.log('Fail @ findPivotUT()');
                break;
            }
            m.elements = [
                1, 2, 3, 4,
                0, 1, 0.5, 1,
                0, 3, 1, 1,
                0, 100, 15, 20,
            ];
            newPv = m.findPivot(1);
            if (newPv != 3) {
                result = false;
                console.log('Fail @ findPivotUT()');
                break;
            }
        } while (false);
        console.log(`findPivotUT() = ${result}`);
        return result;
    }

    static solveUT() {
        let result = true;
        do {
            let m = new RMatrix(3,3);
            m.elements = [
                0,1,2,
                4,-2,3,
                -1,-1,-1,
            ];
            let rhs = new RMatrix(3,2);
            rhs.elements = [
                0,1,
                1,2,
                -1,-2,
            ];
            let x = m.solve(rhs);
            let xRef = [
                0.7272727272727272, 1,
                0.5454545454545454, 1,
                -0.27272727272727272, 0,
            ];
            for (let i = 0; i < xRef.length; i++) {
                if (this.AreNotEqual(xRef[i], x.elements[i], this._tol)) {
                    result = false;
                    console.log('Fail @ solveUT(), m.solve()');
                    break;
                }
            }
        } while (false);
        console.log(`solveUT() = ${result}`);
        return result;
    }

    static invUT() {
        let result = true;
        do {
            let m = new RMatrix(3,3);
            m.elements = [
                0,1,2,
                4,-2,3,
                -1,-1,-1,
            ];
            let invm = m.inv();
            let invm_m = invm.multiply(m);
            for (let row = 0; row < m.rows; row++) {
                for (let column = 0; column < m.columns; column++) {
                    if (this.AreNotEqual(invm_m.get(row, column),
                            (row === column) ? 1.0 : 0.0, this._tol)) {
                        result = false;
                        console.log(`value mismatch @ invUT(), row=${row}, column=${column}`);
                        break;
                    }
                }
                if (!result) break;
            }
        } while (0);
        console.log(`invUT() = ${result}`);
        return result;
    }

    static solveLMSUT() {
        let result = true;
        do {
            let x = new RMatrix(3, 2);
            x.elements = [
                0.0, 1.0,
                1.2, 2.5,
                -3.0, -0.5,
            ];
            let m = new RMatrix(5, 3);
            m.elements = [
                1.0, 2.0, 3.0,
                -1.2, 2.0, 3.0,
                -1.2, -2.0, 3.0,
                -3.0, 1.0, 0.5,
                -1.0, 1.0, 0.5,
            ];
            let rhs = m.multiply(x);
            let xSolved = m.solveLMS(rhs);
            for (let i = 0; i < x.elements.length; i++) {
                if (this.AreNotEqual(x.elements[i], xSolved.elements[i], this._tol)) {
                    result = false;
                    console.log('Value mismatch @ solveLMSUT()');
                    break;
                }
            }
        } while (false);
        return result;
    }

    static allUT() {
        let result = true;
        do {
            result = this.IdentityUT();
            if (!result) {
                console.log('Fail in IdentityUT()');
                break;
            }
            result = this.addUT();
            if (!result) {
                console.log('Fail in addUT()');
                break;
            }
            result = this.addIpUT();
            if (!result) {
                console.log('Fail in addIpUT()');
                break;
            }
            result = this.subtractUT();
            if (!result) {
                console.log('Fail in subtractUT()');
                break;
            }
            result = this.subtractIpUT();
            if (!result) {
                console.log('Fail in subtractIpUT()');
                break;
            }
            result = this.transposeUT();
            if (!result) {
                console.log('Fail in transposeUT()');
                break;
            }
            result = this.multiplyUT();
            if (!result) {
                console.log('Fail in multiplyUT()');
                break;
            }
            result = this.mergeColUT();
            if (!result) {
                console.log('Fail in mergeColUT()');
                break;
            }
            result = this.scaleRowUT();
            if (!result) {
                console.log('Fail in scaleRowUT()');
                break;
            }
            result = this.scaleAddRowUT();
            if (!result) {
                console.log('Fail in scaleAddRowUT()');
                break;
            }
            result = this.rightSubmatUT();
            if (!result) {
                console.log('Fail in rightSubmatUT()');
                break;
            }
            result = this.swapRowsUT();
            if (!result) {
                console.log('Fail in swapRowsUT()');
                break;
            }
            result = this.findPivotUT();
            if (!result) {
                console.log('Fail in findPivotUT()');
                break;
            }
            result = this.solveUT();
            if (!result) {
                console.log('Fail in solveUT()');
                break;
            }
            result = this.invUT();
            if (!result) {
                console.log('Fail in invUT()');
                break;
            }
            result = this.solveLMSUT();
            if (!result) {
                console.log('Fail in solveLMSUT()');
                break;
            }
        } while (false);
        return result;
    }
}
