import { Button, Divider, Select, Slider, Tooltip, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './directionProperty.module.scss'
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import TextElement from '@antdComponent/textElement';
import SliderElement from '@antdComponent/sliderElement';
import Saperator from '@atoms/Saperator';
import IconButton from '@antdComponent/iconButton';
import { TbBorderCorners, TbSquare } from 'react-icons/tb';
import SegmentComponent, { SEGMENT_OPTIONS_TYPES } from '@atoms/segment';

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
    const [valueType, setValueType] = useState('Common')

    useEffect(() => {
        console.log("valueType", valueType)
    }, [valueType])

    const typesList = [
        { label: 'Top', value: 'top' },
        { label: 'Right', value: 'right' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Left', value: 'left' }
    ]

    const VALUE_TYPES = [
        { key: "Common", value: "Common", icon: <TbSquare /> },
        { key: "Indevidual", value: "Indevidual", icon: <TbBorderCorners /> },
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
        <div className={`${styleElementCSS.styleWrap} ${styles.directionsWrap}`}>
            <TextElement text={propertyType} color={token.colorTextBase} size={"medium"} styles={{ textTransform: "capitalize" }} />

            <div className={styles.propSelectionWrap}>
                <div className={styles.segmentWrap}>
                    <SegmentComponent
                        label=""
                        value={valueType}
                        onChange={(value) => setValueType(value)}
                        showIcon={true}
                        hideLabel={true}
                        size={"small"}
                        options={VALUE_TYPES}
                        type={SEGMENT_OPTIONS_TYPES.ARRAY_OF_OBJECTS}
                    />
                </div>
                <Tooltip title={`Remove ${propertyType}`}>
                    <Button className={styles.resetBtn} type='text' danger style={{ fontSize: "12px" }} onClick={onReset}>Remove</Button>
                </Tooltip>
            </div>
            <>
                {valueType == "Common" ? <div className={`${styleElementCSS.elementWrap} ${styles.elementOuter}`}>
                    <div className={`${styleElementCSS.styleWrap} ${styles.elementWrap} ${styles.commonElementWrap}`}>
                        <TextElement text={'Common'} color={token.colorTextBase} />
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
                        </div>
                    </div>
                </div> : <div className={`${styleElementCSS.elementWrap} ${styles.elementOuter}  ${styles.multiDirections}`}>
                    {typesList.map((type, i) => {
                        return <div key={i} className={`${styleElementCSS.styleWrap} ${styles.elementWrap}`}>
                            <TextElement text={`${type.label}`} color={token.colorTextBase} />
                            {/* <TextElement styles={{ minWidth: "110px", width: "110px" }} text={`${type.label} (${property[type.value]}${property.type})`} color={token.colorTextBase} /> */}
                            <div className={`${styleElementCSS.elementWrap}`}>
                                <Select
                                    showSearch
                                    value={property[type.value]}
                                    defaultValue={property[type.value]}
                                    style={{ width: '100%' }}
                                    onChange={(value) => onChangeValue(type.value, value)}
                                    options={getOptionsList()}
                                />
                                {/* <SliderElement
                                    min={0}
                                    max={100}
                                    onChange={(value) => onChangeValue(type.value, value)}
                                    value={property[type.value]}
                                    step={1}
                                /> */}
                            </div>
                        </div>
                    })}
                </div>}
            </>
            <Saperator />
        </div>
    )
}

export default DirectionProperty