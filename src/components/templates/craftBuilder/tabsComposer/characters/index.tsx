import React, { useState } from 'react'
import styles from './characters.module.scss'
import GlobalCss from '@craftBuilder/craftBuilder.module.scss'
import { Input, Segmented, theme, Tooltip } from 'antd'
import { FaPersonWalking, FaGlasses } from 'react-icons/fa6'
import { CHARACTERS_TAB_TYPES } from 'src/data/characters'
import CharactersElements from './charactersElements'

function Characters({ canvas, updateLocalCanvas }) {
    const { token } = theme.useToken();

    const FILL_TYPE_ITEMS_LIST = [
        { key: CHARACTERS_TAB_TYPES.TEMPLATES, icon: <FaPersonWalking /> },
        { key: CHARACTERS_TAB_TYPES.ASSETS, icon: <FaGlasses /> },
    ]

    const getSegmentOptions = () => {
        return FILL_TYPE_ITEMS_LIST.map((option) => {
            return {
                label:
                    <Tooltip title={`${option.key}`}>
                        <div style={{ color: activeTab == option.key ? token.colorPrimary : 'inherit' }}
                            className={`${GlobalCss.segmentItem} ${activeTab == option.key ? GlobalCss.active : ''}`}>
                            <div className={GlobalCss.iconWrap} style={{ backgroundColor: activeTab == option.key ? token.colorPrimary : token.colorBgBase }}>
                                {option.icon}
                            </div>
                            <div className={GlobalCss.name} style={{ color: activeTab == option.key ? token.colorPrimary : token.colorBgBase }}>{option.key}</div>
                        </div>
                    </Tooltip>,
                value: option.key
            }
        })
    }
    const [activeTab, setActiveTab] = useState(CHARACTERS_TAB_TYPES.TEMPLATES);


    return (
        <div className={styles.graphicsWrap}>
            <div className={GlobalCss.segmentWrap} >
                <Segmented
                    className={GlobalCss.largeSegmentWrap}
                    style={{ background: token.colorBgTextActive }}
                    size="middle"
                    block={true}
                    value={activeTab}
                    defaultValue={CHARACTERS_TAB_TYPES.TEMPLATES}
                    onChange={(tab: any) => setActiveTab(tab)}
                    options={getSegmentOptions()}
                />
            </div>
            <div className={styles.tabContent}>
                {activeTab && <CharactersElements canvas={canvas} updateLocalCanvas={updateLocalCanvas} activeTab={activeTab} />}
            </div>
        </div>
    )
}

export default Characters