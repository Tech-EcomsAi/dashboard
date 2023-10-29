import ObjectPropertiesEditor from '@template/craftBuilder/objectPropertiesEditor'
import Filters from '@template/craftBuilder/objectPropertiesEditor/ImageProps/filters'
import Lock from '@template/craftBuilder/objectPropertiesEditor/lock'
import { Button } from 'antd'
import React from 'react'
import { IoTrashSharp } from 'react-icons/io5'
import styles from './qrCode.module.scss'

function QrProps({ canvas, updateLocalCanvas, activeObjectsState, workspace }) {
    return (
        <div className={styles.qrPropsWrap}>
            <ObjectPropertiesEditor updateLocalCanvas={updateLocalCanvas} workspace={workspace} canvas={canvas} activeObjectsState={activeObjectsState} />

            {/* <div className={styles.actionWrap}>
                <Lock updateLocalCanvas={updateLocalCanvas} canvas={canvas} activeObjectsState={activeObjectsState} />
                <Button className={styles.buttonElement} size='middle' onClick={() => { }} icon={<IoTrashSharp />}>Delete</Button>
            </div>
            <Filters updateLocalCanvas={updateLocalCanvas} canvas={canvas} activeObjectsState={activeObjectsState} /> */}
        </div>
    )
}

export default QrProps