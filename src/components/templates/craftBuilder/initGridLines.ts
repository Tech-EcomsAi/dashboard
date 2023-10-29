import { GRID_SIZES } from "@constant/craftBuilder";

import { fabric } from "fabric";


function draw_grid(HGSize, VGSize, canvas, strokeColor) {
    var grid_context = canvas.getContext("2d");

    var currentCanvasWidth = canvas.getWidth();
    var currentCanvasHeight = canvas.getHeight();

    // Drawing horizontal lines
    var y;
    for (y = 0; y <= currentCanvasHeight; y += HGSize) {
        grid_context.moveTo(0, y + 0.5);
        grid_context.lineTo(currentCanvasWidth, y + 0.5);
    }

    // Drawing vertical lines
    var x;
    for (x = 0; x <= currentCanvasWidth; x += VGSize) {
        grid_context.moveTo(x + 0.5, 0);
        grid_context.lineTo(x + 0.5, currentCanvasHeight);
    }

    grid_context.strokeStyle = strokeColor;
    grid_context.gridRendered = true;
    grid_context.setLineDash([5, 5]);
    grid_context.stroke();
}

export function initGridLines(canvas, strokeColor) {

    // const gcd = (a, b) => {
    //     if (!b) {
    //         return a;
    //     }
    //     return gcd(b, a % b);
    // }
    // const gridWidth = canvas.getWidth();
    // const gridHeight = canvas.getHeight();

    // const oGridGroup = [];
    // console.log(gcd(gridWidth, gridHeight));

    // const gridRows = gcd(gridWidth, gridHeight);
    // const gridCols = gcd(gridWidth, gridHeight);

    // const lineOption = { stroke: 'rgba(0,0,0,.1)', strokeWidth: 1, selectable: false, evented: false };

    // for (let i = 0; i <= gridWidth; i += gridCols) {
    //     oGridGroup.push(new fabric.Line([i, 0, i, gridHeight], lineOption));
    // }
    // for (let i = 0; i <= gridHeight; i += gridRows) {
    //     oGridGroup.push(new fabric.Line([0, i, gridWidth, i], lineOption));
    // }

    // const theGorup = new fabric.Group(oGridGroup);
    // theGorup.set({
    //     selectable: false,
    //     evented: false
    // })

    // canvas.on('mouse:down', function (event) {
    //     if (event.target) {
    //         canvas.add(theGorup);
    //     }
    // });

    // canvas.on('mouse:up', function (event) {
    //     canvas.remove(theGorup);

    // });

    canvas.on('after:render', function () {
        draw_grid(GRID_SIZES.horizontal, GRID_SIZES.vertical, canvas, strokeColor);
    });

}