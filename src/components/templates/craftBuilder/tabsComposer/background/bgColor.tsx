import React, { useEffect, useState } from 'react'
import styles from './background.module.scss'
import GlobalCss from '@craftBuilder/craftBuilder.module.scss'
import { AiOutlineBgColors } from 'react-icons/ai'
import { VscColorMode } from 'react-icons/vsc'
import { Button, Segmented, theme, Tooltip } from 'antd'
import ColorPickerComponent from '@molecules/styleElement/colorPicker'
import { CUSTOME_ATTRIBUTES, OBJECT_TYPES, SOLID_COLORS_LIST } from '@constant/craftBuilder'
import { fabric } from "fabric";
import BGGradient from './bgGradient'
import { getCustomObjectType } from '@util/craftBuilderUtils'

const TAB_TYPES = {
    SOLID: 'Solid',
    GRADIENT: 'Gradient',
}

function BGColor({ workspace, canvas, updateLocalCanvas }) {

    const { token } = theme.useToken();
    const [initialPropsGets, setInitialPropsGets] = useState(false);
    const [fillColor, setFillColor] = useState('');

    useEffect(() => {
        if (canvas) {
            const workspaceObject = canvas.getObjects ? canvas.getObjects().find((item) => getCustomObjectType(item) === OBJECT_TYPES.workspace) as fabric.Rect : null;
            if (workspace) {
                if (typeof workspace.get('fill') === 'string') {
                    setFillColor(workspace.get('fill'));
                    setActiveTab(TAB_TYPES.SOLID)
                } else {
                    setActiveTab(TAB_TYPES.GRADIENT)
                    setFillColor('')
                }
            }
            setTimeout(() => {
                setInitialPropsGets(true)
            }, 1000);
        }
    }, [workspace, canvas])

    const BG_TYPES_LIST = [
        { key: TAB_TYPES.SOLID, icon: <AiOutlineBgColors /> },
        { key: TAB_TYPES.GRADIENT, icon: <VscColorMode /> },
    ]

    const getSegmentOptions = () => {
        return BG_TYPES_LIST.map((option) => {
            return {
                label:
                    <Tooltip title={`${option.key} Background`}>
                        <div style={{ color: activeTab == option.key ? token.colorPrimary : 'inherit' }}
                            className={`${GlobalCss.segmentItem} ${activeTab == option.key ? GlobalCss.active : ''}`}>
                            <div className={GlobalCss.iconWrap} style={{
                                backgroundColor: activeTab == option.key ? token.colorPrimary : token.colorBgBase,
                                color: activeTab == option.key ? token.colorBgBase : token.colorTextBase
                            }}>
                                {option.icon}
                            </div>
                            <div className={GlobalCss.name} style={{ color: activeTab == option.key ? token.colorPrimary : token.colorBgBase }}>{option.key}</div>
                        </div>
                    </Tooltip>,
                value: option.key
            }
        })
    }
    const [activeTab, setActiveTab] = useState(TAB_TYPES.SOLID);

    const onSwitchTab = (tab) => {
        setActiveTab(tab);
    }

    const onClickSolidColor = (color) => {
        if (initialPropsGets) {
            setFillColor(color);
            workspace.set('fill', color);
            updateLocalCanvas(canvas, 'BGColor')
        }
    }



    return (
        <div className={styles.bgColorWrap}>
            <div className={styles.title}>Background as {activeTab == TAB_TYPES.SOLID ? 'Solid Color' : 'Gradient Color'}</div>
            <div className={`${GlobalCss.segmentWrap} ${styles.segmentWrap}`} >
                <Segmented
                    className={GlobalCss.middleSegmentWrap}
                    style={{ background: token.colorBgTextActive }}
                    size="small"
                    block={true}
                    value={activeTab}
                    defaultValue={TAB_TYPES.SOLID}
                    onChange={(tab: any) => onSwitchTab(tab)}
                    options={getSegmentOptions()}
                />
            </div>
            {activeTab == TAB_TYPES.SOLID ? <>
                <div className={`${styles.tabContent} ${styles.solidColorWrap}`}>
                    {Boolean(initialPropsGets && typeof workspace?.get('fill') === 'string') && <div className={styles.colorPickerWrap}>
                        <ColorPickerComponent
                            parentStyles={{ background: 'unset', color: token.colorTextBase }}
                            hidePresets
                            hideTransparency
                            value={{ format: 'hex', color: fillColor }}
                            onChange={(value) => onClickSolidColor(value.color)}
                            label="Background Color" />
                    </div>}
                    <div className={styles.colorsCategoryList}>
                        {SOLID_COLORS_LIST.map((colorDetails, cIndex) => {
                            return <div className={styles.colorDetails} key={cIndex}>
                                <div className={styles.category}>{colorDetails.label}</div>
                                <div className={styles.colorsList}>
                                    {colorDetails.colors.map((color, index) => {
                                        return <div key={index}
                                            style={{ backgroundColor: color }}
                                            className={`${styles.colorWrap} ${fillColor == color ? styles.active : ''}`}
                                            onClick={() => onClickSolidColor(color)}></div>
                                    })}
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </> : <>
                <div className={`${styles.tabContent} ${styles.solidColorWrap}`}>
                    <BGGradient updateLocalCanvas={updateLocalCanvas} workspace={workspace} canvas={canvas} />
                </div>
            </>}
        </div>
    )
}

export default BGColor