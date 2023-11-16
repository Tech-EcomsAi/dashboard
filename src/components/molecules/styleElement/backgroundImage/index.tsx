import React, { useState } from 'react'
import styles from './backgroundImage.module.scss';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import { Button, Checkbox, Image, Modal, Slider, Switch, theme } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { removeObjRef } from '@util/utils';
import ImagePickerModal from '../../../organisms/imagePickerModal';
import TextElement from '@antdComponent/textElement';
import CheckboxElement from '@antdComponent/checkboxElement';
import SliderElement from '@antdComponent/sliderElement';


function BackgroundImage({ component = '', label = '', value, onChange }) {

    const { token } = theme.useToken();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const onChangeAppearance = (e: CheckboxChangeEvent, from) => {
        const valueCopy = removeObjRef(value);
        valueCopy[from] = e.target.checked;
        onChange(valueCopy);
    };

    const onChangeImage = (updatedImage) => {
        !updatedImage.doNotCloseDrawer && setIsModalOpen(false)
        const valueCopy = removeObjRef(value);
        valueCopy.src = updatedImage.src;
        onChange(valueCopy);
    }

    const onChangeImageOpacity = (opacityValue) => {
        const valueCopy = removeObjRef(value);
        valueCopy.opacity = opacityValue;
        onChange(valueCopy);
    }

    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.backgroundImageWrap}`}>
            {label && <TextElement text={label} color={token.colorTextBase} />}
            <div className={`${styleElementCSS.elementWrap} ${styles.imageContentWrap}`}>
                <div className={styles.uploadedImage} style={{
                    backgroundImage: value.src ? `url(${value.src})` : 'unset', backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: component == 'GLOBAL_BG' ? "cover" : 'contain'
                }}></div>
                <div className={styles.actionsWrap}>
                    <div className={styles.actions} style={{ background: 'unset', color: 'black' }}>
                        <TextElement text={'Image visibility'} color={token.colorTextBase} />
                        <CheckboxElement active={value.isMobile} label='Mobile' onChange={(e) => onChangeAppearance(e, 'isMobile')} />
                        <CheckboxElement active={value.isDesktop} label='Desktop' onChange={(e) => onChangeAppearance(e, 'isDesktop')} />
                    </div>
                    <Button onClick={showModal} style={{ fontSize: "12px" }}>Change Image</Button>
                    <ImagePickerModal component={component} open={isModalOpen} value={value} onSave={(image) => onChangeImage(image)} onCancel={() => setIsModalOpen(false)} />
                </div>
            </div>
            <div className={`${styleElementCSS.styleWrap} ${styles.imageBlurWrap}`}>
                <TextElement text={`Image Blur ${value.opacity ? "(" + value.opacity + ")" : ""}`} color={token.colorTextBase} />
                <SliderElement
                    min={0}
                    max={1}
                    onChange={(value) => onChangeImageOpacity(value)}
                    value={value.opacity}
                    step={0.1}
                />
            </div>
        </div>
    )
}

export default BackgroundImage