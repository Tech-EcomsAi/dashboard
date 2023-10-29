import React, { } from 'react'
import { activeObjectsState } from '../types'
import { fabric } from "fabric";
import styles from './objectPropertiesEditor.module.scss';
import { Button } from 'antd';
import { LuFlipHorizontal, LuFlipVertical } from 'react-icons/lu'
import { useAppDispatch } from '@hook/useAppDispatch';
import { showErrorToast } from '@reduxSlices/toast';

type pageProps = {
    updateLocalCanvas: any,
    canvas: fabric.canvas
}

function Flip({ updateLocalCanvas, canvas }: pageProps) {


    const dispatch = useAppDispatch()

    const updateFlipProperty = (object, type) => {
        if (!object.locked) {
            object.set(`flip${type}`, !object[`flip${type}`]).setCoords();
        }
        return object
    }

    const onFlip = (type) => {
        const activeObject = canvas.getActiveObject();
        if (!activeObject.locked) {
            // canvas.getActiveObjects().map((object) => updateFlipProperty(object, type))
            updateFlipProperty(activeObject, type)
            updateLocalCanvas(canvas, 'flip');
        } else {
            dispatch(showErrorToast('Element is locked 🔒'))
        }
    }
    return (
        <React.Fragment>
            <Button className={styles.buttonElement} size='middle' onClick={() => onFlip('X')} icon={<LuFlipHorizontal />} >Flip X</Button>
            <Button className={styles.buttonElement} size='middle' onClick={() => onFlip('Y')} icon={<LuFlipVertical />}>Flip Y</Button>
        </React.Fragment>
    )
}

export default Flip