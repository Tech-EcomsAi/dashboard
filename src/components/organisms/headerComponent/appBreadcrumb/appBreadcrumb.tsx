import { NAVIGARIONS_ROUTINGS, NavItemType, SIDEBAR_NAV_MENUS } from '@constant/navigations';
import { useAppDispatch } from '@hook/useAppDispatch';
import { useAppSelector } from '@hook/useAppSelector';
import { BreadcrumbSubpathsType, BreadcrumbType, getSidebarState, toggleSidbar } from '@reduxSlices/clientThemeConfig';
import { Button, Divider, Dropdown, Space, Tooltip, Typography, theme } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, useCallback } from 'react';
import { LuChevronDown, LuHome, LuPanelLeftClose, LuPanelLeftOpen } from 'react-icons/lu';
import styles from '../headerComponent.module.scss';
const { Text } = Typography;

function AppBreadcrumb() {

    const pathname = usePathname();
    const router = useRouter();
    const isCollapsed = useAppSelector(getSidebarState);
    const dispatch = useAppDispatch();
    const { token } = theme.useToken();

    const onClickBreadCrumb = (selectedKey, parentNav: any, isParent: boolean = false) => {
        if (isParent) {
            if (Boolean(parentNav?.key?.includes("websites"))) {
                Boolean(parentNav.route) && router.replace(`/${parentNav.route}`)
            }
        } else {
            const newNav: NavItemType = parentNav.subNav.find((nav: NavItemType) => nav.key == selectedKey.key);
            router.replace(`/${newNav.route}`)
        }
    }


    const getBredcrumbs = (pathname) => {
        let breadcrumbArray: any = [];
        const navCopy = [...SIDEBAR_NAV_MENUS]
        if (pathname.includes("websites")) {
            const websiteNav = navCopy.find((n: any) => n.label == 'Website');
            const subNavEle = [];
            if (pathname.includes(`/${NAVIGARIONS_ROUTINGS.WEBSITE_BUILDER_EDITOR}`)) {
                subNavEle.push({ key: "editor", label: "Editor", icon: null, route: null })
                breadcrumbArray.push({ key: 'websites', icon: websiteNav.icon, route: websiteNav.route, label: 'Website Dashboard', subNav: subNavEle.length ? subNavEle : [] })
            } else {
                breadcrumbArray.push({ key: 'websites', icon: websiteNav.icon, route: null, label: "Website Dashboard", subNav: [] })
            }
        } else {
            let activeParentNavIndex = -1;
            navCopy.map((navItem: NavItemType, pIndex: number) => {
                if (navItem.subNav) {
                    navItem.subNav.map((subNavItem: any, sIndex) => {
                        subNavItem.key = `${pIndex}${sIndex}`
                        if (pathname == `/${subNavItem.route}`) {
                            subNavItem.active = true;
                            activeParentNavIndex = pIndex;
                        } else subNavItem.active = false;
                    })
                } else {
                    if (pathname == `/${navItem.route}`) {
                        activeParentNavIndex = pIndex;
                    }
                }
            })
            if (activeParentNavIndex != -1) {
                let activeParentNav: NavItemType = navCopy[activeParentNavIndex];
                const subNavEle = [];
                if (activeParentNav.subNav) {
                    const subNavCopy = [...activeParentNav.subNav]
                    subNavCopy.map((nav) => {
                        subNavEle.push({
                            key: nav.key,
                            // active: nav.active,
                            label: nav.label,
                            icon: <nav.icon style={{ fontSize: 15 }} />,
                            route: nav.route,
                        })
                        //if subnav selected then subnav key set to parents key for displaying on dropdown label
                        if (nav.active) activeParentNav.key = nav.key;
                    })
                }
                breadcrumbArray.push({ key: activeParentNav.key, icon: activeParentNav.icon, route: activeParentNav.route, label: activeParentNav.label, subNav: subNavEle.length ? subNavEle : [] })
            }
        }
        return [...breadcrumbArray];
    }

    const breadcrumbs = useCallback(() => getBredcrumbs(pathname), [pathname])


    return (
        <Fragment>
            <div className={styles.breadcrumbsWrap}>
                <Space align='center'>
                    <Tooltip title={`${isCollapsed ? "Expand sidebar navigation" : "Collapse sidebar navigation"}`}>
                        <Button icon={isCollapsed ? <LuPanelLeftOpen /> : <LuPanelLeftClose />} type='text' style={{ padding: "0", fontSize: "20px" }} onClick={() => dispatch(toggleSidbar(!isCollapsed))} />
                    </Tooltip>

                    <Divider type='vertical' plain style={{ height: "32px", margin: "0", borderInlineStartWidth: "2px", top: "2px", }} />

                    <Tooltip title="Go to your main home page">
                        <Button icon={<LuHome />} type='text' style={{ padding: "0", fontSize: "20px" }} onClick={() => router.push('/')} />
                    </Tooltip>

                    <Divider type='vertical' plain style={{ height: "32px", margin: "0", borderInlineStartWidth: "2px", top: "2px", }} />

                    <Space align='center' size={0}>
                        {breadcrumbs().map((breadcrumb: BreadcrumbType, i: number) => {
                            const activeSubNav = breadcrumb.subNav ? breadcrumb.subNav.find((subBreadcrumb: BreadcrumbSubpathsType) => breadcrumb.key == subBreadcrumb.key) : null;
                            return <Fragment key={i}>
                                <Tooltip title={`Currently you're on ${breadcrumb.label} page`}>
                                    <Text className={styles.bradcrumbLabel} style={{ color: token.colorTextBase, background: token.colorFillContent }} onClick={() => onClickBreadCrumb(null, breadcrumb, true)}>
                                        <breadcrumb.icon />
                                        {breadcrumb.label}
                                    </Text>
                                </Tooltip>
                                {breadcrumb.subNav.length != 0 && <>
                                    <Text className={styles.bradcrumbLabel} style={{ color: token.colorTextBase, background: token.colorBgBase, padding: "0 5px" }}>/</Text>
                                    {breadcrumb.subNav.length > 1 ? <Dropdown menu={{
                                        items: breadcrumb.subNav,
                                        onClick: (selectedKey) => onClickBreadCrumb(selectedKey, breadcrumb, false),
                                        selectable: true,
                                        defaultSelectedKeys: [`${breadcrumb.key.toString()}`],
                                    }}>
                                        <Text className={styles.bradcrumbLabel} style={{ color: token.colorTextBase, background: token.colorFillContent, cursor: "pointer" }}>
                                            {/* {activeSubNav.icon}  */}
                                            {activeSubNav?.label || ''} <LuChevronDown />
                                        </Text>
                                    </Dropdown> : <>
                                        <Text className={styles.bradcrumbLabel} style={{ color: token.colorTextBase, background: token.colorFillContent, cursor: "pointer" }}>
                                            {breadcrumb.subNav[0]?.label || ''}
                                        </Text>
                                    </>}
                                </>}
                            </Fragment>
                        })}
                    </Space>
                </Space>
            </div>
        </Fragment>
    )
}

export default AppBreadcrumb