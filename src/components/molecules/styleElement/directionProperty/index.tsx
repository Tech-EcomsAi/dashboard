import { Divider, Select, Slider, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './directionProperty.module.scss'
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';

const getOptionsList = () => {
    const res = [];
    for (let i = 0; i <= 100; i++) {
        res.push({ label: i, value: i })
    }
    return res;
}

const typeList = [
    { label: 'px', value: 'px' },
    { label: '%', value: '%' }
]

function DirectionProperty({ propertyType, onChange, value }) {
    const { token } = theme.useToken();
    const [property, setProperty] = useState({ top: 1, bottom: 1, right: 1, left: 1, type: 'px' });
    const [commonProperty, setCommonProperty] = useState(0);

    const typesList = [
        { label: 'Top', value: 'top' },
        { label: 'Right', value: 'right' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Left', value: 'left' }
    ]

    const getValue = (index, value, unit) => {
        const propertyValues = value.split(' ')[index];
        return Number(propertyValues ? propertyValues.slice(0, unit == 'px' ? -2 : -1) : 0);
    }

    useEffect(() => {
        if (value) {
            const unit = value.includes('px') ? 'px' : '%';
            const propertyValues = {
                top: getValue(0, value, unit),
                right: getValue(1, value, unit),
                bottom: getValue(2, value, unit),
                left: getValue(3, value, unit),
                type: unit
            };
            setProperty(propertyValues);
            const values = [propertyValues.top, propertyValues.bottom, propertyValues.left, propertyValues.right];
            if (values.every(v => v === propertyValues.top)) setCommonProperty(propertyValues.top);
            else setCommonProperty(0);
        }
    }, [value])

    const onChangeValue = (from, value) => {
        const propertyCopy = { ...property };
        propertyCopy[from] = value;
        onChange(propertyType, `${propertyCopy.top + propertyCopy.type} ${propertyCopy.right + propertyCopy.type} ${propertyCopy.bottom + propertyCopy.type} ${propertyCopy.left + propertyCopy.type}`);
    }

    const onChangeProperty = (from, value) => {
        const propertyCopy = { ...property };
        if (from == 'type') {
            propertyCopy.type = value;
        } else {
            propertyCopy.top = value;
            propertyCopy.right = value;
            propertyCopy.bottom = value;
            propertyCopy.left = value;
        }
        onChange(propertyType, `${propertyCopy.top + propertyCopy.type} ${propertyCopy.right + propertyCopy.type} ${propertyCopy.bottom + propertyCopy.type} ${propertyCopy.left + propertyCopy.type}`);
    }

    const onReset = () => {
        onChange(propertyType, `${'0' + property.type} ${'0' + property.type} ${'0' + property.type} ${'0' + property.type}`);
    }

    return (
        <div className={`${styleElementCSS.styleWrap}`}>
            <div className={styleElementCSS.label}>{propertyType}</div>
            <div className={`${styleElementCSS.elementWrap} ${styles.elementOuter}`}>
                {typesList.map((type, i) => {
                    return <div key={i} className={`${styleElementCSS.styleWrap} ${styles.elementWrap}`}>
                        <div className={`${styleElementCSS.label}  ${styles.elementLabel}`}>{type.label} ({property[type.value]}{property.type})</div>
                        <div className={`${styleElementCSS.elementWrap} ${styles.element}`}>
                            <Slider
                                min={0}
                                max={100}
                                className={styles.siderWrap}
                                defaultValue={1}
                                style={{ width: '100%' }}
                                railStyle={{ background: token.colorBgMask, }}
                                trackStyle={{ background: `black`, }}
                                onChange={(value) => onChangeValue(type.value, value)}
                                value={property[type.value]}
                                step={1}
                            />
                        </div>
                    </div>
                })}
                <Divider className={styles.devider} children={<div style={{ fontSize: '10px' }}>Or</div>} />
                <div className={`${styleElementCSS.styleWrap} ${styles.elementWrap} ${styles.commonElementWrap}`}>
                    <div className={`${styleElementCSS.label} ${styles.elementLabel}`}>Common</div>
                    <div className={`${styleElementCSS.elementWrap} ${styles.element}`}>
                        <Select
                            showSearch
                            value={commonProperty}
                            defaultValue={commonProperty}
                            style={{ width: '100%' }}
                            onChange={(value) => onChangeProperty('value', value)}
                            options={getOptionsList()}
                        />
                        <Select
                            defaultValue={'px'}
                            value={property.type}
                            style={{ width: '100%' }}
                            onChange={(value) => onChangeProperty('type', value)}
                            options={typeList}
                        />
                        <div onClick={onReset} className={`${styles.resetValues}  ${commonProperty == 0 ? styles.active : ''}`}>
                            Unset
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DirectionProperty