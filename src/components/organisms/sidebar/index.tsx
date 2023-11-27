import React, { Fragment, useState } from 'react'
import { theme } from 'antd';
import { getAppSettingsPanelStatus, getDarkModeState, getSidebarState, toggleAppSettingsPanel, toggleDarkMode, toggleSidbar } from '@reduxSlices/clientThemeConfig';
import styles from '@organismsCSS/sidebarComponent/sidebarComponent.module.scss';
import { useAppDispatch } from '@hook/useAppDispatch';
import { LuCalendarCheck, LuLayoutDashboard, LuLineChart, LuMail, LuMessageSquare, LuSettings, LuShoppingCart } from 'react-icons/lu';
import { RxDashboard } from 'react-icons/rx';
import { IoAnalyticsSharp } from 'react-icons/io5';
import { TbChartHistogram, TbChartPie, TbDeviceMobileShare, TbHelpCircle, TbNotes, TbPhoneCalling, TbUsers } from 'react-icons/tb';
import { BsPeople } from 'react-icons/bs';
import { MdDarkMode, MdLightMode, MdOutlineCampaign, MdOutlineNavigateNext, MdOutlineSettingsSuggest } from 'react-icons/md';
import { RiAccountPinCircleLine, RiAppsLine, RiArrowRightDoubleLine, RiArticleLine } from 'react-icons/ri';
import { BiConversation } from 'react-icons/bi';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector } from '@hook/useAppSelector';
import { useRouter } from 'next/navigation';
import ClientOnlyProvider from '@providers/clientOnlyProvider';

type NavItemType = { label: string, key: string, icon: any, isChild?: boolean, subNav?: any, showSubNav?: boolean };

export const DASHBOARD_MENU: NavItemType[] = [
    {
        label: 'Dashboard', key: 'dashboard', icon: <RxDashboard />,
        subNav: [
            { label: 'Summary', key: 'summary', icon: <TbChartPie /> },
            { label: 'Sales', key: 'sales', icon: <LuLineChart /> },
            { label: 'CRM', key: 'CRM', icon: <TbUsers /> },
            { label: 'Analytics', key: 'analytics', icon: <IoAnalyticsSharp /> },
        ]
    },
]

export const APPS_MENU: NavItemType[] = [
    {
        label: 'Apps', key: 'apps', icon: <RiAppsLine />,
        subNav: [
            { label: 'Chat', key: 'chat', icon: <LuMessageSquare /> },
            { label: 'Blog', key: 'query', icon: <RiArticleLine /> },
            { label: 'Email', key: 'email', icon: <LuMail /> },
            { label: 'Calendar', key: 'calendar', icon: <LuCalendarCheck /> },
        ]
    },
]

export const SIDEBAR_NAV_MENUS: NavItemType[] = [
    ...DASHBOARD_MENU,
    { label: 'Builder', key: 'builder', icon: <LuLayoutDashboard /> },
    ...APPS_MENU,
    { label: 'Profile', key: 'profile', icon: <RiAccountPinCircleLine /> },
    { label: 'Reports', key: 'reports', icon: <TbChartHistogram /> },
    { label: 'CRM', key: 'CRM', icon: <BsPeople /> },
    { label: 'Ecommerce', key: 'ecommerce', icon: <LuShoppingCart /> },
    { label: 'Settings', key: 'settings', icon: <LuSettings /> },
    { label: 'PWA', key: 'PWA', icon: <TbDeviceMobileShare /> },
    { label: 'Chat', key: 'chat', icon: <BiConversation /> },
    { label: 'Promotion', key: 'promotion', icon: <MdOutlineCampaign /> },
    { label: 'Catalogue', key: 'catalogue', icon: <TbHelpCircle /> },
    { label: 'User Guide', key: 'help', icon: <TbHelpCircle /> },
]

