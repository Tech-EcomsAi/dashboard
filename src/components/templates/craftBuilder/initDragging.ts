import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from "@constant/craftBuilder";
import { checkNonRestrictedObject } from "@util/craftBuilderUtils";
import { fabric } from "fabric";
let dragMode = false;

const setDragging = (canvas) => {
    canvas.selection = false;
    canvas.defaultCursor = 'grab';
    canvas.getObjects().forEach((obj) => {
        obj.selectable = false;
    });
    // canvas.renderAll();
    // canvas.requestRenderAll();
}


// start dragging
export const startDragging = (canvas) => {
    dragMode = true;
    canvas.defaultCursor = 'grab';
}

export const endDragging = (canvas) => {
    dragMode = false;
    canvas.defaultCursor = 'default';
}


const initDrraging = (canvas) => {
    canvas.on('mouse:down', function (opt) {
        const evt = opt.e;
        if (evt.altKey || dragMode) {
            canvas.discardActiveObject();
            canvas.defaultCursor = 'grab';
            canvas.getObjects().forEach((obj) => obj.selectable = false);
            canvas.selection = false;
            canvas.isDragging = true;
            canvas.lastPosX = evt.clientX;
            canvas.lastPosY = evt.clientY;
            //canvas.requestRenderAll();
        }
    });

    canvas.on('mouse:move', function (opt) {
        if (canvas.isDragging) {
            canvas.discardActiveObject();
            canvas.defaultCursor = 'grabbing';
            const { e } = opt;
            if (!canvas.viewportTransform) return;
            const vpt = canvas.viewportTransform;
            vpt[4] += e.clientX - canvas.lastPosX;
            vpt[5] += e.clientY - canvas.lastPosY;
            canvas.lastPosX = e.clientX;
            canvas.lastPosY = e.clientY;
        }
    });

    canvas.on('mouse:up', function (opt) {
        if (!canvas.viewportTransform) return;
        canvas.setViewportTransform(canvas.viewportTransform);
        canvas.isDragging = false;
        canvas.selection = true;
        canvas.getObjects().forEach((obj) => {
            if (checkNonRestrictedObject(obj) && obj.hasControls) {
                obj.selectable = true;
            }
        });
        //canvas.requestRenderAll();
        canvas.defaultCursor = 'default';
    });

    canvas.on('mouse:wheel', function (opt) {
        const delta = opt.e.deltaY;
        let zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        const center = canvas.getCenter();
        canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
    });
}

export default initDrraging;