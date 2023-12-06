import React, { Fragment, useEffect, useState } from 'react'
import { theme } from 'antd';
import { getDarkModeState, getSidebarState, toggleAppSettingsPanel, toggleDarkMode, toggleSidbar } from '@reduxSlices/clientThemeConfig';
import styles from '@organismsCSS/sidebarComponent/sidebarComponent.module.scss';
import { useAppDispatch } from '@hook/useAppDispatch';
import { LuCalendarCheck, LuLayoutDashboard, LuLineChart, LuMail, LuMessageSquare, LuSettings, LuShoppingCart } from 'react-icons/lu';
import { RxDashboard } from 'react-icons/rx';
import { IoAnalyticsSharp } from 'react-icons/io5';
import { TbChartPie, TbDeviceMobileShare, TbHelpCircle, TbPhoneCalling, TbUsers } from 'react-icons/tb';
import { BsPeople } from 'react-icons/bs';
import { MdDarkMode, MdLightMode, MdOutlineCampaign, MdOutlineNavigateNext, MdOutlineSettingsSuggest } from 'react-icons/md';
import { RiAccountPinCircleLine, RiAppsLine, RiArticleLine } from 'react-icons/ri';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppSelector } from '@hook/useAppSelector';
import { usePathname, useRouter } from 'next/navigation';
import ClientOnlyProvider from '@providers/clientOnlyProvider';
import { NAVIGARIONS_ROUTINGS } from '@constant/navigations';
import { removeObjRef } from '@util/utils';

export type NavItemType = { key?: any, label: string, route: string, icon: any, isChild?: boolean, subNav?: NavItemType[], showSubNav?: boolean, active?: boolean, subNavActive?: boolean };

export const DASHBOARD_MENU: NavItemType[] = [
    {
        label: 'Dashboard', route: NAVIGARIONS_ROUTINGS.DASHBOARDS, icon: <RxDashboard />,
        subNav: [
            { label: 'Summary', route: NAVIGARIONS_ROUTINGS.DASHBOARDS_SUMMARY, icon: <TbChartPie /> },
            { label: 'Sales', route: NAVIGARIONS_ROUTINGS.DASHBOARDS_SALES, icon: <LuLineChart /> },
            { label: 'Users', route: NAVIGARIONS_ROUTINGS.DASHBOARDS_USERS, icon: <TbUsers /> },
            { label: 'Analytics', route: NAVIGARIONS_ROUTINGS.DASHBOARDS_ANALYTICS, icon: <IoAnalyticsSharp /> },
        ]
    },
]

export const REPORTS_MENU: NavItemType[] = [
    {
        label: 'Reports', route: NAVIGARIONS_ROUTINGS.REPORTS, icon: <LuLineChart />,
        subNav: [
            { label: 'Cumulative', route: NAVIGARIONS_ROUTINGS.REPORTS_SUMMARY, icon: <TbChartPie /> },
            { label: 'Sales', route: NAVIGARIONS_ROUTINGS.REPORTS_SALES, icon: <LuLineChart /> },
            { label: 'Users', route: NAVIGARIONS_ROUTINGS.REPORTS_USERS, icon: <TbUsers /> },
            { label: 'Analytics', route: NAVIGARIONS_ROUTINGS.REPORTS_ANALYTICS, icon: <IoAnalyticsSharp /> },
        ]
    },
]

export const APPS_MENU: NavItemType[] = [
    {
        label: 'Apps', route: 'apps', icon: <RiAppsLine />,
        subNav: [
            { label: 'Dashboard', route: NAVIGARIONS_ROUTINGS.APPS_DASHBOARD, icon: <TbChartPie /> },
            { label: 'Chat', route: NAVIGARIONS_ROUTINGS.APP_CHATS, icon: <LuMessageSquare /> },//BiConversation
            { label: 'Blog', route: NAVIGARIONS_ROUTINGS.APP_BLOGS, icon: <RiArticleLine /> },
            { label: 'Email', route: NAVIGARIONS_ROUTINGS.APP_EMAILS, icon: <LuMail /> },
            { label: 'Calendar', route: NAVIGARIONS_ROUTINGS.APP_CALENDAR, icon: <LuCalendarCheck /> },
            { label: 'Kanban', route: NAVIGARIONS_ROUTINGS.APP_KANBAN, icon: <LuCalendarCheck /> },
        ]
    },
]

