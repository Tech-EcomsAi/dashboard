import React, { useState } from 'react'
import styles from './graphics.module.scss'
import GlobalCss from '@craftBuilder/craftBuilder.module.scss'
import { Input, Segmented, theme, Tooltip } from 'antd'
import { TbDimensions, TbIcons } from 'react-icons/tb'
import { GiThreeLeaves } from 'react-icons/gi'
import GraphicsElements from './graphicsElements'
import IconsElements from './iconsElements'
import { BsThreeDots } from 'react-icons/bs'
import ThreeDElements from './threeDElements'

const TAB_TYPES = {
    ICONS: 'Icons',
    THREED: '3D',
    GRAPHICS: 'Graphics',
}

function Graphics({ canvas, updateLocalCanvas }) {
    const { token } = theme.useToken();

    const FILL_TYPE_ITEMS_LIST = [
        { key: TAB_TYPES.THREED, icon: <TbDimensions /> },
        { key: TAB_TYPES.ICONS, icon: <TbIcons /> },
        { key: TAB_TYPES.GRAPHICS, icon: <GiThreeLeaves /> },
    ]

    const getSegmentOptions = () => {
        return FILL_TYPE_ITEMS_LIST.map((option) => {
            return {
                label:
                    <Tooltip title={`${option.key} images`}>
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
    const [activeTab, setActiveTab] = useState(TAB_TYPES.THREED);


    return (
        <div className={styles.graphicsWrap}>
            <div className={GlobalCss.segmentWrap} >
                <Segmented
                    className={GlobalCss.largeSegmentWrap}
                    style={{ background: token.colorBgTextActive }}
                    size="middle"
                    block={true}
                    value={activeTab}
                    defaultValue={TAB_TYPES.THREED}
                    onChange={(tab: any) => setActiveTab(tab)}
                    options={getSegmentOptions()}
                />
            </div>
            <div className={styles.tabContent}>

                {activeTab == TAB_TYPES.THREED && <>
                    <div className={styles.graphicsListWrap}>
                        <ThreeDElements canvas={canvas} updateLocalCanvas={updateLocalCanvas} />
                    </div>
                </>}

                {activeTab == TAB_TYPES.ICONS && <>
                    <IconsElements canvas={canvas} updateLocalCanvas={updateLocalCanvas} />
                </>}

                {activeTab == TAB_TYPES.GRAPHICS && <>
                    <div className={styles.graphicsListWrap}>
                        <GraphicsElements canvas={canvas} updateLocalCanvas={updateLocalCanvas} />
                    </div>
                </>}


            </div>
        </div>
    )
}

export default Graphics