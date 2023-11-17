import { Button, Drawer, Select, Space, Tooltip, theme } from 'antd';
import React, { useEffect, useState } from 'react'
import ColorPickerComponent from '../colorPicker';
import styles from './gradientColor.module.scss';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import getBackground from '@util/getBackgroundStyle';
import Gradients from './gradients';
import { MdOutlineClose, MdAdd } from 'react-icons/md'
import { BACKGROUND_TYPES } from '@constant/common';
import { getGradientValue } from '@util/getColorsValue';
import { removeObjRef } from '@util/utils';
import IconButton from '@antdComponent/iconButton';

const GRADIENT_DIRECTIONS = {
    linear: [
        { value: 'to right', label: 'Right' },
        { value: 'to right bottom', label: 'Right Bottom' },
        { value: 'to right top', label: 'Right Top' },
        { value: 'to left', label: 'Left' },
        { value: 'to left bottom', label: 'Left Bottom' },
        { value: 'to left top', label: 'Left Top' },
        { value: 'to bottom', label: 'Bottom' },
        { value: 'to top', label: 'Top' },
    ],
    radialCircle: [
        { value: 'circle at center', label: 'Circle at center' },
        { value: 'circle at left', label: 'Circle at left' },
        { value: 'circle at right', label: 'Circle at right' },
        { value: 'circle at top', label: 'Circle at top' },
        { value: 'circle at bottom', label: 'Circle at bottom' },
    ],
    radialEllipse: [
        { value: 'ellipse at center', label: 'Ellipse at center' },
        { value: 'ellipse at left', label: 'Ellipse at left' },
        { value: 'ellipse at right', label: 'Ellipse at right' },
        { value: 'ellipse at top', label: 'Ellipse at top' },
        { value: 'ellipse at bottom', label: 'Ellipse at bottom' },
    ]
}
const GRADIENT_TYPES = [
    { value: 'linear', label: 'Linear' },
    { value: 'radialCircle', label: 'Radial Circle' },
    { value: 'radialEllipse', label: 'Radial Ellipse' },
]

const valueSample = {
    value: 'linear-gradient(to right, #fff, #000)',
    type: 'Gradient',
    direction: 'to right',
    colors: [{ color: '#000', format: 'hex' }]
}

