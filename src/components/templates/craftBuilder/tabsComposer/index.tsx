import React from 'react'
import styles from './tabsComposer.module.scss'
import { Drawer, theme, Typography } from 'antd';
import { AiOutlineClose } from 'react-icons/ai'
import { EDITOR_TABS } from '@constant/craftBuilder';
import Templates from './templates';
import Background from './background';
import Images from './images';
import Text from './text';
import Graphics from './graphics';
import Shapes from './shapes';
import Watermark from './watermark';
import Characters from './characters';
import QrCode from './qrCode';
import { BiArrowBack } from 'react-icons/bi';
import MyStuff from './myStuff';
import Documents from './documents';
import BrandKit from './brandKit';

const TABS_COMPONENT = {
    [EDITOR_TABS.TEMPLATES]: Templates,
    [EDITOR_TABS.BACKGROUND]: Background,
    [EDITOR_TABS.IMAGES]: Images,
    [EDITOR_TABS.TEXT]: Text,
    [EDITOR_TABS.GRAPHICS]: Graphics,
    [EDITOR_TABS.PARSONAS]: Characters,
    [EDITOR_TABS.SHAPES]: Shapes,
    [EDITOR_TABS.WATERMARK]: Watermark,
    [EDITOR_TABS.QRCODE]: QrCode,
    [EDITOR_TABS.MYSTUFF]: MyStuff,
    [EDITOR_TABS.BRANDKIT]: BrandKit,
    [EDITOR_TABS.DOCUMENTS]: Documents,
};

function TabsComposer({ activeObjectsState, canvas, updateLocalCanvas, activeTab, setActiveEditorTab, workspace }) {
    const { token } = theme.useToken();
    return (
        <div className={styles.tabsComposerWrap}>
            <div className={styles.headingWrap} style={{ background: token.colorBgLayout }}>
                <div className={`${styles.iconWrap}`} style={{ background: token.colorBgBase, color: token.colorText }} onClick={() => setActiveEditorTab('')}>
                    <BiArrowBack color={token.colorText} />
                </div>
                <div className={styles.title} style={{ color: token.colorTextBase }}>{activeTab}</div>
            </div>
            <div className={styles.tabComponentWrap} style={{ background: token.colorBgBase }}>
                {/* //React.createElement(`tab component`, `tab component props`) */}
                {React.createElement(TABS_COMPONENT[activeTab], { canvas, updateLocalCanvas, activeObjectsState, workspace })}
            </div>
        </div>
    )
}

export default TabsComposer