export const SIDEBAR_NAV_MENUS: NavItemType[] = [
    ...DASHBOARD_MENU,
    { label: 'Builder', route: NAVIGARIONS_ROUTINGS.WEBSITE_BUILDER, icon: <LuLayoutDashboard /> },
    ...REPORTS_MENU,
    ...APPS_MENU,
    { label: 'Profile', route: NAVIGARIONS_ROUTINGS.LOGGEDIN_PROFILE, icon: <RiAccountPinCircleLine /> },
    { label: 'CRM', route: NAVIGARIONS_ROUTINGS.CRM, icon: <BsPeople /> },
    { label: 'Ecommerce', route: NAVIGARIONS_ROUTINGS.ECCOMERCE, icon: <LuShoppingCart /> },
    { label: 'Settings', route: NAVIGARIONS_ROUTINGS.SETTINGS, icon: <LuSettings /> },
    { label: 'PWA', route: NAVIGARIONS_ROUTINGS.PWA, icon: <TbDeviceMobileShare /> },
    { label: 'Promotions', route: NAVIGARIONS_ROUTINGS.PROMOTIONS, icon: <MdOutlineCampaign /> },
    { label: 'Documentation', route: NAVIGARIONS_ROUTINGS.DOCUMENTATION, icon: <TbHelpCircle /> },
    { label: 'Help', route: 'help', icon: <TbHelpCircle /> },
]

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
                        setActiveNav(subnav)
                        setActiveParentNav(nav)
                    }
                })
            }
            if (pathname == `/${nav.route}`) {
                setActiveNav(nav)
                nav.active = true;
            }
        })
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

        // const menuCopy = [...SIDEBAR_NAV_MENUS];
        // let activeNavCopy: NavItemType = { label: '', route: '', icon: '', isChild: false };
        // let activeParentNavCopy: NavItemType = { label: '', route: '', icon: '', isChild: false };
        // menuCopy.map((nav: NavItemType, index: number) => {
        //     //first level nav click
        //     nav.showSubNav = false;
        //     nav.active = false;
        //     if (activeNav.route == nav.route) nav.active = true;

        //     //if clicked on first level nav
        //     if (!Boolean(navItem?.subNav?.length) && menuLevel == 1 && subNavIndex != -1) {
        //         nav.subNavActive = false
        //     }
        //     //second level sub nav clicked
        //     if (Boolean(nav?.subNav?.length)) {

        //         //if clicked on second level nav then all same level subnav should be disabled
        //         if (menuLevel == 2 && navIndex == index) nav.subNav.map((n) => n.active = false)

        //         nav.subNav.map((subnav: NavItemType, subIndex: number) => {
        //             //if clicked on single level nav e=then disable all other subnavs
        //             if (!Boolean(navItem?.subNav?.length) && menuLevel == 1) {
        //                 nav.subNavActive = false
        //                 subnav.active = false
        //             }

        //             //if clicked on second level nav
        //             if (subIndex == subNavIndex && navIndex == index) {
        //                 subnav.active = true;
        //                 activeNavCopy = subnav;
        //                 activeParentNavCopy = nav;
        //                 nav.subNavActive = true
        //                 router.push(`/${subnav.route}`);
        //             }
        //         })
        //     }


        //     if (navIndex == index) {
        //         if (Boolean(nav?.subNav?.length)) {
        //             nav.showSubNav = true;
        //         } else {
        //             nav.active = true;
        //             router.push(`/${nav.route}`);
        //             activeNavCopy = nav;
        //         }
        //     }
        // })

        // setActiveNav(activeNavCopy)
        // setActiveParentNav(activeParentNavCopy)
        // setSidebarMenusList(menuCopy)
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
                            return <Fragment key={navIndex}>
                                <div className={`${styles.menuItemWrap} ${isActive ? styles.active : ""} ${styles[nav.route]}`}
                                    onMouseEnter={() => setHoverId(nav.route)}
                                    onMouseLeave={() => setHoverId('')}
                                    onClick={() => onClickNav(nav, 1, navIndex)}
                                    style={{
                                        backgroundColor: `${(nav.active) ? token.colorPrimaryBgHover : ((nav.route == hoverId || nav.subNavActive) ? token.colorBgTextHover : token.colorBgBase)}`,
                                        color: (nav.active) ? token.colorTextLightSolid : ((nav.route == hoverId || nav.subNavActive) ? token.colorPrimaryTextActive : token.colorText),
                                        border: token.colorBorder,
                                    }}
                                >
                                    <div className={styles.navWrap}>
                                        <div className={styles.labelIconWrap}>
                                            <div className={styles.iconWrap} style={{
                                                color: (isActive) ? token.colorTextLightSolid : (nav.route == hoverId ? token.colorPrimaryTextActive : token.colorText),
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
                                                    color: (isActive) ? token.colorTextLightSolid : (nav.route == hoverId ? token.colorPrimaryTextActive : token.colorText),
                                                }}
                                                transition={{ duration: 0.1 }}
                                                animate={{
                                                    rotate: Boolean(nav.showSubNav) ? 90 : 0,
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
                                    {Boolean(nav.showSubNav && (!isCollapsed || isHover)) && <>
                                        <motion.div
                                            style={{ width: "100%" }}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'max-content', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                        >
                                            {nav.subNav?.map((subNav: any, subnavIndex: number) => {

                                                return <Fragment key={subnavIndex}>
                                                    <div className={`${styles.menuItemWrap} ${styles.subMenuItemWrap} ${subNav.active ? styles.active : ""}`}
                                                        onMouseEnter={() => setHoverId(subNav.route)}
                                                        onMouseLeave={() => setHoverId('')}
                                                        onClick={() => onClickNav(subNav, 2, navIndex, subnavIndex)}
                                                        style={{
                                                            background: `${(subNav.active) ? token.colorPrimaryBgHover : (subNav.route == hoverId ? token.colorBgTextHover : token.colorBgBase)}`,
                                                            color: (subNav.active) ? token.colorTextLightSolid : (subNav.route == hoverId ? token.colorPrimaryTextActive : token.colorText),
                                                            border: token.colorBorder
                                                        }}
                                                    >
                                                        <div className={styles.navWrap}>
                                                            <div className={styles.labelIconWrap}>
                                                                <div className={styles.iconWrap} style={{
                                                                    color: (subNav.active) ? token.colorTextLightSolid : (subNav.route == hoverId ? token.colorPrimaryTextActive : token.colorText),
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

