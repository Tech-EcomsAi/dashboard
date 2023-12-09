import React, { Fragment, useEffect, useState } from 'react'
import { theme } from 'antd';
import { getDarkModeState, getSidebarState, toggleAppSettingsPanel, toggleDarkMode, toggleSidbar } from '@reduxSlices/clientThemeConfig';
import styles from '@organismsCSS/sidebarComponent/sidebarComponent.module.scss';
import { useAppDispatch } from '@hook/useAppDispatch';
import { TbPhoneCalling } from 'react-icons/tb';
import { MdDarkMode, MdLightMode, MdOutlineNavigateNext, MdOutlineSettingsSuggest } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector } from '@hook/useAppSelector';
import { usePathname, useRouter } from 'next/navigation';
import ClientOnlyProvider from '@providers/clientOnlyProvider';
import { NAVIGARIONS_ROUTINGS, NavItemType, SIDEBAR_NAV_MENUS } from '@constant/navigations';

const SidebarComponent = () => {
    const dispatch = useAppDispatch();
    const { token } = theme.useToken();
    const router = useRouter()
    const isDarkMode = useAppSelector(getDarkModeState);
    const isCollapsed = useAppSelector(getSidebarState)
    const [hoverId, setHoverId] = useState(null);
    const [activeParentNav, setActiveParentNav] = useState<NavItemType>({ label: '', route: '', icon: '', isChild: false })
    const [activeNav, setActiveNav] = useState<NavItemType>({ label: 'Builder', route: 'builder', icon: 'builder', isChild: false });
    const [isHover, setIsHover] = useState(true);
    const [sidebarMenusList, setSidebarMenusList] = useState(SIDEBAR_NAV_MENUS);
    const pathname = usePathname()

    const ACTION_MENUS: NavItemType[] = [
        { label: 'App Appearance', route: 'dashboard-settings', icon: <MdOutlineSettingsSuggest /> },
        { label: 'Dark Mode', route: 'darkMode', icon: <MdDarkMode /> },
        { label: 'Raise Support', route: 'dashboard-help', icon: <TbPhoneCalling /> },
    ]

    useEffect(() => {
        const menuCopy = [...SIDEBAR_NAV_MENUS];
        let currentNav;
        menuCopy.map((nav: NavItemType, index: number) => {
            //first level nav click
            nav.showSubNav = false;
            nav.subNavActive = false;
            nav.active = false;

            //second level sub nav clicked
            if (Boolean(nav?.subNav?.length)) {
                nav.subNav.map((subnav: NavItemType, subIndex: number) => {
                    subnav.active = false
                    if (pathname == `/${subnav.route}`) {
                        nav.showSubNav = true;
                        subnav.active = true;
                        nav.subNavActive = true;
                        currentNav = subnav;
                        setActiveParentNav(nav)
                    }
                })
            }
            if (pathname == `/${nav.route}`) {
                currentNav = nav;
                nav.active = true;
            }
        })

        if (!currentNav) {
            if (`/${NAVIGARIONS_ROUTINGS.WEBSITE_BUILDER_DASHBOARD}` == pathname || `/${NAVIGARIONS_ROUTINGS.WEBSITE_BUILDER_EDITOR}` == pathname) {
                currentNav = { route: NAVIGARIONS_ROUTINGS.WEBSITE_BUILDER_DASHBOARD, label: 'Websites' };
                let websiteNavIndex = menuCopy.findIndex((nav) => nav.route == NAVIGARIONS_ROUTINGS.WEBSITE_BUILDER_DASHBOARD);
                menuCopy[websiteNavIndex].active = true;
            }
        }

        currentNav && setActiveNav(currentNav);
        setSidebarMenusList(menuCopy)
    }, [pathname])


    const onClickNav = (navItem: NavItemType, menuLevel: number, navIndex: number, subNavIndex: number = -1) => {

        if (menuLevel == 1) {
            if (Boolean(navItem?.subNav?.length)) {
                const menuCopy = [...SIDEBAR_NAV_MENUS];
                menuCopy[navIndex].showSubNav = !menuCopy[navIndex].showSubNav;
                setSidebarMenusList(menuCopy)
            } else {
                router.push(`/${navItem.route}`);
            }
        } else {
            router.push(`/${navItem.route}`);
        }
    };

    const onClickActionsMenu = (navItem) => {
        switch (navItem.route) {
            case 'darkMode':
                dispatch(toggleDarkMode(!isDarkMode))
                break;
            case 'collapsed':
                dispatch(toggleSidbar(!isCollapsed))
                break;
            case 'dashboard-settings':
                dispatch(toggleAppSettingsPanel(true))
                break;
            default:

                break;
        }
    }

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
                            <img src="https://firebasestorage.googleapis.com/v0/b/ecomsai.appspot.com/o/ecomsAi%2Flogo%2Flogo.png?alt=media&token=af824138-7ebb-4a72-b873-57298fd0a430" />
                        </div>
                    </div>

                    <div className={styles.menuItemsWrap}>
                        {sidebarMenusList.map((nav: NavItemType, navIndex: number) => {
                            const isActive = nav.active;
                            const NAV_ICON = nav.icon;
                            return <Fragment key={navIndex}>
                                <div className={`${styles.menuItemWrap} ${isActive ? styles.active : ""} ${styles[nav.route]}`}
                                    onMouseEnter={() => setHoverId(nav.route)}
                                    onMouseLeave={() => setHoverId('')}
                                    onClick={() => onClickNav(nav, 1, navIndex)}
                                    style={{
                                        backgroundColor: (isActive) ? token.colorPrimaryBorder : (nav.route == hoverId || nav.subNavActive ? token.colorBgTextHover : token.colorBgBase),
                                        color: (isActive) ? token.colorTextLightSolid : (nav.route == hoverId || nav.subNavActive ? token.colorPrimaryTextActive : token.colorText),
                                        border: token.colorBorder,
                                    }}
                                >
                                    <div className={styles.navWrap}>
                                        <div className={styles.labelIconWrap}>
                                            <div className={styles.iconWrap} style={{
                                                color: (isActive) ? token.colorTextLightSolid : (nav.route == hoverId || nav.subNavActive ? token.colorPrimaryTextActive : token.colorText),
                                            }}>
                                                <NAV_ICON />
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
                                                    color: (isActive) ? token.colorTextLightSolid : (nav.route == hoverId ? token.colorPrimaryTextActive : token.colorText),
                                                }}
                                                transition={{ duration: 0.1 }}
                                                animate={{
                                                    rotate: Boolean(nav.showSubNav) ? 90 : 0,
                                                }}>
                                                <MdOutlineNavigateNext />
                                            </motion.div>}
                                    </div>

                                    {/* sidebar collapsed active mark strip */}
                                    <AnimatePresence>
                                        {((isActive || nav.subNavActive) && isCollapsed && !isHover) && <motion.div
                                            initial={{ height: "100%", opacity: 0 }}
                                            animate={{ height: '100%', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className={styles.activeMark} style={{ background: token.colorPrimary }}></motion.div>}
                                    </AnimatePresence>
                                </div>
                                <AnimatePresence>
                                    {Boolean(nav.showSubNav && (!isCollapsed || isHover)) && <>
                                        <motion.div
                                            style={{ width: "100%" }}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'max-content', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                        >
                                            {nav.subNav?.map((subNav: NavItemType, subnavIndex: number) => {
                                                const SUB_NAV_ICON = subNav.icon;
                                                return <Fragment key={subnavIndex}>
                                                    <div className={`${styles.menuItemWrap} ${styles.subMenuItemWrap} ${subNav.active ? styles.active : ""}`}
                                                        onMouseEnter={() => setHoverId(subNav.route)}
                                                        onMouseLeave={() => setHoverId('')}
                                                        onClick={() => onClickNav(subNav, 2, navIndex, subnavIndex)}
                                                        style={{
                                                            background: `${(subNav.active) ? token.colorPrimaryBorder : (subNav.route == hoverId ? token.colorBgTextHover : token.colorBgBase)}`,
                                                            color: (subNav.active) ? token.colorTextLightSolid : (subNav.route == hoverId ? token.colorPrimaryTextActive : token.colorText),
                                                            border: token.colorBorder
                                                        }}
                                                    >
                                                        <div className={styles.navWrap}>
                                                            <div className={styles.labelIconWrap}>
                                                                <div className={styles.iconWrap} style={{
                                                                    color: (subNav.active) ? token.colorTextLightSolid : (subNav.route == hoverId ? token.colorPrimaryTextActive : token.colorText),
                                                                }}>
                                                                    <SUB_NAV_ICON />
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
                            const isActive = nav.route == activeNav.route;
                            return <Fragment key={i}>
                                <div className={`${styles.menuItemWrap}`}
                                    onMouseEnter={() => setHoverId(nav.route)}
                                    onMouseLeave={() => setHoverId('')}
                                    onClick={() => onClickActionsMenu(nav)}
                                    style={{
                                        backgroundColor: `${(isActive) ? token.colorPrimaryBgHover : ((nav.route == hoverId || nav.route == activeParentNav.route) ? token.colorBgTextHover : token.colorBgBase)}`,
                                        color: (isActive) ? token.colorTextLightSolid : ((nav.route == hoverId || nav.route == activeParentNav.route) ? token.colorPrimaryTextActive : token.colorText),
                                        border: token.colorBorder,
                                    }}
                                >
                                    <div className={styles.navWrap}>
                                        <div className={styles.labelIconWrap}>
                                            <>
                                                {nav.route == "collapsed" ? <motion.div
                                                    className={`${styles.iconWrap}`}
                                                    style={{ color: (nav.route == hoverId || isCollapsed) ? token.colorPrimaryTextActive : token.colorText }}
                                                    transition={{ duration: 0.07 }}
                                                    animate={{ rotate: !Boolean(isCollapsed) ? 180 : 0, }}>
                                                    {nav.icon}
                                                </motion.div> : <>
                                                    {nav.route == "darkMode" ? <motion.div
                                                        className={`${styles.iconWrap}`}
                                                        style={{ color: (nav.route == hoverId || isDarkMode) ? token.colorPrimaryTextActive : token.colorText }}
                                                        transition={{ duration: 0.07 }}
                                                        animate={{ rotate: !Boolean(isDarkMode) ? 360 : 0, }}>
                                                        {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
                                                    </motion.div> :
                                                        <div className={styles.iconWrap} style={{ color: (isActive) ? token.colorTextLightSolid : (nav.route == hoverId ? token.colorPrimaryTextActive : token.colorText), }}>{nav.icon}</div>}
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

