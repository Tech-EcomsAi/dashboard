import React, { useEffect, useState } from 'react'
import styles from './threeD.module.scss'
import { fabric } from "fabric";
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import { Select, Slider, theme } from 'antd';
import { TREE_D_STYLES } from '@constant/craftBuilder';
import { removeObjRef } from '@util/utils';
import { activeObjectsState } from '@template/craftBuilder/types';

type pageProps = {
    updateLocalCanvas: any,
    canvas: fabric.canvas,
    activeObjectsState: activeObjectsState
}

function ThreeD({ canvas, updateLocalCanvas, activeObjectsState }: pageProps) {

    const [effects, setEffects] = useState({ skewX: 0, skewY: 0, src: '', label: '' })
    const { token } = theme.useToken();

    useEffect(() => {
        if (activeObjectsState.isSelected) {
            const activeObject = canvas?.getActiveObjects()[0];
            setEffects({ skewX: activeObject.get('skewX'), skewY: activeObject.get('skewY'), src: activeObject.toDataURL(), label: '' })

            // activeObject.clone(function (cloned) {
            //     console.log(cloned);
            //     cloned.skewX = 0
            //     cloned.skewY = 0
            //     setEffects({ skewX: activeObject.get('skewX'), skewY: activeObject.get('skewY'), src: cloned.toDataURL(), label: '' })
            // });
        }
    }, [activeObjectsState])

    const onChange = (property, value) => {
        const activeObject = canvas.getActiveObject();
        activeObject.set(property, value)
        setEffects({ ...effects, [property]: value, label: '' })
        updateLocalCanvas(canvas, 'ThreeD');
    }

    const updateSkew = (style) => {
        const value = TREE_D_STYLES.find(e => e.label == style)
        const activeObject = canvas.getActiveObject();
        const { skewX, skewY, label } = value;
        activeObject.set({
            'skewX': skewX,
            'skewY': skewY
        })
        setEffects({ skewX, skewY, src: effects.src, label })
        updateLocalCanvas(canvas, 'ThreeD');
    }

    function skewToRotation(skewX, skewY) {
        // Convert degrees to radians
        const skewXRad = fabric.util.degreesToRadians(skewX);
        const skewYRad = fabric.util.degreesToRadians(skewY);

        // Calculate rotation angles using trigonometry
        const rotateX = Math.atan(Math.tan(skewXRad)) * (180 / Math.PI);
        const rotateY = Math.atan(Math.tan(skewYRad)) * (180 / Math.PI);

        return { rotateX, rotateY };
    }

    function skewXToRotation(skewX) {
        const skewXRad = fabric.util.degreesToRadians(skewX);
        const rotateX = Math.atan(Math.tan(skewXRad)) * (180 / Math.PI);
        return rotateX;
    }
    function skewYToRotation(skewY) {
        const skewYRad = fabric.util.degreesToRadians(skewY);
        const rotateY = Math.atan(Math.tan(skewYRad)) * (180 / Math.PI);
        return rotateY;
    }

    return (
        <div className={styles.threeDWrap}>
            <div className={styleElementCSS.label}>Tilt Element</div>
            {!activeObjectsState.isSelected && <div className={styles.selectionError}>
                Please, select an element to use the 3D effect.
            </div>}
            <div className={`${styleElementCSS.styleWrap} ${activeObjectsState.isSelected ? '' : 'disabled'} ${styles.imageBlurWrap}`} >
                <div className={`${styleElementCSS.label}  ${styles.imageBlurLabel}`}>Tilt X</div>
                <div className={`${styleElementCSS.elementWrap} ${styles.imageBlurContent}`}>
                    <Slider
                        min={-40}
                        max={40}
                        className={styles.siderWrap}
                        defaultValue={effects.skewX}
                        style={{ width: '100%' }}
                        railStyle={{ background: token.colorBgSpotlight }}
                        trackStyle={{ background: token.colorBgSpotlight }}
                        onChange={(value) => onChange('skewX', value)}
                        value={effects.skewX}
                        step={10}
                    />
                </div>
            </div>
            <div className={`${styleElementCSS.styleWrap} ${activeObjectsState.isSelected ? '' : 'disabled'} ${styles.imageBlurWrap}`} >
                <div className={`${styleElementCSS.label}  ${styles.imageBlurLabel}`}>Tilt Y</div>
                <div className={`${styleElementCSS.elementWrap} ${styles.imageBlurContent}`}>
                    <Slider
                        min={-40}
                        max={40}
                        className={styles.siderWrap}
                        defaultValue={effects.skewY}
                        style={{ width: '100%' }}
                        railStyle={{ background: token.colorBgSpotlight }}
                        trackStyle={{ background: token.colorBgSpotlight }}
                        onChange={(value) => onChange('skewY', value)}
                        value={effects.skewY}
                        step={10}
                    />
                </div>
            </div>
            <div className={`${styleElementCSS.styleWrap} ${styles.imageBlurWrap}`}>
                {/* <div className={styleElementCSS.label}>Type</div> */}
                <div className={styleElementCSS.elementWrap}>
                    <Select
                        placeholder="Select effect"
                        defaultValue={''}
                        style={{ width: '100%' }}
                        onChange={(value) => updateSkew(value)}
                        value={effects?.label || 'Select tilt effect'}
                        options={TREE_D_STYLES}
                    />
                </div>
            </div>
            {/* <div className={`${activeObjectsState.isSelected ? '' : 'disabled'} ${styles.stylesList}`}>
                {TREE_D_STYLES.map((style, id) => {
                    return <div key={id} className={styles.styleDetails} onClick={() => updateSkew(style)} style={{ borderColor: token.colorBorder }}>
                        <div className={styles.styleWrap} style={{ background: token.colorTextDisabled }}>
                            <img src={effects.src} style={{
                                transform: `rotateX(${skewXToRotation(style.skewX)}deg) rotateY(${skewYToRotation(style.skewY)}deg)`
                            }} />
                        </div>
                        <div className={styles.title}>{style.label}</div>
                    </div>
                })}
            </div> */}
        </div>
    )
}

export default ThreeD