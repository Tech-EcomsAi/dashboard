import { Select, Slider, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './objectPropertiesEditor.module.scss'
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import ColorPickerComponent from '@molecules/styleElement/colorPicker';
import { strokeTypeList } from '@constant/craftBuilder';
const { Option } = Select;

function Stroke({ updateLocalCanvas, canvas }) {

    const [stroke, setStroke] = useState<any>();
    const { token } = theme.useToken();

    useEffect(() => {
        const activeObject = canvas?.getActiveObject();
        if (activeObject) {
            const propertyValues = {
                stroke: activeObject.get('stroke'),
                strokeWidth: activeObject.get('strokeWidth'),
                strokeDashArray: activeObject.get('strokeDashArray'),
                strokeUniform: activeObject.get('strokeUniform'),
                strokeLineCap: activeObject.get('strokeLineCap'),
                label: ''
            };
            const type = strokeTypeList.find((item) => (item.strokeDashArray === propertyValues.strokeDashArray && item.strokeLineCap === propertyValues.strokeLineCap));
            propertyValues.label = type?.label || '';
            setStroke(propertyValues);
        }
    }, [canvas])

    const onChangeValue = (from, value) => {
        const activeObject = canvas.getActiveObject();
        let propertyValue = { ...stroke };
        if (from == 'type') {
            const strokeType = strokeTypeList.find((item) => item.label === value);
            activeObject.set(strokeType);
            propertyValue = { ...strokeType };
        } else {
            activeObject.set(from, value);
            propertyValue[from] = value;
        }
        setStroke(propertyValue);
        updateLocalCanvas(canvas, `stroke: ${from}`);
    }

    const onReset = () => {
        const activeObject = canvas.getActiveObject();
        const propertyValues = {
            stroke: '#0000',
            strokeWidth: 0,
            strokeDashArray: null,
            strokeUniform: null,
            strokeLineCap: null,
            label: ''
        };
        activeObject.set({ strokeDashArray: null, strokeUniform: null, strokeLineCap: null });
        activeObject.set('stroke', '#0000');
        activeObject.set('strokeWidth', 0);
        setStroke(propertyValues)
        updateLocalCanvas(canvas, 'stroke');
    }

    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.borderWrap}`}>
            <div className={styleElementCSS.label}>Border/Stroke</div>

            <div className={`${styleElementCSS.elementWrap} ${styles.elementWrap}`}>
                <div className={`${styleElementCSS.styleWrap} ${styles.borderItemWrap}`}>
                    <div className={styleElementCSS.label}>Type</div>
                    <div className={styleElementCSS.elementWrap}>
                        <Select
                            placeholder="Select type"
                            defaultValue={''}
                            style={{ width: '100%' }}
                            onChange={(value) => onChangeValue('type', value)}
                            value={stroke?.label || 'Select type'}
                            optionLabelProp="label"
                        >
                            {strokeTypeList.map(item => {
                                return <Option key={item.label} value={item.label} label={item.label}>
                                    <div>{item.label}</div>
                                </Option>
                            })}
                        </Select>
                    </div>
                </div>
                <div className={`${styleElementCSS.styleWrap} ${styles.borderItemWrap}`} style={{ width: '60px' }}>
                    <div className={styleElementCSS.label}>Color</div>
                    <div className={styleElementCSS.elementWrap}>
                        {stroke && <ColorPickerComponent parentStyles={{ margin: 'unset', background: 'unset' }} hideColorString hideTransparency value={{ format: 'hex', color: stroke?.stroke || '#0000' }} onChange={(value) => onChangeValue('stroke', value.color)} />}
                    </div>
                </div>
            </div>
            <div className={`${styleElementCSS.styleWrap} ${styles.imageBlurWrap}`} style={{ padding: '0' }}
            >
                <div className={`${styleElementCSS.label}  ${styles.imageBlurLabel}`}>Size</div>
                <div className={`${styleElementCSS.elementWrap} ${styles.imageBlurContent}`}>
                    <Slider
                        min={0}
                        max={50}
                        className={styles.siderWrap}
                        defaultValue={0}
                        style={{ width: '100%' }}
                        railStyle={{ background: token.colorBgMask, }}
                        trackStyle={{ background: `black`, }}
                        onChange={(value) => onChangeValue('strokeWidth', value)}
                        value={stroke?.strokeWidth}
                        step={1}
                    />
                </div>
            </div>
        </div>
    )
}

export default Stroke