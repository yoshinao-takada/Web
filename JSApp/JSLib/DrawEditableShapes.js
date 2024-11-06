import { UnitShape } from "./Geom2D.js";
import { EditableShape } from "./Geom2D.js";

// to read
// https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events

export class DrawEditableShapes {
    static lineTo(point) {
        this.context.lineTo(point[0], point[1]);
    }

    static moveTo(point) {
        this.context.moveTo(point[0], point[1]);
    }

    static init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");
        this.stage = undefined;
        this.listening = false;
    }

    
    // draw a rectangle
    // scale: scaling factor applied to the unit rectangle.
    // rotDeg: rotation angle in degrees.
    // location: the location of the rectangle.
    // lineThickness: line width in pixels.
    // color: a string representing a color, like '#ff0000': red, '#00ff00': lime,...
    // lineDash: a number array of a sequence of line length and space length.
    //  if an empty array is sepecfied, the line is a solid line.
    static drawRect(scale, rotDeg, location, lineThickness, color, lineDash) {
        let shape = new EditableShape(UnitShape.RECTANGLE);
        shape.setRot([Math.cos(this.degToRad(rotDeg)), Math.sin(this.degToRad(rotDeg))]);
        shape.setScale(scale);
        shape.setTranslate(location);
        shape.setPixelSize([this.canvas.clientWidth, this.canvas.clientHeight]);
        this.context.beginPath();
        // set line-dash
        let defaultLineDash = this.context.getLineDash();
        if (lineDash === undefined || lineDash === null) {
            lineDash = [];
        }
        this.context.setLineDash(lineDash);
        // move to the top-left corner
        let point = shape.pixelPointFromFeaturePointId(UnitShape.TOP_LEFT);
        this.moveTo(point);
        // draw line segments
        this.context.lineWidth = 
            (lineThickness != undefined && lineThickness > 0) ? lineThickness : 1;
        this.context.strokeStyle = (color === undefined || color === null) ?
            "#ff0000" : color;
        for (let i = UnitShape.TOP; i < UnitShape.LEFT; i++) {
            point = shape.pixelPointFromFeaturePointId(i);
            this.lineTo(point)
        }
        point = shape.pixelPointFromFeaturePointId(UnitShape.TOP_LEFT);
        this.lineTo(point);
        this.context.stroke();
        this.context.setLineDash(defaultLineDash);
    }


    static drawEllipse(scale, rotDeg, location, lineThickness, color, lineDash) {
        let shape = new EditableShape(EditableShape.ELLIPSE);
        shape.setTranslate(location);
        shape.setPixelSize([this.canvas.clientWidth, this.canvas.clientHeight]);
        let center = shape.m.transform(UnitShape.FeaturePoints[UnitShape.CENTER]);
        // set line-dash
        this.context.beginPath();
        let defaultLineDash = this.context.getLineDash();
        if (lineDash === undefined || lineDash === null) {
            lineDash = [];
        }
        this.context.setLineDash(lineDash);
        this.context.lineWidth = 
            (lineThickness != undefined && lineThickness > 0) ? lineThickness : 1;
        this.context.strokeStyle = (color === undefined || color === null) ?
            "#ff0000" : color;
        this.context.ellipse(center[0], center[1], scale[0], scale[1], -this.degToRad(rotDeg),
            0, Math.PI * 2);
        this.context.stroke();
        this.context.setLineDash(defaultLineDash);
    }

    static degToRad(x) {
        return x * Math.PI / 180.0;
    }

    static scenario1() {
        const origin = [0.0, 0.0];
        const location0 = [100.0, 100.0];
        const location1 = [-100.0, 100.0];
        const scale0 = [50.0, 30.0];
        const scale1 = [30.0, 50.0];
        const colorLime = "#00ff00";
        const colorCyan = "#00ffff";
        const colorRed = "#ff0000";
        const colorBlack = "#000000";
        const colorDarkGray = "#404040";
        
        this.init("myCanvas");
        this.drawRect(scale0, 30.0, origin, 4, colorLime, [4, 4]);
        this.drawRect(scale0, 30.0, location0, 1, colorCyan);
        this.drawRect(scale0, 30.0, location1, 5);
        this.drawEllipse(scale0, 30.0, origin, 4, colorRed);
        this.drawEllipse(scale1, 30.0, location0, 1, colorBlack);
    }
}