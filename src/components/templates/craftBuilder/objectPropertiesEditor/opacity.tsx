import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";
import styles from '@objectPropertiesEditor/objectPropertiesEditor.module.scss';
import { Slider, theme } from 'antd';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import TextElement from '@antdComponent/textElement';
import SliderElement from '@antdComponent/sliderElement';

type pageProps = {
    updateLocalCanvas: any,
    canvas: fabric.canvas,
}

function Opacity({ updateLocalCanvas, canvas }: pageProps) {

    const { token } = theme.useToken();
    const [value, setValue] = useState(0);

    useEffect(() => {
        const activeObject = canvas.getActiveObject();
        activeObject && setValue(activeObject?.get('opacity') * 100);
    }, [canvas])


    const onChangeImageOpacity = (opacityValue) => {
        const activeObject = canvas.getActiveObject();
        activeObject.set('opacity', opacityValue / 100);
        setValue(opacityValue);
        updateLocalCanvas(canvas, 'Opacity');
    }

    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.imageBlurWrap}`}
            style={{ color: token.colorTextBase }}
        >
            <TextElement text={'Blur'} color={token.colorTextBase} />
            <div className={`${styleElementCSS.elementWrap} ${styles.imageBlurContent}`}>
                <SliderElement
                    min={0}
                    max={100}
                    onChange={(value) => onChangeImageOpacity(value)}
                    value={value}
                    step={1}
                />
            </div>
        </div>
    )
}

export default Opacity