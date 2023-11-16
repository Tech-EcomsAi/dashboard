import { Select, Slider, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './objectPropertiesEditor.module.scss'
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import ColorPickerComponent from '@molecules/styleElement/colorPicker';
import { fabric } from "fabric";
import { removeObjRef } from '@util/utils';
import { shadowTypeList } from '@constant/craftBuilder';
import TextElement from '@antdComponent/textElement';
import SliderElement from '@antdComponent/sliderElement';
const { Option } = Select;

function Shadow({ updateLocalCanvas, canvas }) {

    const [shadow, setShadow] = useState<any>();
    const { token } = theme.useToken();

    useEffect(() => {
        const activeObject = canvas?.getActiveObject();
        if (activeObject) {
            const propertyValues = activeObject.get('shadow')
            if (propertyValues) {
                const type = shadowTypeList.find((item) => (item.color === propertyValues.color && item.offsetX === propertyValues.offsetX && item.offsetY === propertyValues.offsetY));
                propertyValues.label = type?.label || '';
                setShadow(propertyValues);
            } else {
                setShadow(shadowTypeList[0]);
            }
        }
    }, [canvas])

    const onChangeValue = (from, value) => {
        const activeObject = canvas.getActiveObject();
        let propertyValue = removeObjRef({ ...shadow });
        if (from == 'type') {
            const shadowType = shadowTypeList.find((item) => item.label === value);
            propertyValue = { ...shadowType, label: value };
        } else {
            propertyValue[from] = value;
        }
        if (propertyValue.offsetY || propertyValue.offsetX || from == 'type') {
            var newShadow = new fabric.Shadow({ ...propertyValue });
            activeObject.set('shadow', newShadow)
            updateLocalCanvas(canvas, 'Shadow');
        }
        setShadow({ ...propertyValue });
    }

    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.borderWrap}`}>
            <TextElement text={'Shadow'} color={token.colorTextBase} />
            <div className={`${styleElementCSS.elementWrap} ${styles.elementWrap}`}>
                <div className={`${styleElementCSS.styleWrap} ${styles.borderItemWrap}`}>
                    <TextElement text={'Type'} color={token.colorTextBase} />
                    <div className={styleElementCSS.elementWrap}>
                        <Select
                            placeholder="Select"
                            defaultValue={''}
                            style={{ width: '100%' }}
                            onChange={(value) => onChangeValue('type', value)}
                            value={shadow?.label}
                            options={shadowTypeList}
                        />
                        {/* {shadowTypeList.map((item,i) => {
                                return <Option key={i} value={item.label} label={item.label}>
                                    <div>{item.label}</div>
                                </Option>
                            })}
                        </Select> */}
                    </div>
                </div>
                <div className={`${styleElementCSS.styleWrap} ${styles.borderItemWrap}`} style={{ width: '60px' }}>
                    <TextElement text={'Color'} color={token.colorTextBase} />
                    <div className={styleElementCSS.elementWrap}>
                        {shadow && <ColorPickerComponent
                            parentStyles={{ margin: 'unset', background: 'unset' }}
                            hideColorString hideTransparency
                            value={{ format: 'hex', color: shadow.color || '#0000' }}
                            onChange={(value) => onChangeValue('color', value.color)} />}
                    </div>
                </div>
            </div>
            <div className={`${styleElementCSS.styleWrap} ${styles.imageBlurWrap}`} style={{ background: 'unset', color: token.colorTextBase, padding: '0' }}>
                <TextElement text={'Blur'} color={token.colorTextBase} />
                <div className={`${styleElementCSS.elementWrap} ${styles.imageBlurContent}`}>
                    <SliderElement
                        min={0}
                        max={200}
                        onChange={(value) => onChangeValue('blur', value)}
                        value={shadow?.blur}
                        step={1}
                    />
                </div>
            </div>
            <div className={`${styleElementCSS.styleWrap} ${styles.imageBlurWrap}`} style={{ background: 'unset', color: token.colorTextBase, padding: '0' }}>
                <TextElement text={'offsetX'} color={token.colorTextBase} />
                <div className={`${styleElementCSS.elementWrap} ${styles.imageBlurContent}`}>
                    <SliderElement
                        min={0}
                        max={50}

                        onChange={(value) => onChangeValue('offsetX', value)}
                        value={shadow?.offsetX}
                        step={1} />
                </div>
            </div>
            <div className={`${styleElementCSS.styleWrap} ${styles.imageBlurWrap}`} style={{ background: 'unset', color: token.colorTextBase, padding: '0' }}>
                <TextElement text={'offsetY'} color={token.colorTextBase} />
                <div className={`${styleElementCSS.elementWrap} ${styles.imageBlurContent}`}>
                    <SliderElement
                        min={0}
                        max={50}

                        onChange={(value) => onChangeValue('offsetY', value)}
                        value={shadow?.offsetY}
                        step={1}
                    />
                </div>
            </div>
        </div>)
}

export default Shadow