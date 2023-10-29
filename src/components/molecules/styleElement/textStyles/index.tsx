import React from 'react'
import ColorPickerComponent from '../colorPicker';
import FontFamily from '../fontFamily';
import FontSize from '../fontSize';
import styles from './textStyles.module.scss';
import { TbAlignCenter, TbAlignLeft, TbAlignRight, TbBold, TbUnderline, TbItalic } from 'react-icons/tb';
import { theme } from 'antd';
import LetterSpacing from '../letterSpacing';
import LineHeight from '../lineHeight';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';

function TextStyles({ config, onChange }) {

    const { token } = theme.useToken();

    const textStylesList = [
        { value: 'left', label: 'Left', icon: <TbAlignLeft />, property: 'textAlign' },
        { value: 'center', label: 'Center', icon: <TbAlignCenter />, property: 'textAlign' },
        { value: 'right', label: 'Right', icon: <TbAlignRight />, property: 'textAlign' },
        { value: 'bold', label: 'Bold', icon: <TbBold />, property: 'fontWeight' },
        { value: 'italic', label: 'Italic', icon: <TbItalic />, property: 'fontStyle' },
        { value: 'underline', label: 'Underline', icon: <TbUnderline />, property: 'textDecoration' },
    ]

    const onClickAction = (style) => {
        switch (style.property) {
            case 'textAlign':
                onChange(style.property, style.value)
                break;
            case 'fontWeight':
                onChange(style.property, config[style.property] == style.value ? 'unset' : style.value);
                break;
            case 'fontStyle':
                onChange(style.property, config[style.property] == style.value ? 'unset' : style.value);
                break;
            case 'textDecoration':
                onChange(style.property, config[style.property] == style.value ? 'unset' : style.value);
                break;
            default:
                break;
        }
    }

    return (

        <div className={`${styleElementCSS.styleWrap} ${styles.textStylesWrap}`}>
            <div className={`${styleElementCSS.label} ${styles.label}`}>Text Styles</div>
            <div className={`${styleElementCSS.elementWrap}`}>
                <div className={styles.propertyWrapper}>
                    <FontFamily value={config.fontFamily} onChange={onChange} />
                    <FontSize value={config.fontSize} onChange={onChange} />
                </div>
                <div className={styles.propertyWrapper}>
                    {textStylesList.map((style, i) => {
                        return <React.Fragment key={i}>
                            <div className={styles.iconWrap} onClick={() => onClickAction(style)} style={{
                                color: style.value == config[style.property] ? token.colorPrimary : token.colorText,
                                border: '1px solid #dee1ec',
                                borderColor: style.value == config[style.property] ? token.colorPrimary : token.colorBgLayout,
                                background: token.colorBgLayout
                            }}>
                                {style.icon}
                            </div>
                        </React.Fragment>
                    })}
                </div>
                <div className={styles.propertyWrapper}>
                    <LetterSpacing value={config.fontSize} onChange={onChange} />
                    <LineHeight value={config.fontFamily} onChange={onChange} />
                </div>
                <ColorPickerComponent hideTransparency value={{ format: 'hex', color: config.color || '#000' }} onChange={(value) => onChange('color', value.color)} label="Text Color" />
            </div>
        </div>
    )
}

export default TextStyles