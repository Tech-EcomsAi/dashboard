import { editorEventMode, eventOneType } from '@constant/craftBuilder';
import { fabric } from 'fabric';
import { activeObjectsState } from './types';


const getEventMode = (activeObjects) => {
    let mode = '';
    switch (activeObjects.length) {
        case 1: mode = editorEventMode.ONE;
            break;
        case 2: mode = editorEventMode.MULTI;
            break;
        case 0: mode = editorEventMode.EMPTY;
            break;
    }
    return mode;
}

export const getIsGroup = (activeObjects) => {
    return (getEventMode(activeObjects) == editorEventMode.ONE) && (activeObjects.length != 0 ? activeObjects[0].type == eventOneType.GROUP : false)
}

function handleSelctionEvent(event: any, canvas: fabric.Canvas, callback: any) {
    // console.log("handleCanvasEvents", event)
    // console.log("getActiveObjects()", canvas.getActiveObjects())
    const activeObjects = canvas.getActiveObjects();
    const eventData: activeObjectsState = {
        eventMode: getEventMode(activeObjects),
        isGroup: getIsGroup(activeObjects),
        isMultiple: activeObjects.length > 1,
        selectedObject: activeObjects,
        isSelected: activeObjects.length != 0
    }
    callback(eventData);
}

export default handleSelctionEvent;