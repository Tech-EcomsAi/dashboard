import React from 'react';
import styles from './contentAlignment.module.scss'
import styleElementCSS from '@moleculesCSS/styleElement/styleElement.module.scss';
import { TbAlignCenter, TbAlignLeft, TbAlignRight } from 'react-icons/tb';
import { theme } from 'antd';
import TextElement from '@antdComponent/textElement';
import Saperator from '@atoms/Saperator';

function ContentAlignment({ value, onChange }) {
    const { token } = theme.useToken();
    const optionsList = [
        { value: 'flex-start', label: 'Left', icon: <TbAlignLeft /> },
        { value: 'center', label: 'Center', icon: <TbAlignCenter /> },
        { value: 'flex-end', label: 'Right', icon: <TbAlignRight /> },
    ]

    const onChangeValue = (value) => {
        onChange(value)
    }

    return (
        <div className={`${styleElementCSS.styleWrap} ${styles.contentWrap}`}>
            <TextElement text={'Content Alighnment'} color={token.colorTextBase} size={"medium"} />
            <div className={`${styleElementCSS.elementWrap} ${styles.propertyWrapper}`}>
                {optionsList.map((type, i) => {
                    return <React.Fragment key={i}>
                        <div className={styles.iconWrap} onClick={() => onChangeValue(type.value)} style={{
                            color: type.value == value ? token.colorPrimary : token.colorText,
                            border: '1px solid #dee1ec',
                            borderColor: type.value == value ? token.colorPrimary : token.colorBgLayout,
                            background: token.colorBgLayout
                        }}>
                            {type.icon}
                        </div>
                    </React.Fragment>
                })}
            </div>
            <Saperator />
        </div>
    )
}

export default ContentAlignment