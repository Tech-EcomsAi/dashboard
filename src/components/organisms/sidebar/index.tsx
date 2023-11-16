'use client'
import React, { Fragment, useState } from 'react'
import { theme } from 'antd';
import { getDarkModeState, getSidebarState, toggleDarkMode, toggleSidbar } from '@reduxSlices/clientThemeConfig';
import styles from '@organismsCSS/sidebarComponent/sidebarComponent.module.scss';
import { useAppDispatch } from '@hook/useAppDispatch';
import { LuLayoutDashboard, LuLineChart, LuSettings, LuShoppingCart } from 'react-icons/lu';
import { RxDashboard } from 'react-icons/rx';
import { IoAnalyticsSharp } from 'react-icons/io5';
import { TbChartHistogram, TbChartPie, TbDeviceMobileShare, TbHelpCircle, TbNotes, TbPhoneCalling, TbUsers } from 'react-icons/tb';
import { BsPeople } from 'react-icons/bs';
import { MdDarkMode, MdLightMode, MdOutlineCampaign, MdOutlineNavigateNext, MdOutlineSettingsSuggest } from 'react-icons/md';
import { RiAccountPinCircleLine, RiArrowRightDoubleLine, RiArticleLine } from 'react-icons/ri';
import { BiConversation } from 'react-icons/bi';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector } from '@hook/useAppSelector';
import { useRouter } from 'next/navigation';
import AppSettingsPanel from './appSettingsPanel';
import ClientOnlyProvider from '@providers/clientOnlyProvider';

type NavItem = { label: string, key: string, icon: any, isChild?: boolean, subNav?: any, showSubNav?: boolean };

