import React from 'react'
import styles from './imagePicker.module.scss';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';

function ImagePicker({ label = false }) {
    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.imagePickerWrap}`}>
            {label && <div className={styleElementCSS.label}>{label}</div>}
            <div className={`${styleElementCSS.elementWrap}`}>
                <div className={styles.uploadedImage}>

                </div>
                <div className={styles.actionsWrap}>
                    <div className={styles.actions}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImagePicker