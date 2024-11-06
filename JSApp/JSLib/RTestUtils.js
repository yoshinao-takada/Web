export class RTestUtils {
    static AreEqual(x0, x1, tol) {
        return Math.abs(x0 - x1) < tol;
    }

    static AreNotEqual(x0, x1, tol) {
        return Math.abs(x0 - x1) > tol;
    }

    static _0 = 0.0;
    static _tol = 1.0e-6;
}