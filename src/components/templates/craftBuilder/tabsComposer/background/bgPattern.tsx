import React, { } from 'react'
import styles from './background.module.scss'
import Patterns from '@template/craftBuilder/objectPropertiesEditor/patterns'

function BGPattern({ workspace, canvas, updateLocalCanvas }) {
    return (
        <div className={styles.bgPatternWrap}>
            <div className={styles.title}>Background as pattern</div>
            <Patterns
                updateLocalCanvas={updateLocalCanvas}
                activeObject={workspace}
                canvas={canvas}
                activeObjectsState={{
                    eventMode: '',
                    isGroup: false,
                    isMultiple: false,
                    selectedObject: [workspace],
                    isSelected: true
                }} />
        </div>
    )
}

export default BGPattern