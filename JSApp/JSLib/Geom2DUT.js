import { Transform2D } from "./Geom2D.js";
import { EditableShape } from "./Geom2D.js";
import { RTestUtils } from "./RTestUtils.js";

export class Geom2DUT extends RTestUtils {
    static AreEqual2D(p0, p1) {
        return this.AreEqual(p0[0], p1[0], this._tol) &&
            this.AreEqual(p0[1], p1[1], this._tol);
    }

    static AreNotEqual2D(p0, p1) {
        return this.AreNotEqual(p0[0], p1[0], this._tol) ||
            this.AreNotEqual(p0[1], p1[1], this._tol);
    }

    static rotationRadUT() {
        let result = true;
        const p1Ref = [Math.SQRT1_2, Math.SQRT1_2];
        const p2Ref = [Math.SQRT1_2, -Math.SQRT1_2];
        do {
            let p0 = [1.0, 0.0];
            let rot = Transform2D.rotationRad(Math.PI / 4);
            let p1 = rot.transform(p0);
            if (this.AreNotEqual2D(p1, p1Ref)) {
                result = false;
                console.log("Fail in rotationRadUT() with p1.");
                break;
            }
            rot = Transform2D.invRotationRad(Math.PI / 4);
            let p2 = rot.transform(p0);
            if (this.AreNotEqual2D(p2, p2Ref)) {
                result = false;
                console.log("Fail in rotationRadUT() with p2.");
                break;
            }
        } while (false);
        console.log(`Geom2DUT.rotationRadUT() = ${result}`);
        return result;
    }

    static rotationUT() {
        let result = true;
        const p0Ref = [1.0, 0.0];
        const p1Ref = [0.0, 1.0];
        const cossin = [Math.SQRT1_2, Math.SQRT1_2];
        do {
            let rot = Transform2D.rotation(cossin);
            // rotate p0 by 45 degrees twice and get p1.
            let p1 = rot.transform(rot.transform(p0Ref));
            if (this.AreNotEqual2D(p1Ref, p1)) {
                result = false;
                console.log("Fail in rotationUT() with p1.");
                break;
            }
            rot = Transform2D.invRotation(cossin);
            let p0 = rot.transform(rot.transform(p1Ref));
            if (this.AreNotEqual2D(p0Ref, p0)) {
                result = false;
                console.log("Fail in rotationUT() with p1.");
                break;
            }
        } while (false);
        console.log(`Geom2DUT.rotationUT() = ${result}`);
        return result;
    }

    static translationUT() {
        let result = true;
        const vMove = [1.5, -2.5];
        const p0Ref = [0.31, 0.41];
        const p1Ref = [3.31, -4.59];
        do {
            let move = Transform2D.translation(vMove);
            let p1 = move.transform(move.transform(p0Ref));
            if (this.AreNotEqual2D(p1Ref, p1)) {
                result = false;
                console.log("Fail in translationUT() with p1.");
                break;
            }
            move = Transform2D.invTranslation(vMove);
            let p0 = move.transform(move.transform(p1Ref));
            if (this.AreNotEqual2D(p0Ref, p0)) {
                result = false;
                console.log("Fail in translationUT() with p0.");
                break;
            }
        } while (false);
        console.log(`Geom2DUT.translationUT() = ${result}`);
        return result;
    }

    static scaleUT() {
        let result = true;
        const p0Ref = [1.0, 1.0];
        const p1Ref = [3.0, 2.0];
        const vScale = [Math.sqrt(3.0), Math.sqrt(2.0)];
        do {
            let scale = Transform2D.scale(vScale);
            let p1 = scale.transform(scale.transform(p0Ref));
            if (this.AreNotEqual2D(p1Ref, p1)) {
                result = false;
                console.log('Fail in Geom2DUT.scaleUT() with p1.');
                break;
            }
            scale = Transform2D.invScale(vScale);
            let p0 = scale.transform(scale.transform(p1Ref));
            if (this.AreNotEqual2D(p0Ref, p0)) {
                result = false;
                console.log('Fail in Geom2DUT.scaleUT() with p0.');
                break;
            }
        } while (false);
        console.log(`Geom2DUT.scaleUT() = ${result}`);
        return result;
    }


    static naturalToPixelUT() {
        let result = true;
        const wh = [640.0, 480.0];
        const p0Ref = [0.0, 0.0];
        const p1Ref = [0.5 * (wh[0] - 1), 0.5 * (wh[1] - 1)];
        do {
            let m = Transform2D.naturalToPixel(wh);
            let p1 = m.transform(p0Ref);
            if (this.AreNotEqual2D(p1Ref, p1)) {
                result = false;
                console.log('Fail in naturalToPixelUT() with p1');
                break;
            }
            m = Transform2D.pixelToNatural(wh);
            let p0 = m.transform(p1Ref);
            if (this.AreNotEqual2D(p0Ref, p0)) {
                result = false;
                console.log('Fail in naturalToPixelUT() with p0');
                break;
            }
        } while (false);
        console.log(`Geom2DUT.naturalToPixelUT() = ${result}`);
        return result;
    }

    static allUT() {
        let result = false;
        do {
            result = this.rotationRadUT();
            if (!result) {
                console.log('rotationRadUT() failed.');
                break;
            }
            result = this.rotationUT();
            if (!result) {
                console.log('rotationUT() failed.');
                break;
            }
            result = this.translationUT();
            if (!result) {
                console.log('translationUT() failed.');
                break;
            }
            result = this.scaleUT();
            if (!result) {
                console.log('scaleUT() failed.');
                break;
            }
            result = this.naturalToPixelUT();
            if (!result) {
                console.log('naturalToPixelUT() failed.');
                break;
            }
        } while (false);
        console.log(`Geom2DUT.allUT() = ${result}`);
        return result;
    }
}