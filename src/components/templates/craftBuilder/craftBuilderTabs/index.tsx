import React, { useState } from 'react'
import styles from './tabs.module.scss';
import { MenuProps, theme } from 'antd';
import { Layout, Menu } from 'antd';
import SvgIcon from '@atoms/svgIcon';
import { EDITOR_SIDEBAR, EDITOR_TABS } from '@constant/craftBuilder';
const { Sider }: any = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function TabsWrapper({ setActiveEditorTab, activeEditorTab }) {
    const isDarkMode = true;
    const [collapsed, setCollapsed] = useState(false);
    const { token } = theme.useToken();
    const [open, setOpen] = useState(false);
    const getMenuItems: any = (navMenu: any, isSubMenu: boolean = false) => {
        const menuItems: MenuItem[] = [];
        navMenu.map((nav: any) => {
            menuItems.push({
                label: (<span className={styles.navLabel}>{nav.label}</span>),
                key: nav.key,
                icon: (<span role="img" aria-label="desktop"
                    style={{
                        filter: activeEditorTab == nav.key ? `drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.2))` : ``
                    }}
                    className={`${styles.navIcon} anticon anticon-desktop ant-menu-item-icon`}>
                    <SvgIcon icon={nav.icon} onlySvg={true} />
                </span>),
                style: {
                    // transition: "all ease-out 0.3s"
                    // background: activeEditorTab == nav.key ? token.colorPrimaryBg : token.colorBgLayout
                },
                className: (activeEditorTab == nav.key ? styles.activeMenu : '') + ' ' +
                    (isSubMenu ? styles.navMenu + ' ' + styles.navSubMenu : styles.navMenu) + ' ' +
                    (nav.subNav ? styles.hasSubMenu : '') + ' ' + (((nav.key == 'dark' && isDarkMode) || (nav.key == 'light' && !isDarkMode) ? ' ant-menu-item-selected' : '')),
            })
        })
        return menuItems;
    }

    const onClickNav: MenuProps['onClick'] = (menu: any) => {
        switch (menu.key) {
            case 'collapsed':
                setOpen(!open);
                break;
            case 'expanded':
                setOpen(!open);
                break;
            default:
                setActiveEditorTab(menu.key);
                break;
        }
    };


    return (
        <>
            <div className={styles.sideBar}>
                <Menu
                    className={`${styles.siderNavWrap} ${collapsed ? styles.collapsedMenu : ""}`}
                    onClick={onClickNav} theme={!isDarkMode ? 'dark' : 'light'}
                    mode="vertical" selectedKeys={[activeEditorTab]}
                    defaultSelectedKeys={[activeEditorTab]}
                    items={getMenuItems(EDITOR_SIDEBAR)}
                    style={{
                        "display": "flex",
                        "justifyContent": "flex-start",
                        "alignItems": "center",
                        "padding": "7px 2px",
                        "flexDirection": "column",
                        "maxHeight": "calc(100vh - 84px)",
                        "borderRadius": "8px",
                        "width": "100%",
                        // "background": ${token.colorBorder},
                        "border": `unset`,
                        "gap": "8px",
                        "overflow": "auto"
                    }}
                />
            </div>
        </>
    )
}

export default TabsWrapper