const SidebarComponent = () => {
    const dispatch = useAppDispatch();
    const { token } = theme.useToken();
    const router = useRouter()
    const isDarkMode = useAppSelector(getDarkModeState);
    const isCollapsed = useAppSelector(getSidebarState)
    const [hoverId, setHoverId] = useState(null);
    const [activeParentNav, setActiveParentNav] = useState<NavItemType>({ label: '', key: '', icon: '', isChild: false })
    const [activeNav, setActiveNav] = useState<NavItemType>({ label: 'Builder', key: 'builder', icon: 'builder', isChild: false });
    const [isHover, setIsHover] = useState(true);

    const ACTION_MENUS: NavItemType[] = [
        { label: 'App Appearance', key: 'dashboard-settings', icon: <MdOutlineSettingsSuggest /> },
        { label: 'Dark Mode', key: 'darkMode', icon: <MdDarkMode /> },
        { label: 'Support', key: 'dashboard-help', icon: <TbPhoneCalling /> },
    ]

    const onClickNav = (navItem: NavItemType) => {
        switch (navItem.key) {
            case 'darkMode':
                dispatch(toggleDarkMode(!isDarkMode))
                break;
            case 'collapsed':
                dispatch(toggleSidbar(!isCollapsed))
                break;
            case 'dashboard-settings':
                dispatch(toggleAppSettingsPanel(true))
                break;
            case 'reports':
                router.push('/reports')
                break;
            case 'builder':
                router.push('/builder')
                break;
            default:
                if (navItem.subNav) {
                    if (activeParentNav.key == navItem.key && activeParentNav.showSubNav) setActiveParentNav({ ...navItem, showSubNav: false })
                    else setActiveParentNav({ ...navItem, showSubNav: true });
                } else {
                    if (!navItem.isChild) setActiveParentNav({ label: '', key: '', icon: '', isChild: false })
                    setActiveNav(navItem);
                }
                break;
        }
    };

    return (
        <ClientOnlyProvider>
            <>
                <motion.div
                    className={styles.sidebarContainer}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    animate={{ width: (!isCollapsed || isHover) ? '200px' : "62px" }}
                    style={{ backgroundColor: token.colorBgBase, color: token.colorTextBase, borderRight: `1px solid ${token.colorBorder}` }}>
                    <div className={styles.logoWrap} style={{ borderBottom: `1px solid ${token.colorBorder}`, padding: (!isCollapsed || isHover) ? "10px" : "2px" }}>
                        <div className={styles.logo}>
                            {/* <img src="https://firebasestorage.googleapis.com/v0/b/ecomsai.appspot.com/o/ecomsAi%2Flogo%2Flogo_small.png?alt=media&token=d590b12e-ca38-40b0-9ef7-34c6374b8a72" /> */}
                            <img src="https://firebasestorage.googleapis.com/v0/b/ecomsai.appspot.com/o/ecomsAi%2Flogo%2Flogo.png?alt=media&token=af824138-7ebb-4a72-b873-57298fd0a430" />
                            {/* {isCollapsed ?
                            <img src="https://firebasestorage.googleapis.com/v0/b/ecomsai.appspot.com/o/ecomsAi%2Flogo%2Flogo_small.png?alt=media&token=d590b12e-ca38-40b0-9ef7-34c6374b8a72" />
                            :
                            <img src="https://firebasestorage.googleapis.com/v0/b/ecomsai.appspot.com/o/ecomsAi%2Flogo%2Flogo.png?alt=media&token=af824138-7ebb-4a72-b873-57298fd0a430" />
                        } */}
                        </div>
                    </div>
                    <div className={styles.menuItemsWrap}>
                        {SIDEBAR_NAV_MENUS.map((nav: NavItemType, i: number) => {
                            const isActive = nav.key == activeNav.key;
                            return <Fragment key={i}>
                                <div className={`${styles.menuItemWrap} ${isActive ? styles.active : ""} ${styles[nav.key]}`}
                                    onMouseEnter={() => setHoverId(nav.key)}
                                    onMouseLeave={() => setHoverId('')}
                                    onClick={() => onClickNav(nav)}
                                    style={{
                                        backgroundColor: `${(isActive) ? token.colorPrimaryBgHover : ((nav.key == hoverId || nav.key == activeParentNav.key) ? token.colorBgTextHover : token.colorBgBase)}`,
                                        color: (isActive) ? token.colorTextLightSolid : ((nav.key == hoverId || nav.key == activeParentNav.key) ? token.colorPrimaryTextActive : token.colorText),
                                        border: token.colorBorder,
                                        // backgroundImage: `radial-gradient( 100% 100% at 0 0, rgb(10 174 145 / 16%) 0, rgb(147 147 217 / 21%) 50%, #09aa8d26 100%)`,
                                    }}
                                >
                                    <div className={styles.navWrap}>
                                        <div className={styles.labelIconWrap}>
                                            <div className={styles.iconWrap} style={{
                                                color: (isActive) ? token.colorTextLightSolid : (nav.key == hoverId ? token.colorPrimaryTextActive : token.colorText),
                                            }}>
                                                {nav.icon}
                                            </div>
                                            {(!isCollapsed || isHover) && <motion.div
                                                initial={{ width: "max-content", opacity: 0 }}
                                                animate={{ width: 'max-content', opacity: 1 }}
                                                exit={{ width: "0", opacity: 0 }}
                                                className={styles.label}
                                            >
                                                {nav.label}
                                            </motion.div>}
                                        </div>
                                        {nav.subNav &&
                                            <motion.div
                                                className={`${styles.subNavIcon} ${styles.iconWrap}`}
                                                style={{
                                                    color: (isActive) ? token.colorTextLightSolid : (nav.key == hoverId ? token.colorPrimaryTextActive : token.colorText),
                                                }}
                                                transition={{ duration: 0.1 }}
                                                animate={{
                                                    rotate: Boolean(activeParentNav.key == nav.key && activeParentNav.subNav && activeParentNav.showSubNav) ? 90 : 0,
                                                }}>
                                                <MdOutlineNavigateNext />
                                            </motion.div>}
                                    </div>
                                    <AnimatePresence>
                                        {(isActive && isCollapsed && !isHover) && <motion.div
                                            initial={{ height: "100%", opacity: 0 }}
                                            animate={{ height: '100%', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className={styles.activeMark} style={{ background: token.colorPrimary }}></motion.div>}
                                    </AnimatePresence>
                                </div>
                                <AnimatePresence>
                                    {Boolean(activeParentNav.key == nav.key && activeParentNav.subNav && activeParentNav.showSubNav && (!isCollapsed || isHover)) && <>
                                        <motion.div
                                            style={{ width: "100%" }}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'max-content', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                        >
                                            {nav.subNav?.map((subNav: any, i: number) => {
                                                return <Fragment key={i}>
                                                    <div className={`${styles.menuItemWrap} ${styles.subMenuItemWrap} ${subNav.key == activeNav.key ? styles.active : ""}`}
                                                        onMouseEnter={() => setHoverId(subNav.key)}
                                                        onMouseLeave={() => setHoverId('')}
                                                        onClick={() => onClickNav(subNav)}
                                                        style={{
                                                            background: `${(subNav.key == activeNav.key) ? token.colorPrimaryBgHover : (subNav.key == hoverId ? token.colorBgTextHover : token.colorBgBase)}`,
                                                            color: (subNav.key == activeNav.key) ? token.colorTextLightSolid : (subNav.key == hoverId ? token.colorPrimaryTextActive : token.colorText),
                                                            border: token.colorBorder
                                                        }}
                                                    >
                                                        <div className={styles.navWrap}>
                                                            <div className={styles.labelIconWrap}>
                                                                <div className={styles.iconWrap} style={{
                                                                    color: (subNav.key == activeNav.key) ? token.colorTextLightSolid : (subNav.key == hoverId ? token.colorPrimaryTextActive : token.colorText),
                                                                }}>
                                                                    {subNav.icon}
                                                                </div>
                                                                <div className={styles.label}>
                                                                    {subNav.label}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            })}
                                        </motion.div>
                                    </>}
                                </AnimatePresence>
                            </Fragment>
                        })}
                    </div>
                    <div className={`${styles.menuItemsWrap} ${styles.actionNavItem} `} style={{ background: token.colorBgBase, borderTop: `1px solid ${token.colorBorder}` }}>
                        {ACTION_MENUS.map((nav: NavItemType, i: number) => {
                            const isActive = nav.key == activeNav.key;
                            return <Fragment key={i}>
                                <div className={`${styles.menuItemWrap}`}
                                    onMouseEnter={() => setHoverId(nav.key)}
                                    onMouseLeave={() => setHoverId('')}
                                    onClick={() => onClickNav(nav)}
                                    style={{
                                        backgroundColor: `${(isActive) ? token.colorPrimaryBgHover : ((nav.key == hoverId || nav.key == activeParentNav.key) ? token.colorBgTextHover : token.colorBgBase)}`,
                                        color: (isActive) ? token.colorTextLightSolid : ((nav.key == hoverId || nav.key == activeParentNav.key) ? token.colorPrimaryTextActive : token.colorText),
                                        border: token.colorBorder,
                                    }}
                                >
                                    <div className={styles.navWrap}>
                                        <div className={styles.labelIconWrap}>
                                            <>
                                                {nav.key == "collapsed" ? <motion.div
                                                    className={`${styles.iconWrap}`}
                                                    style={{ color: (nav.key == hoverId || isCollapsed) ? token.colorPrimaryTextActive : token.colorText }}
                                                    transition={{ duration: 0.07 }}
                                                    animate={{ rotate: !Boolean(isCollapsed) ? 180 : 0, }}>
                                                    {nav.icon}
                                                </motion.div> : <>
                                                    {nav.key == "darkMode" ? <motion.div
                                                        className={`${styles.iconWrap}`}
                                                        style={{ color: (nav.key == hoverId || isDarkMode) ? token.colorPrimaryTextActive : token.colorText }}
                                                        transition={{ duration: 0.07 }}
                                                        animate={{ rotate: !Boolean(isDarkMode) ? 360 : 0, }}>
                                                        {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
                                                    </motion.div> :
                                                        <div className={styles.iconWrap} style={{ color: (isActive) ? token.colorTextLightSolid : (nav.key == hoverId ? token.colorPrimaryTextActive : token.colorText), }}>{nav.icon}</div>}
                                                </>}

                                            </>

                                            {(!isCollapsed || isHover) && <motion.div
                                                initial={{ width: "max-content", opacity: 0 }}
                                                animate={{ width: 'max-content', opacity: 1 }}
                                                exit={{ width: "0", opacity: 0 }}
                                                className={styles.label}
                                            >
                                                {nav.label}
                                            </motion.div>}
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        })}
                    </div>
                </motion.div>
            </>
        </ClientOnlyProvider>
    )
}

export default SidebarComponent

