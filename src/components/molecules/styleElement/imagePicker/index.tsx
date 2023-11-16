import React from 'react'
import styles from './imagePicker.module.scss';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import TextElement from '@antdComponent/textElement';
import { theme } from 'antd';

function ImagePicker({ label }: any) {
    const { token } = theme.useToken();
    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.imagePickerWrap}`}>
            {label && <TextElement text={label} color={token.colorTextBase} />}
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