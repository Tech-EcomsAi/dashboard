import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";
import styles from '@objectPropertiesEditor/objectPropertiesEditor.module.scss';
import { Slider, theme } from 'antd';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import TextElement from '@antdComponent/textElement';
import SliderElement from '@antdComponent/sliderElement';

type pageProps = {
    onChange: any,
    value: any,
    max: number,
    label?: string
}

function Corner({ onChange, value, max, label = 'Corner' }: pageProps) {
    const { token } = theme.useToken();
    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.imageBlurWrap}`} style={{ color: token.colorTextBase }}>
            <TextElement text={label} color={token.colorTextBase} />
            <div className={`${styleElementCSS.elementWrap} ${styles.imageBlurContent}`}>
                <SliderElement
                    min={0}
                    max={max || 100}
                    onChange={(value) => onChange(value)}
                    value={value}
                    step={5}
                />
            </div>
        </div>
    )
}

export default Corner