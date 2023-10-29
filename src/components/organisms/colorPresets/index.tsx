import React from 'react'
import styles from './colorPresets.module.scss'
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import ColorPickerComponent from '@molecules/styleElement/colorPicker';
import { MdOutlineClose, MdAdd } from 'react-icons/md'
import { removeObjRef } from '@util/utils';
function ColorPresets({ config, onConfigUpdate }) {

    const onChangeValue = (groupIndex, colorIndex, value) => {
        const configCopy = removeObjRef(config);
        configCopy[groupIndex].colors[colorIndex] = value;
        onConfigUpdate(configCopy)
    }

    const removeColor = (groupIndex, colorIndex) => {
        const configCopy = removeObjRef(config);
        configCopy[groupIndex].colors.splice(colorIndex, 1)
        onConfigUpdate(configCopy)
    }

    const onAddColor = (groupIndex) => {
        const configCopy = removeObjRef(config);
        configCopy[groupIndex].colors.push('#0a192f')
        onConfigUpdate(configCopy)
    }

    return (

        <div className={`${styleElementCSS.styleWrap} ${styles.colorPresetsWrap}`}>
            <div className={styleElementCSS.label}>Saved Colors</div>
            <div className={`${styleElementCSS.elementWrap}`}>
                {config.map((colorGroup: any, groupIndex: number) => {
                    return <div className={styles.colorGroupWrap} key={groupIndex + 1}>
                        <div className={styles.heading}>{colorGroup.label}</div>
                        <div className={styles.colorsWrap}>
                            {colorGroup.colors.map((color, colorIndex) => {
                                return <div className={`${styles.colorWrap}`} key={colorIndex}>
                                    <div className={styles.iconWrap} onClick={() => removeColor(groupIndex, colorIndex)}>
                                        <MdOutlineClose />
                                    </div>
                                    <ColorPickerComponent
                                        hidePresets
                                        hideColorString
                                        hideTransparency
                                        value={{ format: 'hex', color }}
                                        onChange={(value) => onChangeValue(groupIndex, colorIndex, value.color)}
                                    />
                                </div>
                            })}
                            <div className={`${styles.colorWrap} ${styles.addColor}`} onClick={() => onAddColor(groupIndex)}>
                                <MdAdd />
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default ColorPresets