import { NavItemType, SIDEBAR_NAV_MENUS } from '@organisms/sidebar';
import { BreadcrumbSubpathsType, BreadcrumbType, getSidebarState, toggleSidbar } from '@reduxSlices/clientThemeConfig';
import { removeObjRef } from '@util/utils';
import { Button, Divider, Dropdown, MenuProps, Space, Typography, theme } from 'antd';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { Fragment, useCallback } from 'react'
import { TbChevronRight, TbCornerDownLeft, TbSlash } from 'react-icons/tb';
import styles from '../headerComponent.module.scss'
import { useAppSelector } from '@hook/useAppSelector';
import { LuPanelLeftOpen, LuPanelLeftClose, LuHome, LuChevronDown } from 'react-icons/lu';
import { useAppDispatch } from '@hook/useAppDispatch';
import { NAVIGARIONS_ROUTINGS } from '@constant/navigations';
import { RxSlash } from 'react-icons/rx';
const { Text } = Typography;

function AppBreadcrumb() {

    const pathname = usePathname();
    const router = useRouter();
    const isCollapsed = useAppSelector(getSidebarState);
    const dispatch = useAppDispatch();
    const { token } = theme.useToken();

    const onClickBreadCrumb = (selectedKey, parentNav: any) => {
        const newNav: NavItemType = parentNav.subNav.find((nav: NavItemType) => nav.key == selectedKey.key);
        router.replace(`/${newNav.route}`)
    }


    const getBredcrumbs = (pathname) => {
        let breadcrumbArray: any = [];
        const navCopy = [...SIDEBAR_NAV_MENUS]
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
                        icon: nav.icon,
                        route: nav.route,
                    })
                    //if subnav selected then subnav key set to parents key for displaying on dropdown label
                    if (nav.active) activeParentNav.key = nav.key;
                })
            }
            breadcrumbArray.push({ key: activeParentNav.key, route: activeParentNav.route, label: activeParentNav.label, subNav: subNavEle.length ? subNavEle : [] })
        } // else 404 page
        return breadcrumbArray;
    }

    const breadcrumbs = useCallback(() => getBredcrumbs(pathname), [pathname])


    return (
        <Fragment>
            <div className={styles.breadcrumbsWrap}>
                <Space align='center'>
                    <Button icon={isCollapsed ? <LuPanelLeftOpen /> : <LuPanelLeftClose />} type='text' style={{ padding: "0", fontSize: "20px" }} onClick={() => dispatch(toggleSidbar(!isCollapsed))} />
                    <Divider type='vertical' plain style={{ height: "32px", margin: "0", borderInlineStartWidth: "2px", top: "2px", }} />
                    <Button icon={<LuHome />} type='text' style={{ padding: "0", fontSize: "20px" }} onClick={() => router.push('/')} />
                    <Divider type='vertical' plain style={{ height: "32px", margin: "0", borderInlineStartWidth: "2px", top: "2px", }} />
                    <Space align='center' size={0}>
                        {breadcrumbs().map((breadcrumb: BreadcrumbType, i: number) => {
                            return <Fragment key={i}>
                                <Text className={styles.bradcrumbLabel} style={{ color: token.colorTextBase, background: token.colorFillContent }}>{breadcrumb.label}</Text>
                                {breadcrumb.subNav.length != 0 && <>
                                    <Text className={styles.bradcrumbLabel} style={{ color: token.colorTextBase, background: token.colorBgBase, padding: "0 5px" }}>/</Text>
                                    <Dropdown menu={{
                                        items: breadcrumb.subNav,
                                        onClick: (selectedKey) => onClickBreadCrumb(selectedKey, breadcrumb),
                                        selectable: true,
                                        defaultSelectedKeys: [`${breadcrumb.key.toString()}`],
                                    }}>
                                        <Text className={styles.bradcrumbLabel} style={{ color: token.colorTextBase, background: token.colorFillContent, cursor: "pointer" }}>
                                            {breadcrumb.subNav.find((subBreadcrumb: BreadcrumbSubpathsType) => breadcrumb.key == subBreadcrumb.key)?.label || ''} <LuChevronDown />
                                        </Text>
                                    </Dropdown>
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