function GradientColor({ value, onChange }) {

    const [showGradientsList, setShowGradientsList] = useState(false);
    const [originalState, setOriginalState] = useState({ isUpdated: false, value: null });
    const { token } = theme.useToken();

    useEffect(() => {
        (showGradientsList) && setOriginalState({ isUpdated: false, value })
    }, [showGradientsList])

    const onSelectGradient = (selectedConfig) => {
        !selectedConfig.doNotCloseDrawer && setShowGradientsList(false);
        const colors = selectedConfig.colors.map(c => { return { color: c, format: 'hex' } })
        const gradientObj = {
            value: '',
            props: { direction: 'to right', type: "linear" },
            type: 'Gradient',
            colors
        }
        gradientObj.value = getGradientValue(gradientObj)
        onChange(gradientObj);
    }

    const onChangeColor = (index, newColor) => {
        const valueCopy = { ...value };
        const colorsCopy = [...valueCopy.colors];
        colorsCopy[index] = newColor;
        valueCopy.colors = colorsCopy;
        valueCopy.value = getGradientValue(valueCopy);
        onChange(valueCopy);
    }

    const onChangeDirection = (direction) => {
        const valueCopy = removeObjRef(value);
        if (!valueCopy.props) valueCopy.props = { direction: "", type: "" }
        valueCopy.props.direction = direction;
        valueCopy.value = getGradientValue(valueCopy);
        onChange(valueCopy);
    }

    const onChangeType = (type) => {
        const valueCopy = removeObjRef(value);
        if (!valueCopy.props) valueCopy.props = { direction: "", type: "" }
        valueCopy.props.type = type;
        valueCopy.props.direction = GRADIENT_DIRECTIONS[type][0].value;
        valueCopy.value = getGradientValue(valueCopy);
        onChange(valueCopy);
    }

    const removeColor = (colorIndex) => {
        const valueCopy = { ...value };
        const colorsCopy = [...valueCopy.colors];
        colorsCopy.splice(colorIndex, 1);
        valueCopy.colors = colorsCopy;
        valueCopy.value = getGradientValue(valueCopy);
        onChange(valueCopy);
    }

    const onAddColor = () => {
        const valueCopy = { ...value };
        const colorsCopy = [...valueCopy.colors];
        colorsCopy.push({ color: '#0a192f', format: 'hex' })
        valueCopy.colors = colorsCopy;
        valueCopy.value = getGradientValue(valueCopy);
        onChange(valueCopy);
    }


    const handleSave = (imageData, doNotCloseDrawer) => {
        onSelectGradient({ ...imageData, doNotCloseDrawer });
    }

    const handleCancel = () => {
        if (!originalState.isUpdated) {
            onChange(originalState.value)
        }
        setShowGradientsList(false);
    }


    return (
        <div className={` ${styles.gradientColorWrap}`}>
            <div className={styles.elementWrap}>
                <div className={styles.colorWrap} style={{ ...getBackground(value) }}></div>
                <div className={styles.actionWrap}>
                    <div className={styles.colorPicker}>
                        {value.colors.map((colorData, cIndex) => {
                            return <div className={`${styles.colorItemWrap}`} key={cIndex}>
                                {value.colors.length > 2 && <div className={styles.iconWrap} onClick={() => removeColor(cIndex)}>
                                    <MdOutlineClose />
                                </div>}
                                <ColorPickerComponent
                                    hideColorString
                                    hideTransparency
                                    page={BACKGROUND_TYPES.GRADIENT}
                                    value={colorData}
                                    onChange={(value) => onChangeColor(cIndex, value)}
                                    parentStyles={{ width: "auto", margin: 'unset' }}
                                />
                            </div>
                        })}
                        {value.colors.length <= 6 && <IconButton tooltip={"Add more color"} type={'defaultButton'} icon={<MdAdd />} active={false} onClickButton={onAddColor} />}
                    </div>
                    <div className={styles.positionWrap}>
                        <Select
                            showSearch
                            defaultValue={value?.props?.type}
                            style={{ width: 160 }}
                            onChange={(value) => onChangeType(value)}
                            options={GRADIENT_TYPES}
                        />
                    </div>
                    <div className={styles.positionWrap}>
                        <Select
                            showSearch
                            defaultValue={value?.props?.direction}
                            style={{ width: 160 }}
                            onChange={(value) => onChangeDirection(value)}
                            options={GRADIENT_DIRECTIONS[value?.props?.type || 'linear']}
                        />
                    </div>
                    <Tooltip title="View list of gradients">
                        <Button style={{ width: "100%", color: token.colorTextSecondary }} type={showGradientsList ? "primary" : "text"} className={`${showGradientsList ? styles.active : ''}`} onClick={() => setShowGradientsList(true)}>View More...</Button>
                    </Tooltip>
                    <Drawer
                        title="Colorful Gradients Pallets"
                        placement='right'
                        open={showGradientsList}
                        width={450}
                        destroyOnClose
                        onClose={handleCancel}
                        className={styles.imagePickerModalWrap}
                        maskStyle={{ background: 'unset' }}
                        // bodyStyle={{ padding: '0px' }}
                        footer={
                            <Space>
                                <Button onClick={handleCancel}>Cancel</Button>
                                <Button type="primary" onClick={() => setShowGradientsList(false)}>Update</Button>
                            </Space>
                        }
                    // footerStyle={{ display: 'flex', justifyContent: "flex-end", marginBottom: '5px' }}
                    >
                        <div className={styles.modalContentWrap}>
                            <Gradients onSelect={(value) => handleSave(value, true)} />
                        </div>
                    </Drawer>

                </div>
            </div>
        </div>
    )
}

export default GradientColor