const SidebarComponent = () => {
    const dispatch = useAppDispatch();
    const { token } = theme.useToken();
    const router = useRouter()
    const isDarkMode = useAppSelector(getDarkModeState);
    const isCollapsed = useAppSelector(getSidebarState)
    const [hoverId, setHoverId] = useState(null);
    const [activeParentNav, setActiveParentNav] = useState<NavItem>({ label: '', key: '', icon: '', isChild: false })
    const [activeNav, setActiveNav] = useState<NavItem>({ label: 'Builder', key: 'builder', icon: 'builder', isChild: false });
    const [isHover, setIsHover] = useState(true);
    const [showAppSettingsPanel, setShowAppSettingsPanel] = useState(false)
    const collapseNavItem = { label: 'Collapsed', key: 'collapsed', icon: <RiArrowRightDoubleLine /> };
    const settingsNavItem = { label: 'Settings', key: 'dashboard-settings', icon: <MdOutlineSettingsSuggest /> };
    const darkModeNavItem = { label: 'darkMode', key: 'darkMode', icon: <MdDarkMode /> };
    const helpNavItem = { label: 'help', key: 'dashboard-help', icon: <TbPhoneCalling /> };

    // useEffect(() => {
    //     if (isWindowAvailable()) {
    //         dispatch(toggleDarkMode(initialThemeHandler()));
    //         // setActiveNav(pathName.split('/')[0]);
    //     }
    // }, [windowRef])

    const navMenu: NavItem[] = [
        {
            label: 'Dashboard', key: 'dashboard', icon: <RxDashboard />,
            subNav: [
                { label: 'Summary', key: 'summary', icon: <TbChartPie /> },
                { label: 'Sales', key: 'sales', icon: <LuLineChart /> },
                { label: 'CRM', key: 'CRM', icon: <TbUsers /> },
                { label: 'Analytics', key: 'analytics', icon: <IoAnalyticsSharp /> },
            ]
        },
        { label: 'Profile', key: 'profile', icon: <RiAccountPinCircleLine /> },
        { label: 'Reports', key: 'reports', icon: <TbChartHistogram /> },
        { label: 'Builder', key: 'builder', icon: <LuLayoutDashboard /> },
        { label: 'CRM', key: 'CRM', icon: <BsPeople /> },
        { label: 'Ecommerce', key: 'ecommerce', icon: <LuShoppingCart /> },
        { label: 'Settings', key: 'settings', icon: <LuSettings /> },
        { label: 'PWA', key: 'PWA', icon: <TbDeviceMobileShare /> },
        { label: 'Chat', key: 'chat', icon: <BiConversation /> },
        { label: 'Note', key: 'note', icon: <TbNotes /> },
        { label: 'Blogs', key: 'query', icon: <RiArticleLine /> },
        { label: 'Promotion', key: 'promotion', icon: <MdOutlineCampaign /> },
        { label: 'Help', key: 'help', icon: <TbHelpCircle /> },
    ]

    const onClickNav = (navItem: NavItem) => {
        switch (navItem.key) {
            case 'darkMode':
                dispatch(toggleDarkMode(!isDarkMode))
                break;
            case 'collapsed':
                dispatch(toggleSidbar(!isCollapsed))
                break;
            case 'dashboard-settings':
                setActiveNav(navItem);
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
                    animate={{ width: (!isCollapsed || isHover) ? '200px' : "66px" }}
                    style={{ backgroundColor: token.colorBgBase, color: token.colorTextBase, }}>
                    <div className={styles.logoWrap}>
                        <div className={styles.logo}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/ecomsai.appspot.com/o/ecomsAi%2Flogo%2Flogo.png?alt=media&token=af824138-7ebb-4a72-b873-57298fd0a430" />
                            {/* {isCollapsed ?
                            <img src="https://firebasestorage.googleapis.com/v0/b/ecomsai.appspot.com/o/ecomsAi%2Flogo%2Flogo_small.png?alt=media&token=d590b12e-ca38-40b0-9ef7-34c6374b8a72" />
                            :
                            <img src="https://firebasestorage.googleapis.com/v0/b/ecomsai.appspot.com/o/ecomsAi%2Flogo%2Flogo.png?alt=media&token=af824138-7ebb-4a72-b873-57298fd0a430" />
                        } */}
                        </div>
                    </div>
                    <div className={styles.menuItemsWrap}>
                        {navMenu.map((nav: NavItem, i: number) => {
                            return <Fragment key={i}>
                                <div className={`${styles.menuItemWrap} ${nav.key == activeNav.key ? styles.active : ""} ${styles[nav.key]}`}
                                    onMouseEnter={() => setHoverId(nav.key)}
                                    onMouseLeave={() => setHoverId('')}
                                    onClick={() => onClickNav(nav)}
                                    style={{
                                        background: `${(nav.key == activeNav.key) ? token.colorPrimary : ((nav.key == hoverId || nav.key == activeParentNav.key) ? token.colorBgTextHover : token.colorBgBase)}`,
                                        color: (nav.key == activeNav.key) ? token.colorTextLightSolid : ((nav.key == hoverId || nav.key == activeParentNav.key) ? token.colorPrimaryTextActive : token.colorText),
                                        border: token.colorBorder,
                                    }}
                                >
                                    <div className={styles.navWrap}>
                                        <div className={styles.labelIconWrap}>
                                            <div className={styles.iconWrap} style={{
                                                // backgroundImage: `radial-gradient( 100% 100% at 0 0, rgb(10 174 145 / 16%) 0, rgb(147 147 217 / 21%) 50%, #09aa8d26 100%)`,
                                                color: (nav.key == activeNav.key) ? token.colorTextLightSolid : (nav.key == hoverId ? token.colorPrimaryTextActive : token.colorText),
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
                                                    color: (nav.key == activeNav.key) ? token.colorTextLightSolid : (nav.key == hoverId ? token.colorPrimaryTextActive : token.colorText),
                                                }}
                                                transition={{ duration: 0.1 }}
                                                animate={{
                                                    rotate: Boolean(activeParentNav.key == nav.key && activeParentNav.subNav && activeParentNav.showSubNav) ? 90 : 0,
                                                }}>
                                                <MdOutlineNavigateNext />
                                            </motion.div>}
                                    </div>
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

                        <div className={`${styles.menuItemWrap} ${styles.actionNavItem}`}
                            style={{
                                flexDirection: (!isCollapsed || isHover) ? "row" : "column",
                                background: token.colorBgBase,
                                color: collapseNavItem.key == hoverId ? token.colorPrimaryTextActive : token.colorText,
                                border: `unset`,
                            }}>

                            {/* settings nav item */}
                            <div className={`${styles.menuItemWrap}`}
                                onMouseEnter={() => setHoverId(settingsNavItem.key)}
                                onMouseLeave={() => setHoverId('')}
                                onClick={() => setShowAppSettingsPanel(true)}
                                style={{
                                    background: token.colorBgBase,
                                    color: (settingsNavItem.key == hoverId || showAppSettingsPanel) ? token.colorPrimaryTextActive : token.colorText,
                                    border: `1px solid ${token.colorBorder}`,
                                }}
                            >
                                <div className={styles.navWrap}>
                                    <div className={styles.labelIconWrap}>
                                        <motion.div
                                            className={`${styles.iconWrap}`}
                                            style={{ color: (settingsNavItem.key == hoverId || activeNav.key == settingsNavItem.key) ? token.colorPrimaryTextActive : token.colorText }}
                                        >
                                            {settingsNavItem.icon}
                                        </motion.div>
                                        {/* {(isHover || isCollapsed) && <motion.div className={styles.label}>
                                        {settingsNavItem.label}
                                    </motion.div>} */}
                                    </div>
                                </div>
                            </div>

                            {/* help nav item */}
                            <div className={`${styles.menuItemWrap}`}
                                onMouseEnter={() => setHoverId(helpNavItem.key)}
                                onMouseLeave={() => setHoverId('')}
                                onClick={() => onClickNav(helpNavItem)}
                                style={{
                                    background: token.colorBgBase,
                                    color: (helpNavItem.key == hoverId || helpNavItem.key == activeNav.key) ? token.colorPrimaryTextActive : token.colorText,
                                    border: `1px solid ${token.colorBorder}`,
                                }}
                            >
                                <div className={styles.navWrap}>
                                    <div className={styles.labelIconWrap}>
                                        <motion.div
                                            className={`${styles.iconWrap}`}
                                            style={{ color: (helpNavItem.key == hoverId || helpNavItem.key == activeNav.key) ? token.colorPrimaryTextActive : token.colorText }}
                                        >
                                            {helpNavItem.icon}
                                        </motion.div>
                                        {/* {(isHover || isCollapsed) && <motion.div className={styles.label}>
                                        {isDarkMode ? "Light Mode" : "Dark Mode"}
                                    </motion.div>} */}
                                    </div>
                                </div>
                            </div>

                            {/* Dark mode nav item */}
                            <div className={`${styles.menuItemWrap}`}
                                onMouseEnter={() => setHoverId(darkModeNavItem.key)}
                                onMouseLeave={() => setHoverId('')}
                                onClick={() => onClickNav(darkModeNavItem)}
                                style={{
                                    background: token.colorBgBase,
                                    color: (darkModeNavItem.key == hoverId || isDarkMode) ? token.colorPrimaryTextActive : token.colorText,
                                    border: `1px solid ${token.colorBorder}`,
                                }}
                            >
                                <div className={styles.navWrap}>
                                    <div className={styles.labelIconWrap}>
                                        <motion.div
                                            className={`${styles.iconWrap}`}
                                            style={{ color: token.colorPrimaryTextActive }}
                                        >
                                            {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            {/* collapsed nav item */}
                            <div className={`${styles.menuItemWrap}`}
                                onMouseEnter={() => setHoverId(collapseNavItem.key)}
                                onMouseLeave={() => setHoverId('')}
                                onClick={() => onClickNav(collapseNavItem)}
                                style={{
                                    background: token.colorBgBase,
                                    color: collapseNavItem.key == hoverId ? token.colorPrimaryTextActive : token.colorText,
                                    border: `1px solid ${token.colorBorder}`,
                                }}
                            >
                                <div className={styles.navWrap}>
                                    <div className={styles.labelIconWrap}>
                                        <motion.div
                                            className={`${styles.iconWrap}`}
                                            style={{ color: (collapseNavItem.key == hoverId) ? token.colorPrimaryTextActive : token.colorText }}
                                            transition={{ duration: 0.07 }}
                                            animate={{ rotate: !Boolean(isCollapsed) ? 180 : 0, }}>
                                            {collapseNavItem.icon}
                                        </motion.div>
                                        {/* {(isCollapsed || isHover) && <motion.div className={styles.label}>
                                        {collapseNavItem.label}
                                    </motion.div>} */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
                <AppSettingsPanel
                    open={showAppSettingsPanel}
                    togglePannel={() => setShowAppSettingsPanel(!showAppSettingsPanel)}
                />
            </>
        </ClientOnlyProvider>
    )
}

export default SidebarComponent
