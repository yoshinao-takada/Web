import { RBlas } from "./RBlas.js";
import { ArrayOffset } from "./RBlas.js";
import { RTestUtils } from "./RTestUtils.js"

// Unit test for RBlas.js

export class RBlasUT extends RTestUtils {
    static aRaw0;
    static aRaw1;
    static valMax = 0;

    static initData() {
        this.valMax = 10;
        let arraySize = 2 * this.valMax + 1;
        this.aRaw0 = new Array(arraySize);
        this.aRaw1 = new Array(arraySize);
        for (let i = 0; i < arraySize; i++) {
            this.aRaw0[i] = i - this.valMax; // -10 .. +10
            this.aRaw1[i] = i;              // 0 .. 20
        }
    }

    static arrayOffsUT() {
        let result = true;
        this.initData();
        do {
            let a = new ArrayOffset(this.aRaw0, 3); // -10, -9, -8, -7
            let a0 = a.get(0);
            console.log(`a0 = ${a0}`); // a0 = -7
            if (a0 !== -7) {
                result = false;
                break;
            }
            let a1 = a.get(1);
            console.log(`a1 = ${a1}`); // a1 = -6
            if (a1 !== -6) {
                result = false;
                break;
            }
        } while (false);
        console.log(`arrayOffsetUT() = ${result}`);
        return result;
    }

    static addUT() {
        let result = true;
        this.initData();
        do {
            let a = new ArrayOffset(this.aRaw0, 3); // -7, -6, -5, -4...
            let b = new ArrayOffset(this.aRaw1, 0); // 0,  1,  2,  3,...
            let sumRaw = new Array(10);
            let sum = new ArrayOffset(sumRaw, 5);
            RBlas.add(sum, a, b, 3);
            let sumRef = [-7, -5, -3];
            let indexSum = 5;
            for (let indexRef = 0; indexRef < sumRef.length; indexRef++) {
                if (sumRef[indexRef] !== sumRaw[5 + indexRef]) {
                    result = false;
                    console.log("Fail @ addUT, 58");
                    break;
                }
            }
        } while (false);
        console.log(`addUT() = ${result}`);
        return result;
    }

    static addIpUT() {
        let result = true;
        this.initData();
        do {
            let a = new ArrayOffset(this.aRaw0, 3); // -7, -6, -5, -4...
            let b = new ArrayOffset(this.aRaw1, 2); // 2,  3,  4,  5,...
            RBlas.addIp(a, b, 3);
            let sumRef = [-8, -5, -3, -1, -4];
            let indexSum = 2;
            for (let indexRef = 0; indexRef < sumRef.length; indexRef++) {
                if (this.aRaw0[indexSum] !== sumRef[indexRef]) {
                    result = false;
                    console.log("Fail @ addIpUT, 79");
                    break;
                }
                indexSum++;
            }
        } while (false);
        console.log(`addIpUT() = ${result}`);
        return result;
    }

    static subtractUT() {
        let result = true;
        this.initData();
        do {
            let a = new ArrayOffset(this.aRaw0, 3); // -7, -6, -5, -4...
            let b = new ArrayOffset(this.aRaw1, 0); // 0,  1,  2,  3,...
            let diffRaw = new Array(10);
            let diff = new ArrayOffset(diffRaw, 5);
            RBlas.subtract(diff, a, b, 3);
            let diffRef = [undefined, -7, -7, -7, undefined];
            let indexDiff = 4;
            for (let indexRef = 0; indexRef < diffRef.length; indexRef++) {
                if (diffRaw[indexDiff++] !== diffRef[indexRef]) {
                    result = false;
                    console.log("Fail @ subtractUT, 103");
                    break;
                }
            }
        } while (false);
        console.log(`subtractUT() = ${result}`);
        return result;
    }

    static subtractIpUT() {
        let result = true;
        this.initData();
        do {
            let a = new ArrayOffset(this.aRaw0, 3); // -7, -6, -5, -4...
            let b = new ArrayOffset(this.aRaw1, 0); // 0,  1,  2,  3,...
            RBlas.subtractIp(a, b, 3);
            let diffRef = [-8, -7, -7, -7, -4];
            let indexDiff = 2;
            for (let indexRef = 0; indexRef < diffRef.length; indexRef++) {
                if (this.aRaw0[indexDiff++] !== diffRef[indexRef]) {
                    result = false;
                    console.log("Fail @ subtactIpUT, 123");
                    break;
                }
            }
        } while (false);
        console.log(`subtractIpUT() = ${result}`);
        return result;
    }

    static prodSumUT() {
        let result = true;
        this.initData();
        do {
            let a = new ArrayOffset(this.aRaw0, 3); // -7, -6, -5, -4...
            let b = new ArrayOffset(this.aRaw1, 0); // 0,  1,  2,  3,...
            let prodSum = RBlas.prodSum(a, b, 3);
            if (prodSum !== -16) {
                result = false;
                console.log("Fail @ prodSumUT, 142");
                break;
            }
        } while (false);
        console.log(`prodSumUT() = ${result}`);
        return result;
    }

    static scaleIpUT() {
        let result = true;
        this.initData();
        do {
            let a = new ArrayOffset(this.aRaw0, 3); // -7, -6, -5, -4, ...
            let scale = 2;
            RBlas.scaleIp(a, scale, 4);
            let scaledRef = [-8, -14, -12, -10, -8, -3];
            let indexScaled = 2;
            for (let indexRef = 0; indexRef < scaledRef.length; indexRef++) {
                if (RTestUtils.AreNotEqual(this.aRaw0[indexScaled], scaledRef[indexRef], 1e-6)) {
                    result = false;
                    console.log("Fail in scaleIpUT(), 163");
                    break;
                }
                indexScaled++;
            }
        } while (false);
        console.log(`scaleIpUT() = ${result}`);
        return result;
    }

    static scaleAddIpUT() {
        let result = true;
        this.initData();
        do {
            let a = new ArrayOffset(this.aRaw0, 3); // -7, -6, -5, -4...
            let b = new ArrayOffset(this.aRaw1, 0); // 0,  1,  2,  3,...
            let scale = 2.0;
            RBlas.scaleAddIp(a, b, scale, 3);
            let refData = [-8.0, -7.0, -4.0, -1.0, -4.0];
            let index = 2;
            for (let refIndex = 0; refIndex < refData.length; refIndex++) {
                if (RTestUtils.AreNotEqual(refData[refIndex], this.aRaw0[index], 1.0e-6)) {
                    result = false;
                    console.log("Fail in scaleAddIpUT(), 186");
                    break;
                }
                index++;
            }
        } while (false);
        console.log(`scaleAddIpUT() = ${result}`);
        return result;
    }

    static allUT() {
        let result = true;
        do {
            result = this.arrayOffsUT();
            if (!result) {
                console.log('Fail in arrayOffsUT()');
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
            result = this.prodSumUT();
            if (!result) {
                console.log('Fail in prodSumUT()');
                break;
            }
            result = this.scaleIpUT();
            if (!result) {
                console.log('Fail in scaleIpUT()');
                break;
            }
            result = this.scaleAddIpUT();
            if (!result) {
                console.log('Fail in scaleAddIpUT()');
                break;
            }
        } while (false);
        if (!result) {
            throw new Error();
        }
        return result;
    }
}
