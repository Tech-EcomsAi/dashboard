import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";
import styles from '@objectPropertiesEditor/objectPropertiesEditor.module.scss';
import { Slider, theme } from 'antd';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';

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
            <div className={`${styleElementCSS.label}  ${styles.imageBlurLabel}`}>Blur</div>
            <div className={`${styleElementCSS.elementWrap} ${styles.imageBlurContent}`}>
                <Slider
                    min={0}
                    max={100}
                    className={styles.siderWrap}
                    defaultValue={100}
                    style={{ width: '100%' }}
                    railStyle={{ background: token.colorBgMask, }}
                    trackStyle={{ background: `black`, }}
                    onChange={(value) => onChangeImageOpacity(value)}
                    value={value}
                    step={1}
                />
            </div>
        </div>
    )
}

export default Opacity