import { fabric } from "fabric";
import { v4 as uuid } from 'uuid';

export const unGroup = (canvas) => {
    const activeObject = canvas.getActiveObject() as fabric.Group;
    if (!activeObject) return;
    //Ungroup and add back to canvas
    var items = activeObject.getObjects();
    activeObject.destroy();
    canvas.remove(activeObject);
    items.forEach(function (item) {
        item.set('uid', uuid());
        item.set('dirty', true);
        canvas.add(item);
    })
}

export const group = (canvas) => {
    // composite element
    const activeObj = canvas.getActiveObject() as fabric.ActiveSelection;
    if (!activeObj) return;
    const activegroup = activeObj.toGroup();
    const objectsInGroup = activegroup.getObjects();
    activegroup.clone((newgroup: fabric.Group) => {
        newgroup.set('id', uuid());
        newgroup.set('uid', uuid());
        canvas.remove(activegroup);
        const objectsInNewGroup = newgroup.getObjects();
        objectsInNewGroup.forEach((object) => object.set('uid', uuid()));//assign new uid to new objects
        objectsInGroup.forEach((object) => canvas.remove(object));//remove old objects
        canvas.add(newgroup);
        canvas.setActiveObject(newgroup);
    });
}