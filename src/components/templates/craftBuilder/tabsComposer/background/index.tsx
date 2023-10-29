import { Checkbox, Segmented, theme, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import styles from './background.module.scss'
import GlobalCss from '@craftBuilder/craftBuilder.module.scss'
import { TbGridDots } from 'react-icons/tb';
import { AiOutlineBgColors, AiFillPicture } from 'react-icons/ai';
import BGColor from './bgColor';
import BGPattern from './bgPattern';
import BGImage from './bgImage';
import { fabric } from "fabric";
import { CUSTOME_ATTRIBUTES, DEFAULT_NO_BG_OPACITY, OBJECT_TYPES } from '@constant/craftBuilder';
import { getCustomObjectType } from '@util/craftBuilderUtils';

const TAB_TYPES = {
    COLOR: 'Color',
    PATTERN: 'Pattern',
    IMAGE: 'Image',
}

function Background({ canvas, updateLocalCanvas, workspace, activeObjectsState }) {
    const { token } = theme.useToken();

    const [bgProps, setBgProps] = useState({
        active: true,
        previousFill: {
            stroke: 'rgba(255,255,255,1)',
            fill: 'rgba(255,255,255,1)',
            strokeWidth: 0,
            opacity: 1,
        }
    })

    useEffect(() => {
        const currentFill = workspace.get('fill');
        if (currentFill) {

            if (typeof currentFill === 'string' || currentFill instanceof fabric.Gradient) {
                setActiveTab(TAB_TYPES.COLOR);
            } else if (currentFill instanceof fabric.Pattern) {
                const patternData = workspace.get('patternData');
                if (patternData.objectType == `${OBJECT_TYPES.workspace}-${OBJECT_TYPES.pattern}`) {
                    setActiveTab(TAB_TYPES.PATTERN)
                } else {
                    setActiveTab(TAB_TYPES.IMAGE)
                }
            }
        }
    }, [canvas])


    const BG_TYPES_LIST = [
        { key: TAB_TYPES.COLOR, icon: <AiOutlineBgColors />, children: <BGColor updateLocalCanvas={updateLocalCanvas} workspace={workspace} canvas={canvas} /> },
        { key: TAB_TYPES.PATTERN, icon: <TbGridDots />, children: <BGPattern updateLocalCanvas={updateLocalCanvas} workspace={workspace} canvas={canvas} /> },
        {
            key: TAB_TYPES.IMAGE, icon: <AiFillPicture />, children: <BGImage activeObjectsState={{
                eventMode: '',
                isGroup: false,
                isMultiple: false,
                selectedObject: [workspace],
                isSelected: true
            }} updateLocalCanvas={updateLocalCanvas} activeObject={workspace} canvas={canvas} />
        },
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
    const [activeTab, setActiveTab] = useState(TAB_TYPES.COLOR);

    const toggleBg = (status) => {
        const bgPropsCopy = { ...bgProps, active: status };
        if (status) {
            workspace.set({ ...bgProps.previousFill, opacity: 1 });
        } else {
            bgPropsCopy.previousFill = {
                stroke: workspace.get('stroke'),
                strokeWidth: workspace.get('strokeWidth'),
                opacity: workspace.get('opacity'),
                fill: workspace.get('fill')
            };
            workspace.set({
                stroke: token.colorPrimary,
                strokeWidth: 2,
                opacity: DEFAULT_NO_BG_OPACITY,
                fill: 'rgb(0 0 0 / 0%)',
            })
        }
        setBgProps(bgPropsCopy)
        updateLocalCanvas(canvas, 'Background')
    }

    const onSwitchTab = (tab) => {
        setActiveTab(tab);
    }

    return (
        <div className={styles.backgroundWrap}>
            <div className={styles.toggleWrap}>
                <Checkbox
                    className={styles.checkboxElement}
                    defaultChecked={bgProps.active}
                    style={{ color: token.colorTextBase }}
                    checked={bgProps.active}
                    onChange={() => toggleBg(!bgProps.active)}>
                    Show background
                </Checkbox>
            </div>
            {/* <Saperator /> */}
            <div className={`${GlobalCss.segmentWrap} ${styles.segmentWrap} ${!bgProps.active ? 'disabled' : ''}`} >
                <Segmented
                    className={GlobalCss.largeSegmentWrap}
                    style={{ background: token.colorBgTextActive }}
                    size="middle"
                    block={true}
                    value={activeTab}
                    defaultValue={TAB_TYPES.COLOR}
                    onChange={(tab: any) => onSwitchTab(tab)}
                    options={getSegmentOptions()}
                />
            </div>
            <div className={`${styles.typesList} ${!bgProps.active ? 'disabled' : ''}`}>
                {BG_TYPES_LIST.find((t) => t.key == activeTab).children}
            </div>
        </div>
    )
}

export default Background