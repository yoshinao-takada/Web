export function ArrayOffset(array, offs) {
    this.array = array;
    this.offs = offs;
}

ArrayOffset.prototype.get = function(i) {
    return this.array[this.offs + i];
}

ArrayOffset.prototype.set = function(i, val) {
    this.array[this.offs + i] = val;
}

export class RBlas {
    // add two vectors
    // vsum: a real number array to hold sums
    // offssum : beginning of operation in vsum.
    // v0: a real number array
    // offs0: beginning of operation in v0
    // v1: a real number array
    // offs1: beginning of operation in v1
    // count: iteration count
    static add(vsumOffs, v0Offs, v1Offs, count) {
        for (let i = 0; i < count; i++) {
            vsumOffs.array[vsumOffs.offs + i] = 
                v0Offs.array[v0Offs.offs + i] + v1Offs.array[v1Offs.offs + i];
        }
    }

    // add two vectors in-place
    static addIp(v0Offs, v1Offs, count) {
        for (let i = 0; i < count; i++) {
            v0Offs.array[v0Offs.offs + i] += v1Offs.array[v1Offs.offs + i];
        }
    }

    // subtract a vector from another.
    // vdiff: a real number array to hold difference of two vectors
    // offsdiff: beginning of operatioin in vdiff.
    // v0: a real number array
    // offs0: beginning of operation in v0
    // v1: a real number array
    // offs1: beginning of operation in v1
    // count: iteration count
    static subtract(vdiffOffs, v0Offs, v1Offs, count) {
        for (let i = 0; i < count; i++) {
            vdiffOffs.array[vdiffOffs.offs + i] =
                v0Offs.array[v0Offs.offs + i] - v1Offs.array[v1Offs.offs + i];
        }
    }

    // subtract v1 from v0 in-place.
    static subtractIp(v0Offs, v1Offs, count) {
        for (let i = 0; i < count; i++) {
            v0Offs.array[v0Offs.offs + i] -= v1Offs.array[v1Offs.offs + i];
        }
    }

    // scale a vector
    // scaledOffs : scaled vector
    // srcOffs: source vector
    // scale : scaling factor scalar value
    // count : vector size
    static scale(scaledOffs, srcOffs, scale, count) {
        for (let i = 0; i < count; i++) {
            scaledOffs.array[scaledOffs.offs + i] = 
                srcOffs.array[srcOffs.offs + i] * scale;
        }
    }

    // scale a vector in-place
    // voffs : a vector to scale.
    // scale : scaling factor scalar value
    // count : vector size
    static scaleIp(voffs, scale, count) {
        for (let i = 0; i < count; i++) {
            voffs.array[voffs.offs + i] *= scale;
        }
    }

    // add a vector and another scaled vector.
    // sumOffs : resulted vector
    // v0Offs : a vector without scale
    // v1Offs : a vector to scale before addition.
    // scale : scaling factor scalar value
    // count : vector size
    static scaleAdd(sumOffs, v0Offs, v1Offs, scale, count) {
        for (let i = 0; i < count; i++) {
            sumOffs.array[sumOffs.offs + i] =
                v0Offs.array[v0Offs.offs + i] +
                v1Offs.array[v1Offs.offs + i] * scale;
        }
    }

    // add a vector and another scaled vector in-place.
    // sumOffs : resulted vector
    // v1Offs : a vector to scale before addition.
    // scale : scaling factor scalar value
    // count : vector size
    static scaleAddIp(sumOffs, v1Offs, scale, count) {
        for (let i = 0; i < count; i++) {
            sumOffs.array[sumOffs.offs + i] +=
                v1Offs.array[v1Offs.offs + i] * scale;
        }
    }

    // copy a vector to another.
    static copy(dstOffs, srcOffs, count) {
        for (let i = 0; i < count; i++) {
            dstOffs.array[dstOffs.offs + i] = srcOffs.array[srcOffs.offs + i];
        }
    }
    
    // swap two vectors
    static swap(v0Offs, v1Offs, count) {
        for (let i = 0; i < count; i++) {
            let tmp = v0Offs.array[v0Offs.offs + i];
            v0Offs.array[v0Offs.offs + i] = v1Offs.array[v1Offs.offs + i];
            v1Offs.array[v1Offs.offs + i] = tmp;
        }
    }
    
    // product sum of two vectors.
    static prodSum(v0Offs, v1Offs, count) {
        let sum = 0.0;
        for (let i = 0; i < count; i++) {
            sum += v0Offs.array[v0Offs.offs + i] * v1Offs.array[v1Offs.offs + i];
        }
        return sum;
    }

    static absSum(vOffs, count) {
        let sum = 0.0;
        for (let i = 0; i < count; i++) {
            sum += Math.abs(vOffs.array[vOffs.offs + i]);
        }
        return sum;
    }
}