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

function Angle({ updateLocalCanvas, canvas }: pageProps) {

    const { token } = theme.useToken();
    const [value, setValue] = useState(0);

    useEffect(() => {
        const activeObject = canvas.getActiveObject();
        activeObject && setValue(activeObject.get('angle') || 0);
    }, [canvas])


    const onChangeImageOpacity = (newValue) => {
        const activeObject = canvas.getActiveObject();
        activeObject.rotate(newValue);
        setValue(newValue);
        updateLocalCanvas(canvas, 'Angle');
    }

    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.imageBlurWrap}`}>
            <TextElement text={'Angle'} color={token.colorTextBase} />
            <div className={`${styleElementCSS.elementWrap} ${styles.imageBlurContent}`}>
                <SliderElement
                    min={0}
                    max={360}
                    onChange={(value) => onChangeImageOpacity(value)}
                    value={value}
                    step={1}
                />
            </div>
        </div>
    )
}

export default Angle