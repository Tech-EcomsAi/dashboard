import { CUSTOME_ATTRIBUTES, OBJECT_TYPES } from '@constant/craftBuilder';
import { Button, Select, Slider, theme } from 'antd';
import React, { useEffect, useState } from 'react'
import { fabric } from "fabric";
import styles from './background.module.scss'
import GlobalCss from '@craftBuilder/craftBuilder.module.scss'
import Gradients from '@molecules/styleElement/gradientColor/gradients';
import gradientList from 'src/data/gradientList';
import { MdAdd, MdOutlineClose } from 'react-icons/md';
import ColorPickerComponent from '@molecules/styleElement/colorPicker';
import { BACKGROUND_TYPES } from '@constant/common';

const gradientColorsSample = [
    { "offset": 0, "color": "red" },
    { "offset": 1, "color": "blue" }
]

function BGGradient({ updateLocalCanvas, workspace, canvas }) {

    const { token } = theme.useToken();
    const [initialPropsGets, setInitialPropsGets] = useState(false);
    const [currentColors, setCurrentColors] = useState([])

    const gradientDirectionsList = [
        { value: 'Right', positions: { x1: 0, y1: 0, x2: workspace?.get('width'), y2: 0 }, label: 'Right' },
        { value: 'Right Bottom', positions: { x1: 0, y1: 0, x2: workspace?.get('width'), y2: workspace?.get('height') }, label: 'Right Bottom' },
        { value: 'Right Top', positions: { x1: 0, y1: workspace?.get('height'), x2: workspace?.get('width'), y2: 0 }, label: 'Right Top' },
        { value: 'Left', positions: { x1: workspace?.get('width'), y1: 0, x2: 0, y2: 0 }, label: 'Left' },
        { value: 'Left Bottom', positions: { x1: workspace?.get('width'), y1: 0, x2: 0, y2: workspace?.get('height') }, label: 'Left Bottom' },
        { value: 'Left Top', positions: { x1: workspace?.get('width'), y1: workspace?.get('height'), x2: 0, y2: 0 }, label: 'Left Top' },
        { value: 'Bottom', positions: { x1: 0, y1: 0, x2: 0, y2: workspace?.get('height') }, label: 'Bottom' },
        { value: 'Top', positions: { x1: 0, y1: workspace?.get('height'), x2: 0, y2: 0 }, label: 'Top' },
    ]
    const [currentDirection, setCurrentDirection] = useState(gradientDirectionsList[1])

    useEffect(() => {
        if (canvas) {
            if (workspace) {
                if (workspace.get('fill') instanceof fabric.Gradient) {
                    console.log('Fill is a gradient:', workspace.get('fill'));
                    setCurrentColors(workspace.get('fill').colorStops)
                    const coords = workspace.get('fill').coords; // cords => {x1: 0, y1: 0, x2:  workspace.get('width'), y2:  workspace.get('height')}
                    const direction = gradientDirectionsList.find((d) => (d.positions.x1 == coords.x1 && d.positions.y1 == coords.y1 && d.positions.x2 == coords.x2 && d.positions.y2 == coords.y2))
                    setCurrentDirection(direction || gradientDirectionsList[1]);
                }
            }
            setInitialPropsGets(true)
        }
    }, [workspace, canvas])

    const calculateOffsets = (colorsCount) => {
        const offsetIncrement = 1 / (colorsCount - 1);
        let offset = 0;
        const offsets = [];
        for (let i = 0; i < colorsCount; i++) {
            offsets.push(offset);
            offset += offsetIncrement;
        }
        return offsets;
    }

    const updateGradient = (colorStops) => {
        if (colorStops) {
            setCurrentColors(colorStops);
            // Create a linear gradient
            const gradientObject = new fabric.Gradient({
                type: 'linear',
                coords: currentDirection.positions,
                colorStops: colorStops,
            });
            workspace.set('fill', gradientObject)
            canvas.renderAll();
            updateLocalCanvas(canvas, 'BGGradient:updateGradient')
        }
    }

    const onClickGradient = (colors) => {
        const offsets = calculateOffsets(colors.length)
        const colorStops = colors.map((color, i) => {
            return { offset: offsets[i], color }
        })
        updateGradient(colorStops);
    }

    const removeColor = (index) => {
        const currentColorsCopy = [...currentColors];
        currentColorsCopy.splice(index, 1)
        updateGradient(currentColorsCopy)
    }

    const onChangeColor = (index, value) => {
        const currentColorsCopy = [...currentColors];
        currentColorsCopy[index].color = value;
        updateGradient(currentColorsCopy)
    }

    const onAddColor = () => {
        const currentColorsCopy = [...currentColors];
        currentColorsCopy.push({ offset: 0.5, color: '#fff' })
        updateGradient(currentColorsCopy)
    }

    const onChangeOffset = (index, value) => {
        const currentColorsCopy = [...currentColors];
        currentColorsCopy[index].offset = value;
        updateGradient(currentColorsCopy)
    }

    const onChangeDirection = (direction) => {
        const directionObj = gradientDirectionsList.find((d) => d.value == direction)
        if (directionObj) {
            setCurrentDirection(directionObj);
            // Create a linear gradient
            const gradientObject = new fabric.Gradient({
                type: 'linear',
                coords: directionObj.positions,
                colorStops: currentColors,
            });
            workspace.set('fill', gradientObject)
            updateLocalCanvas(canvas, 'BGGradient,onChangeDirection')
        }
    }

    return (
        <div className={styles.gradientWrap}>
            {currentColors.length != 0 && <div className={styles.currentGradient}>
                <div className={styles.colorPicker}>
                    {currentColors.map((colorData, cIndex) => {
                        return <div className={`${styles.colorItemWrap}`} key={cIndex}>
                            <ColorPickerComponent
                                hideColorString
                                hideTransparency
                                hidePresets
                                page={BACKGROUND_TYPES.GRADIENT}
                                value={{ format: 'hex', color: colorData.color }}
                                onChange={(value) => onChangeColor(cIndex, value.color)}
                                parentStyles={{ width: "auto", margin: 'unset', background: 'unset' }}
                            />
                            <Slider
                                min={0}
                                max={1}
                                className={styles.siderWrap}
                                defaultValue={colorData.offset}
                                style={{ width: '100%' }}
                                railStyle={{ background: token.colorBgSpotlight }}
                                trackStyle={{ background: token.colorBgSpotlight }}
                                onChange={(value) => onChangeOffset(cIndex, value)}
                                value={colorData.offset}
                                step={0.1}
                            />
                            {currentColors.length > 2 && <div className={styles.iconWrap} onClick={() => removeColor(cIndex)}>
                                <MdOutlineClose />
                            </div>}
                        </div>
                    })}
                    {currentColors.length <= 6 && <div className={`${styles.colorItemWrap} ${styles.addColor}`} onClick={onAddColor}>
                        <MdAdd />
                    </div>}
                </div>
                <div className={styles.positionWrap}>
                    <Select
                        showSearch
                        defaultValue={gradientDirectionsList[1].label}
                        value={currentDirection?.label || ''}
                        style={{ width: '100%' }}
                        onChange={(label) => onChangeDirection(label)}
                        options={gradientDirectionsList}
                    />
                </div>
            </div>}
            <div className={styles.gradientListWrap}>
                {gradientList.map((gradientData, i) => {
                    return <div className={styles.gradientWrap} key={i}>
                        <div className={styles.gradientItem} onClick={() => onClickGradient(gradientData.colors)}
                            style={{ background: `linear-gradient(to right bottom,${gradientData.colors[0]},${gradientData.colors[1]}` }}></div>
                        {/* <div className={styles.gradientNameColorWrap}>
                            <div className={styles.name}>{gradientData.name}</div>
                        </div> */}
                    </div>
                })}
            </div>
        </div>
    )
}

export default BGGradient