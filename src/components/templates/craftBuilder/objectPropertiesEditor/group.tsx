import { Button } from 'antd'
import React from 'react'
import styles from './objectPropertiesEditor.module.scss'
import { fabric } from "fabric";
import { v4 as uuid } from 'uuid';
import { FaObjectGroup, FaObjectUngroup } from 'react-icons/fa';

function Group({ updateLocalCanvas, canvas, activeObjectsState }) {
    // split group
    const unGroup = () => {
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
        updateLocalCanvas(canvas, 'group')
    }

    const group = () => {
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
            updateLocalCanvas(canvas, 'group')
        });
    }
    return (
        <React.Fragment>
            {activeObjectsState.isMultiple && <Button className={styles.buttonElement} size='middle' onClick={group} icon={<FaObjectGroup />} >Group</Button>}
            {activeObjectsState.isGroup && <Button className={styles.buttonElement} size='middle' onClick={unGroup} icon={<FaObjectUngroup />}>Ungroup</Button>}
        </React.Fragment>
    )
}

export default Group