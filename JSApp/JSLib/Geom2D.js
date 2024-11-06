// class: Transform2D is a matrix transform implemented as
// 3x2 real matrix.
export class Transform2D extends Array {
    //               [m11, m12, 0]
    // [v1, v2, 1] * [m21, m22, 0]
    //               [m31, m32, 1]
    // = [v1*m11 + v2*m21 + m31, v1*m12 + v2*m22 + m32, 1];
    constructor(v) {
        super(v.length);
        for (let i = 0; i < v.length; i++) {
            this[i] = v[i];
        }
    }

    print() {
        console.log(this);
    }

    static rotationRad(radian) {
        return this.rotation([Math.cos(radian), Math.sin(radian)]);
    }
    
    // Create a rotation matrix
    static rotation(cossin) {
        return new Transform2D([cossin[0], cossin[1], -cossin[1], cossin[0], 0, 0]);
    }

    static translation(xy) {
        return new Transform2D([1.0, 0.0, 0.0, 1.0, xy[0], xy[1]]);
    }

    static scale(xy) {
        return new Transform2D([xy[0], 0.0, 0.0, xy[1], 0.0, 0.0]);
    }

    static halfPoint(span) {
        return (span - 1.0) * 0.5;
    }

    // Create a transform from a naturala coordinate system to a pixel coordinate system.
    // wh: width and height of the pixel map.
    static naturalToPixel(wh) {
        return new Transform2D(
            [1.0, 0.0, 0.0, -1.0, this.halfPoint(wh[0]), this.halfPoint(wh[1])]);
    }

    // Create an inverse transform of RotationRad.
    static invRotationRad(radian) {
        return this.rotationRad(-radian);
    }

    // Create an inverse transform of Rotation.
    static invRotation(cossin) {
        return this.rotation([cossin[0], -cossin[1]]);
    }

    // create an inverse transform of Translation.
    static invTranslation(xy) {
        return this.translation([-xy[0], -xy[1]]);
    }

    // create an inverse transform of Scale.
    static invScale(xy) {
        return this.scale([1.0/xy[0], 1.0/xy[1]]);
    }

    // create a transform from a pixel coordinate system to a natural coordinate system.
    static pixelToNatural(wh) {
        return new Transform2D(
            [1.0, 0.0, 0.0, -1.0, -this.halfPoint(wh[0]), this.halfPoint(wh[1])]);
    }

    // multiply another from right as a 3x3 matrix
    // another: another Transform2D object.
    // return: this * another
    multiply(another) {
        return new Transform2D([
            this[0] * another[0] + this[1] * another[2],
                this[0] * another[1] + this[1] * another[3],
            this[2] * another[0] + this[3] * another[2],
                this[2] * another[1] + this[3] * another[3],
            this[4] * another[0] + this[5] * another[2] + another[4],
                this[4] * another[1] + this[5] * another[3] + another[5],
        ]);
    }

    // transform a point.
    // point: a 2D point.
    // return: point * this
    transform(point) {
        return [
            point[0] * this[0] + point[1] * this[2] + this[4],
            point[0] * this[1] + point[1] * this[3] + this[5],
        ]
    }
}

// Unit shape is a unit circle or unit square which has a radius = 1.0.
// And thir shape axes are aligned to axes of the coordinate system.
export class UnitShape {
    // shapeType enumeration
    static RECTANGLE = 0;
    static ELLIPSE = 1;
    static HLINE = 2; // line segment from [-1.0, 0.0] to [+1.0, 0.0]
    static VLINE = 3; // line segment from [0.0, -1.0] to [0.0, +1.0]

    // FeaturePoints enumeration
    static CENTER = 0;
    static TOP_LEFT = 1;
    static TOP = 2;
    static TOP_RIGHT = 3;
    static RIGHT = 4;
    static BOTTOM_RIGHT = 5;
    static BOTTOM = 6;
    static BOTTOM_LEFT = 7;
    static LEFT = 8;
    static ROT_MARK = 9;

    constructor(_shapeType) {
        this.shapeType = _shapeType;
    }

    static FeaturePoints = [
        [0.0, 0.0], // CENTER
        [-1.0, 1.0], // TOP_LEFT
        [0.0, 1.0], // TOP
        [1.0, 1.0], // TOP_RIGHT
        [1.0, 0.0], // RIGHT
        [1.0, -1.0], // BOTTOM_RIGHT
        [0.0, -1.0], // BOTTOM
        [-1.0, -1.0], // BOTTOM_LEFT
        [-1.0, 0.0], // LEFT
        [0.0, 1.2], // ROT_MARK
    ];
}

// Unit shape and a combined translation of
// 1) scale, 2) rotation, 3) translation, 4) natual coord to pixel coord.
// Their inverse translations are also supplied.
export class EditableShape extends UnitShape {
    constructor(_shapeType) {
        super(_shapeType);
        this.mRot = Transform2D.scale([1.0,1.0]);
        this.imRot = this.mRot;
        this.mScale = this.mRot;
        this.imScale = this.mScale;
        this.mTranslate = this.mRot;
        this.imTranslate = this.mTranslate;
        this.mNatualToPixel = Transform2D.naturalToPixel([640, 480]);
        this.mPixelToNatual = Transform2D.pixelToNatural([640, 480]);
        this.update();
    }

    update() {
        this.m = this.mScale.multiply(this.mRot).multiply(this.mTranslate)
            .multiply(this.mNatualToPixel);
        this.im = this.mPixelToNatual.multiply(this.imTranslate)
            .multiply(this.imRot).multiply(this.imScale);
    }

    setRot(cossin) {
        this.mRot = Transform2D.rotation(cossin);
        this.imRot = Transform2D.invRotation(cossin);
        this.update();
    }

    setRotRad(radian) {
        this.mRot = Transform2D.rotationRad(radian);
        this.imRot = Transform2D.invRotationRad(radian);
        this.update();
    }

    setScale(xy) {
        this.mScale = Transform2D.scale(xy);
        this.imScale = Transform2D.invScale(xy);
        this.update();
    }

    setTranslate(xy) {
        this.mTranslate = Transform2D.translation(xy);
        this.imTranslate = Transform2D.invTranslation(xy);
        this.update();
    }

    setPixelSize(wh) {
        this.mNatualToPixel = Transform2D.naturalToPixel(wh);
        this.mPixelToNatual = Transform2D.pixelToNatural(wh);
        this.update();
    }

    pixelPoint(unitPoint) {
        return this.m.transform(unitPoint);
    }

    pixelPointFromFeaturePointId(featurePointId) {
        return this.pixelPoint(UnitShape.FeaturePoints[featurePointId]);
    }
}