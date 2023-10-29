import React, { useEffect, useState } from 'react'
import { FiLock, FiUnlock } from 'react-icons/fi';
import { fabric } from "fabric";
import { v4 as uuid } from 'uuid';
import { Button } from 'antd';
import styles from './objectPropertiesEditor.module.scss';
import { activeObjectsState } from '../types';
import { getObjectType } from '@util/craftBuilderUtils';
import { OBJECT_TYPES } from '@constant/craftBuilder';

const lockAttrs = [
    'lockMovementX',
    'lockMovementY',
    'lockRotation',
    'lockScalingX',
    'lockScalingY',
];

type pageProps = {
    updateLocalCanvas: any,
    canvas: fabric.canvas,
    activeObjectsState: activeObjectsState
}

const updateEditableProperty = (object, value) => {
    if (getObjectType(object) == OBJECT_TYPES.text || getObjectType(object) == OBJECT_TYPES.itext) {
        object.editable = value;
    }
    return object;
}

const updateObjectPositions = (object, value) => {
    lockAttrs.forEach((key) => object[key] = value);
    return object;
}

export const lockObject = (object) => {
    // Modify custom properties
    object.hasControls = false;
    // Modify flip properties
    object.locked = true;
    // Modify editable properties
    object = updateEditableProperty(object, false)
    // Modify position properties
    object = updateObjectPositions(object, true)
    // Modify selectable properties
    // object.selectable = false;
    return object;
}

export const unlockObject = (object) => {
    // Modify custom properties
    object.hasControls = true;
    // Modify flip properties
    object.locked = false;
    // Modify editable properties
    object = updateEditableProperty(object, true)
    // Modify position properties
    object = updateObjectPositions(object, false)
    // Modify selectable properties
    // object.selectable = true;
    // this.isLock = false;
    return object;
}
function Lock({ updateLocalCanvas, canvas, activeObjectsState }: pageProps) {

    const [isLock, setIsLock] = useState(false);

    useEffect(() => {
        if (activeObjectsState.isSelected) {
            if (activeObjectsState.selectedObject.length == 1) {
                setIsLock(!activeObjectsState.selectedObject[0].hasControls)
            } else {
                setIsLock((activeObjectsState.selectedObject.filter((o) => o.hasControls).length == 0))
            }
        }
    }, [activeObjectsState])



    const lock = () => {
        activeObjectsState.selectedObject.map((object) => lockObject(object))
        setIsLock(true);
        lockObject(canvas.getActiveObject());
        updateLocalCanvas(canvas, 'Lock')
    }
    const unLock = () => {
        activeObjectsState.selectedObject.map((object) => unlockObject(object))
        setIsLock(false);
        unlockObject(canvas.getActiveObject());
        updateLocalCanvas(canvas, 'Lock')
    }

    return (
        <React.Fragment>
            {activeObjectsState.isSelected && <>
                {isLock ?
                    <Button className={styles.buttonElement} size='middle' onClick={unLock} icon={<FiUnlock />}>Unlock</Button> :
                    <Button className={styles.buttonElement} size='middle' onClick={lock} icon={<FiLock />} >Lock</Button>}
            </>}
        </React.Fragment>
    )
}

export default Lock