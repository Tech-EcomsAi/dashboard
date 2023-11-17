import { Segmented, theme } from 'antd';
import React, { useEffect, useState } from 'react'
import BackgroundColor from '../backgroundColor';
import { IoMdColorFilter } from 'react-icons/io';
import { VscColorMode } from 'react-icons/vsc';
import { BsFillImageFill } from 'react-icons/bs';
import styles from "./backgroundElement.module.scss";
import GradientColor from '../gradientColor';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import { BACKGROUND_TYPES } from '@constant/common';
import { COLOR_INITIAL_VALUE, GRADIENT_INITIAL_VALUE, IMAGE_INITIAL_VALUE } from 'src/data/backgroundStyleValues';
import BackgroundImage from '../backgroundImage';
import TextElement from '@antdComponent/textElement';
import SegmentComponent, { SEGMENT_OPTIONS_TYPES } from '@atoms/segment';
import Saperator from '@atoms/Saperator';
import { LuImage } from 'react-icons/lu';

const SEGMENT_OPTIONS = [
    { value: BACKGROUND_TYPES.COLOR, key: BACKGROUND_TYPES.COLOR, icon: <IoMdColorFilter /> },
    { value: BACKGROUND_TYPES.GRADIENT, key: BACKGROUND_TYPES.GRADIENT, icon: <VscColorMode /> },
    { value: BACKGROUND_TYPES.IMAGE, key: BACKGROUND_TYPES.IMAGE, icon: <LuImage /> },
]

const valueSample = {
    value: '#000',
    type: 'Color',
    colors: [{ color: '#000', format: 'hex' }]
}

function BackgroundElement({ component = '', onChange, value }) {
    const { token } = theme.useToken();

    const onChangeBgColor = (newColor) => {
        const valueCopy = { ...value };
        const colorsCopy = [...valueCopy.colors];
        colorsCopy[0] = newColor;
        valueCopy.value = newColor.color;
        valueCopy.colors = colorsCopy;
        onChange(valueCopy);
    }

    const onChangeType = (type) => {
        if (type == BACKGROUND_TYPES.COLOR) {
            onChange(COLOR_INITIAL_VALUE);
        } else if (type == BACKGROUND_TYPES.GRADIENT) {
            onChange(GRADIENT_INITIAL_VALUE);
        } else {
            onChange(IMAGE_INITIAL_VALUE);
        }
    }

    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.backgroundElementWrap}`}>
            <TextElement text={'Background'} size={"medium"} />
            <div className={`${styleElementCSS.elementWrap}`}>
                <div className={styles.segmentWrap}>
                    <SegmentComponent
                        label={``}
                        value={value?.type}
                        showIcon={true}
                        onChange={(tab: any) => onChangeType(tab)}
                        options={SEGMENT_OPTIONS}
                        type={SEGMENT_OPTIONS_TYPES.ARRAY_OF_OBJECTS}
                        size={"small"}
                    />
                </div>
                <>
                    {value?.type == BACKGROUND_TYPES.COLOR && <BackgroundColor value={value?.colors[0]} onChange={(newColor) => onChangeBgColor(newColor)} />}
                    {value?.type == BACKGROUND_TYPES.GRADIENT && <GradientColor value={value} onChange={onChange} />}
                    {value?.type == BACKGROUND_TYPES.IMAGE && (<BackgroundImage component={component} value={value} onChange={onChange} />)}
                </>
            </div>
            <Saperator />
        </div>
    )
}

export default BackgroundElement;