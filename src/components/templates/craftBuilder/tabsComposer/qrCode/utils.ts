import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from "@constant/craftBuilder";
import { DEFAULT_QR_SIZE } from "@constant/qrCodeTypes";
import { workspace } from "@template/craftBuilder";
import { getObjectType } from "@util/craftBuilderUtils";
import { fabric } from "fabric";
import { v4 as uuid } from 'uuid';

const getImageObject = (qrConfig) => {
    return new Promise((resolve, reject) => {
        fabric.Image.fromURL(qrConfig.src, function (img: any) {
            if (img == null) return;
            else {
                img.set({
                    uid: uuid(),
                    [CUSTOME_ATTRIBUTES.QR_CODE_CONFIG]: qrConfig,
                    [CUSTOME_ATTRIBUTES.OBJECT_TYPE]: `${OBJECT_TYPES.qrCode}`
                }).scaleToWidth(DEFAULT_QR_SIZE);

                const clipPath = new fabric.Rect({
                    width: img.width,
                    height: img.height,
                    rx: qrConfig.borderRadius * 5,
                    ry: qrConfig.borderRadius * 5,
                    originX: 'center', // Set the origin to the center for positioning
                    originY: 'center', // Set the origin to the center for positioning
                    selectable: false, // Make the clip path unselectable
                    evented: false,    // Make the clip path unresponsive to events
                });

                img.clipPath = clipPath;
                resolve(img);
            }
        }, { crossOrigin: 'anonymous' });
    })
}

//if use qrcode by antd
const getQrImage = (qrConfig) => {
    return new Promise((resolve, reject) => {
        fabric.Image.fromURL(qrConfig.src, function (img) {
            var patternSourceCanvas = new fabric.StaticCanvas();
            patternSourceCanvas.setDimensions({ width: img.getScaledWidth() + (qrConfig.padding * 5), height: img.getScaledHeight() + (qrConfig.padding * 5) });
            const center = patternSourceCanvas.getCenterPoint();
            patternSourceCanvas.add(img);
            patternSourceCanvas._centerObject(img, center)
            //add rect
            // const rect = new fabric.Rect({
            //     fill: 'red',
            //     width: 100 + patternSourceCanvas.width + (qrConfig.padding * 5),
            //     height: 100 + patternSourceCanvas.height + (qrConfig.padding * 5),
            //     id: uuid(),
            //     rx: qrConfig.corner * 10,
            //     ry: qrConfig.corner * 10,
            //     name: 'rectangle',
            //     uid: uuid(),
            //     statefullCache: true,
            //     objectCaching: false
            // });
            // patternSourceCanvas.add(rect);
            // patternSourceCanvas._centerObject(rect, center)
            // rect.sendToBack();

            //add as pattern
            // const pattern = new fabric.Pattern({ source: patternSourceCanvas.getElement(), repeat: 'repeat' })
            // patternSourceCanvas?.set('fill', pattern);

            patternSourceCanvas.backgroundColor = qrConfig.bgColor;
            fabric.Image.fromURL(patternSourceCanvas.toDataURL(), function (img) {
                img.set({ uid: uuid(), [CUSTOME_ATTRIBUTES.OBJECT_TYPE]: `${OBJECT_TYPES.qrCode}` })
                resolve(img)
            }, { crossOrigin: 'anonymous' });
        }, { crossOrigin: 'anonymous' });
    })
}

// const addQR = (canvas, updateLocalCanvas, imageSrc, qrConfig) => {
//     fabric.Image.fromURL(imageSrc, function (img) {

//         var patternSourceCanvas = new fabric.StaticCanvas();
//         patternSourceCanvas.setDimensions({ width: img.getScaledWidth() + (qrConfig.padding * 5), height: img.getScaledHeight() + (qrConfig.padding * 5) });
//         const center = patternSourceCanvas.getCenterPoint();
//         patternSourceCanvas.add(img);
//         patternSourceCanvas._centerObject(img, center)

//         //add rect
//         // const rect = new fabric.Rect({
//         //     fill: 'red',
//         //     width: 100 + patternSourceCanvas.width + (qrConfig.padding * 5),
//         //     height: 100 + patternSourceCanvas.height + (qrConfig.padding * 5),
//         //     id: uuid(),
//         //     rx: qrConfig.corner * 10,
//         //     ry: qrConfig.corner * 10,
//         //     name: 'rectangle',
//         //     uid: uuid(),
//         //     statefullCache: true,
//         //     objectCaching: false
//         // });
//         // patternSourceCanvas.add(rect);
//         // patternSourceCanvas._centerObject(rect, center)
//         // rect.sendToBack();

//         //add as pattern
//         // const pattern = new fabric.Pattern({ source: patternSourceCanvas.getElement(), repeat: 'repeat' })
//         // patternSourceCanvas?.set('fill', pattern);

//         patternSourceCanvas.backgroundColor = qrConfig.bgColor;
//         fabric.Image.fromURL(patternSourceCanvas.toDataURL(), function (img) {
//             canvas.add(img);
//             canvas.viewportCenterObject(img)
//             canvas.setActiveObject(img)
//             updateLocalCanvas(canvas, 'Images');
//         }, { crossOrigin: 'anonymous' });
//     }, { crossOrigin: 'anonymous' });
// }

export const addSelectedQRImage = (canvas, updateLocalCanvas, qrConfig) => {
    getImageObject(qrConfig).then((imgObject) => {
        canvas.add(imgObject);
        const center = workspace.getCenterPoint();
        canvas._centerObject(imgObject, center);
        // canvas.viewportCenterObject(imgObject)
        // canvas.setActiveObject(imgObject)
        // updateLocalCanvas(canvas, 'QR Code Image')
    });
};