
import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from "@constant/craftBuilder";
import { getCustomObjectType, getObjectType } from "@util/craftBuilderUtils";
import { fabric } from "fabric";
import { v4 as uuid } from 'uuid';

const getImageObject = (src) => {
    return new Promise((resolve, reject) => {
        fabric.Image.fromURL(src, function (img: any) {
            if (img == null) return;
            else {
                img.set({
                    left: 50,
                    top: 50,
                    uid: uuid(),
                    [CUSTOME_ATTRIBUTES.OBJECT_TYPE]: `${OBJECT_TYPES.watermark}-${OBJECT_TYPES.image}`
                }).scaleToWidth(50);
                resolve(img);
            }
        }, { crossOrigin: 'anonymous' });
    })
}

const getTextObject = (text) => {
    return new Promise((resolve, reject) => {
        const textObject = new fabric.Text(text, {
            left: 100,
            top: 100,
            fontSize: 20,
            width: 100,
            textAlign: 'center',
            fontFamily: 'Poppins',
            splitByGrapheme: true,
            text: text,
            uid: uuid(),
        });
        resolve(textObject)
    })
}

const getGroupObject = (src, text, isInline) => {
    return new Promise((resolve, reject) => {
        fabric.Image.fromURL(src, function (imageObject: any) {
            if (imageObject == null) {
                alert("Error!");
            } else {
                imageObject.set({
                    left: 50,
                    top: 50,
                    uid: uuid(),
                    [CUSTOME_ATTRIBUTES.OBJECT_TYPE]: `${OBJECT_TYPES.watermark}-${OBJECT_TYPES.image}`
                }).scaleToWidth(50);

                // Create a text object
                const textObject = new fabric.Text(text, {
                    left: isInline ? imageObject.getScaledWidth() + 50 : imageObject.getScaledWidth() / 2,
                    top: isInline ? imageObject.getScaledHeight() / 2 : imageObject.getScaledHeight() + 50,
                    fontSize: 10,
                    width: 100,
                    textAlign: 'center',
                    fontFamily: 'Poppins',
                    splitByGrapheme: true,
                    text: text,
                    uid: uuid(),
                    [CUSTOME_ATTRIBUTES.OBJECT_TYPE]: `${OBJECT_TYPES.watermark}-${OBJECT_TYPES.text}`
                });

                // Create a group object
                const groupObject = new fabric.Group([imageObject, textObject], {
                    selectable: true, // Set whether the groupObject is selectable
                    visible: true,
                    isInline: isInline,
                    width: isInline ? imageObject.getScaledWidth() + textObject.get('width') + 10 : 100,
                    height: isInline ? imageObject.getScaledHeight() + 10 : imageObject.getScaledHeight() + textObject.get('height') + 10,
                    uid: uuid(),
                    [CUSTOME_ATTRIBUTES.OBJECT_TYPE]: OBJECT_TYPES.watermark
                });

                groupObject.forEachObject((item) => {
                    if (isInline) {
                        item.set({ top: 0 - (item.height * item.scaleY) / 2 });
                    } else {
                        item.set({ left: 0 - (item.width * item.scaleX) / 2 });
                    }
                    item.setCoords();
                });
                resolve(groupObject)
            }
        }, { crossOrigin: 'anonymous' });
    })
}

const updateCanvas = (object, canvas) => {
    object.set('visible', true)
    canvas.add(object);//add new
    canvas.discardActiveObject();
    // canvas.setActiveObject(object)
}

export const updateLogoWatermark = (canvas, updateLocalCanvas, watermarkProps, workspace) => {
    const objects = canvas.getObjects();
    const addedWatermarkObjectIndex = objects.findIndex((o) => getCustomObjectType(o) == OBJECT_TYPES.watermark);

    if (addedWatermarkObjectIndex != -1) {
        //existing watermark as image
        const activeObject = objects[addedWatermarkObjectIndex];
        if (getObjectType(objects[addedWatermarkObjectIndex]) == OBJECT_TYPES.image) {
            //replace image
            const width = activeObject.get('width');
            const height = activeObject.get('height');
            const scaleX = activeObject.get('scaleX');
            const scaleY = activeObject.get('scaleY');
            activeObject.setSrc(watermarkProps.src, () => {
                activeObject.scaleX = (width * scaleX) / activeObject.width
                activeObject.scaleY = (height * scaleY) / activeObject.height
                updateLocalCanvas(canvas, 'updateLogoWatermark')
            });
        } else {
            //existing watermark as group/text
            //get cords of group and upload new image
            getImageObject(watermarkProps.src).then((imageObject: fabric.Image) => {
                // imageObject.top = activeObject.get('top')
                // imageObject.left = activeObject.get('left')

                let left = activeObject.get('left');
                let top = activeObject.get('top');
                if (workspace.get('width') < (left + imageObject.getScaledWidth())) {
                    left = workspace.get('width') - imageObject.getScaledWidth()
                }
                imageObject.left = left;
                if (workspace.get('height') < (top + imageObject.getScaledHeight())) {
                    top = workspace.get('height') - imageObject.getScaledHeight()
                }
                imageObject.top = top;

                imageObject[CUSTOME_ATTRIBUTES.OBJECT_TYPE] = `${OBJECT_TYPES.watermark}`
                canvas.remove(activeObject)//remove existing
                updateCanvas(imageObject, canvas);//add new
            })
        }
    } else {
        // create new object
        getImageObject(watermarkProps.src).then((imageObject: fabric.Image) => {
            imageObject[CUSTOME_ATTRIBUTES.OBJECT_TYPE] = `${OBJECT_TYPES.watermark}`
            imageObject.top = workspace.get('height') - imageObject.getScaledHeight() - 10;
            imageObject.left = workspace.get('width') - imageObject.getScaledWidth() - 10;
            updateCanvas(imageObject, canvas);
        })
    }
}

