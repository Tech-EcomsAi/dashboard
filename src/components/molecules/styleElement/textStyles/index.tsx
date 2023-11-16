import React from 'react'
import ColorPickerComponent from '../colorPicker';
import FontFamily from '../fontFamily';
import FontSize from '../fontSize';
import styles from './textStyles.module.scss';
import { TbAlignCenter, TbAlignLeft, TbAlignRight, TbBold, TbUnderline, TbItalic } from 'react-icons/tb';
import { Button, theme } from 'antd';
import LetterSpacing from '../letterSpacing';
import LineHeight from '../lineHeight';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import TextElement from '@antdComponent/textElement';
import Saperator from '@atoms/Saperator';
import IconButton from '@antdComponent/iconButton';

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
            <TextElement text={'Text Styles'} size="medium" />
            <div className={`${styleElementCSS.elementWrap} ${styles.elementWrap}`}>
                <div className={styles.propertyWrapper}>
                    <FontFamily value={config.fontFamily} onChange={onChange} />
                    <FontSize value={config.fontSize} onChange={onChange} />
                </div>
                <div className={styles.propertyWrapper}>
                    <LetterSpacing value={config.fontSize} onChange={onChange} />
                    <LineHeight value={config.fontFamily} onChange={onChange} />
                </div>
                <div className={styles.propertyWrapper}>
                    {textStylesList.map((style, i) => {
                        return <React.Fragment key={i}>
                            <IconButton type={'defaultButton'} icon={style.icon} active={style.value == config[style.property]} onClickButton={() => onClickAction(style)} />
                        </React.Fragment>
                    })}
                </div>
                <ColorPickerComponent hideTransparency value={{ format: 'hex', color: config.color || '#000' }} onChange={(value) => onChange('color', value.color)} label="Text Color" />
            </div>
            <Saperator />
        </div>
    )
}

export default TextStyles