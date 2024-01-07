import IconButton from '@antdComponent/iconButton';
import TextElement from '@antdComponent/textElement';
import Saperator from '@atoms/Saperator';
import SegmentComponent, { SEGMENT_OPTIONS_TYPES } from '@atoms/segment';
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import { theme } from 'antd';
import React from 'react';
import { TbAlignCenter, TbAlignLeft, TbAlignRight, TbBold, TbItalic, TbLetterCase, TbUnderline } from 'react-icons/tb';
import ColorPickerComponent from '../colorPicker';
import FontFamily from '../fontFamily';
import FontSize from '../fontSize';
import LetterSpacing from '../letterSpacing';
import LineHeight from '../lineHeight';
import styles from './textStyles.module.scss';

function TextStyles({ config, onChange }) {

    const { token } = theme.useToken();

    const textStylesList = [
        // { value: 'left', key: 'Left', icon: <TbAlignLeft />, property: 'textAlign' },
        // { value: 'center', key: 'Center', icon: <TbAlignCenter />, property: 'textAlign' },
        // { value: 'right', key: 'Right', icon: <TbAlignRight />, property: 'textAlign' },
        { value: 'bold', key: 'Bold', icon: <TbBold />, property: 'fontWeight' },
        { value: 'italic', key: 'Italic', icon: <TbItalic />, property: 'fontStyle' },
        { value: 'underline', key: 'Underline', icon: <TbUnderline />, property: 'textDecoration' },
        { value: 'uppercase', key: 'Uppercase', icon: <TbLetterCase />, property: 'textTransform' },
    ]


    const VALUE_TYPES = [
        { value: 'left', key: 'Left', icon: <TbAlignLeft />, property: 'textAlign' },
        { value: 'center', key: 'Center', icon: <TbAlignCenter />, property: 'textAlign' },
        { value: 'right', key: 'Right', icon: <TbAlignRight />, property: 'textAlign' },
    ]

    const onClickAction = (style) => {
        if (style.property == "textAlign") {
            onChange(style.property, style.value)
        } else {
            onChange(style.property, config[style.property] == style.value ? 'unset' : style.value);
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
                    <LetterSpacing value={config.letterSpacing} onChange={onChange} />
                    <LineHeight value={config.lineHeight} onChange={onChange} />
                </div>
                <div className={styles.propertyWrapper}>
                    <div className={styles.segmentWrap}>
                        <TextElement text={'Alignment'} styles={{ display: "block" }} />
                        <SegmentComponent
                            entity={'Text Alignment'}
                            label=""
                            value={config['textAlign']}
                            onChange={(value) => onChange('textAlign', value)}
                            showIcon={true}
                            hideLabel={true}
                            size={"small"}
                            options={VALUE_TYPES}
                            type={SEGMENT_OPTIONS_TYPES.ARRAY_OF_OBJECTS}
                        />
                    </div>
                    <div className={styles.decorationWrap}>
                        <TextElement text={'Decorations'} />
                        <div className={styles.propertyWrapper}>
                            {textStylesList.map((style, i) => {
                                return <React.Fragment key={i}>
                                    <IconButton styles={{ width: "100%", textTransform: "" }} type={'defaultButton'} icon={style.icon} active={style.value == config[style.property]} onClickButton={() => onClickAction(style)} />
                                </React.Fragment>
                            })}
                        </div>
                    </div>
                </div>
                <ColorPickerComponent hideTransparency value={{ format: 'hex', color: config.color || '#000' }} onChange={(value) => onChange('color', value.color)} label="Text Color" />
            </div>
            <Saperator />
        </div>
    )
}

export default TextStyles