export const updateTextWatermark = (canvas, watermarkProps, workspace) => {
    const objects = canvas.getObjects();
    const addedWatermarkObjectIndex = objects.findIndex((o) => getCustomObjectType(o) == OBJECT_TYPES.watermark);

    if (addedWatermarkObjectIndex != -1) {
        //existing watermark as text
        const activeObject = objects[addedWatermarkObjectIndex];
        if (getObjectType(objects[addedWatermarkObjectIndex]) == OBJECT_TYPES.text) {
            //update text
            activeObject.set('text', watermarkProps.text);
        } else {
            //existing watermark as group/image
            //get cords of group and upload new image
            getTextObject(watermarkProps.text).then((textObject: fabric.Textbox) => {
                let left = activeObject.get('left') + activeObject.getScaledWidth() / 2;
                let top = activeObject.get('top') + activeObject.getScaledHeight() / 2;
                if (workspace.get('width') < (left + textObject.get('width'))) {
                    left = workspace.get('width') - textObject.get('width')
                }
                textObject.left = left - 10;
                if (workspace.get('height') < (top + textObject.get('height'))) {
                    top = workspace.get('height') - textObject.get('height')
                }
                textObject.top = top;
                textObject[CUSTOME_ATTRIBUTES.OBJECT_TYPE] = `${OBJECT_TYPES.watermark}`
                canvas.remove(activeObject)//remove existing
                updateCanvas(textObject, canvas);//add new
            })
        }
    } else {
        // create new object
        getTextObject(watermarkProps.text).then((textObject: fabric.Textbox) => {
            textObject[CUSTOME_ATTRIBUTES.OBJECT_TYPE] = `${OBJECT_TYPES.watermark}`
            textObject.top = workspace.get('height') - textObject.getScaledHeight() - 10;
            textObject.left = workspace.get('width') - textObject.getScaledWidth() - 10;
            updateCanvas(textObject, canvas);
        })
    }
}

export const updateImageTextWatermark = (canvas, watermarkProps, workspace, from = '') => {
    const objects = canvas.getObjects();
    const addedWatermarkObjectIndex = objects.findIndex((o) => getCustomObjectType(o) == OBJECT_TYPES.watermark);

    if (addedWatermarkObjectIndex != -1) {
        //existing watermark as text
        const activeObject = objects[addedWatermarkObjectIndex];
        // if (getObjectType(objects[addedWatermarkObjectIndex]) == OBJECT_TYPES.text) {
        //     //update text
        //     activeObject.set('text', watermarkProps.text);
        // } else {
        // }
        //existing watermark as group/image
        //get cords of group and upload new image
        getGroupObject(watermarkProps.src, watermarkProps.text, watermarkProps.isInline).then((groupObject: fabric.Group) => {
            let left = activeObject.get('left');
            let top = activeObject.get('top');
            if (workspace.get('width') < (left + groupObject.get('width'))) {
                left = workspace.get('width') - groupObject.get('width')
            }
            groupObject.left = left;
            if (workspace.get('height') < (top + groupObject.get('height'))) {
                top = workspace.get('height') - groupObject.get('height')
            }
            groupObject.top = top;
            groupObject[CUSTOME_ATTRIBUTES.OBJECT_TYPE] = `${OBJECT_TYPES.watermark}`
            canvas.remove(activeObject)//remove existing
            updateCanvas(groupObject, canvas);//add new
        })
    } else {
        // create new object
        getGroupObject(watermarkProps.src, watermarkProps.text, watermarkProps.isInline).then((groupObject: fabric.Group) => {
            groupObject[CUSTOME_ATTRIBUTES.OBJECT_TYPE] = `${OBJECT_TYPES.watermark}`
            groupObject.top = workspace.get('height') - groupObject.getScaledHeight() - 10;
            groupObject.left = workspace.get('width') - groupObject.getScaledWidth() - 10;
            if (from == 'default') {
                groupObject.set('selectable', false);
                groupObject.set('hasControls', false);
                groupObject.hoverCursor = 'default';
            }
            updateCanvas(groupObject, canvas);
        })
    }
}
