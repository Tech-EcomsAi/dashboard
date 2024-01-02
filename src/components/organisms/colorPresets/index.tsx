import TextElement from '@antdComponent/textElement';
import ColorPickerComponent from '@molecules/styleElement/colorPicker';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import { removeObjRef } from '@util/utils';
import { theme } from 'antd';
import { MdAdd, MdOutlineClose } from 'react-icons/md';
import styles from './colorPresets.module.scss';

function ColorPresets({ config, onConfigUpdate }) {
    const { token } = theme.useToken();
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
            <TextElement text={'Saved Colors'} color={token.colorTextBase} size={"medium"} />
            <div className={`${styleElementCSS.elementWrap}`}>
                {config?.map((colorGroup: any, groupIndex: number) => {
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