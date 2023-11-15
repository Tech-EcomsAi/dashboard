import React, { Fragment } from 'react';
import { Drawer, Skeleton, theme } from 'antd';
import { IoClose } from 'react-icons/io5';
import IconButton from '@antdComponent/iconButton';
import styles from '@organismsCSS/sidebarComponent/appSettingsPanel.module.scss'
import TextElement from '@antdComponent/textElement';
import Saperator from '@atoms/Saperator';
import { useAppSelector } from '@hook/useAppSelector';
import { getDarkModeState, toggleDarkMode } from '@reduxSlices/darkMode';
import { useAppDispatch } from '@hook/useAppDispatch';
import { showSuccessToast } from '@reduxSlices/toast';
import { DARK_COLORS, LIGHT_COLORS } from 'src/data/defaultSiteConfig';
import { convertRGBtoOBJ, hexToRgbA } from '@util/utils';
type PanelProps = {
  open: boolean,
  togglePannel: any,
  toggleCollapsed: any,
  isCollapsed: any
}

const colorsList = {
  light: LIGHT_COLORS,
  dark: DARK_COLORS,
}
const AppSettingsPanel = ({ open, togglePannel, toggleCollapsed, isCollapsed }: PanelProps) => {
  const { token } = theme.useToken();
  const isDarkMode = useAppSelector(getDarkModeState);
  const dispatch = useAppDispatch();

  const toggleDarkModeTheme = (from: string) => {
    if (from == 'light') {
      if (isDarkMode) {
        dispatch(toggleDarkMode(!isDarkMode));
        // dispatch(showSuccessToast(`Color mode changed to light mode`))
      }
    } else {
      if (!isDarkMode) {
        dispatch(toggleDarkMode(!isDarkMode));
        // dispatch(showSuccessToast(`Color mode changed to dark mode`))
      }
    }
  }
  return (
    <>
      <Drawer
        title="App settings"
        placement={"right"}
        closable={false}
        onClose={togglePannel}
        destroyOnClose={true}
        open={open}
        mask={false}
        key={"app-settings"}
        extra={<IconButton type={'circle'} icon={<IoClose />} active={false} onClickButton={togglePannel} />}
      >

        <div className={styles.appSettingsPanelWrap}>
          <div className={styles.settingsWrap}>
            <TextElement text={'Color Mode'} color={token.colorPrimary} size={"large"} />
            <div className={styles.settingsDetails}>
              <div className={styles.setting} style={{ borderColor: !isDarkMode ? token.colorPrimary : token.colorBorder }} onClick={() => toggleDarkModeTheme("light")}>
                <TextElement text={'Light Mode'} color={token.colorTextBase} />
                <div className={`${styles.skeletonWrap} ${styles.light}`}>
                  <div className={styles.small}></div>
                  <div className={styles.large}></div>
                </div>
              </div>
              <div className={styles.setting} style={{ borderColor: isDarkMode ? token.colorPrimary : token.colorBorder }} onClick={() => toggleDarkModeTheme("dark")}>
                <TextElement text={'Dark Mode'} color={token.colorTextBase} />
                <div className={`${styles.skeletonWrap} ${styles.dark}`}>
                  <div className={styles.small}></div>
                  <div className={styles.large}></div>
                </div>
              </div>
            </div>
          </div>
          <Saperator />
          <div className={styles.settingsWrap}>
            <TextElement text={'Sidebar'} color={token.colorPrimary} size={"large"} />
            <div className={styles.settingsDetails}>
              <div className={styles.setting} style={{ borderColor: !isCollapsed ? token.colorPrimary : token.colorBorder }} onClick={isCollapsed ? toggleCollapsed : () => { }}>
                <TextElement text={'Default'} color={token.colorTextBase} />
                <div className={`${styles.skeletonWrap} ${styles.sidebar} ${styles.default}`} style={{ background: token.colorBgContainer }}>
                  <div className={styles.elementWrap} style={{ background: token.colorBgBase, borderColor: token.colorBorderSecondary }}>
                    <div className={styles.element} style={{ background: token.colorFillContent }}><span style={{ background: token.colorFillContent }}></span></div>
                    <div className={styles.element} style={{ background: token.colorFillContent }}><span style={{ background: token.colorFillContent }}></span></div>
                    <div className={styles.element} style={{ background: token.colorFillContent }}><span style={{ background: token.colorFillContent }}></span></div>
                  </div>
                </div>
              </div>
              <div className={styles.setting} style={{ borderColor: isCollapsed ? token.colorPrimary : token.colorBorder }} onClick={!isCollapsed ? toggleCollapsed : () => { }}>
                <TextElement text={'Minimized'} color={token.colorTextBase} />
                <div className={`${styles.skeletonWrap} ${styles.sidebar} ${styles.minimized}`} style={{ background: token.colorBgContainer }}>
                  <div className={styles.elementWrap} style={{ background: token.colorBgBase, borderColor: token.colorBorderSecondary }}>
                    <div className={styles.element} style={{ background: token.colorFillContent }}></div>
                    <div className={styles.element} style={{ background: token.colorFillContent }}></div>
                    <div className={styles.element} style={{ background: token.colorFillContent }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Saperator />
          <div className={styles.settingsWrap}>
            <TextElement text={'Color presets'} color={token.colorPrimary} size={"large"} />
            <div className={styles.settingsDetails}>
              <div className={styles.setting}
                style={{ borderColor: token.colorBorder, transform: "unset" }}
                onClick={isCollapsed ? toggleCollapsed : () => { }}>
                <TextElement text={'Primary theme color'} color={token.colorTextBase} />
                <div className={`${styles.skeletonWrap} ${styles.colors}`} style={{ background: token.colorBgContainer }}>
                  {colorsList[isDarkMode ? "dark" : "light"].map((color: any, i: number) => {
                    const rgbaColors: any = convertRGBtoOBJ(hexToRgbA(color));
                    return <Fragment key={i}>
                      <div className={styles.element}
                        style={{ background: `rgba(${rgbaColors.r}, ${rgbaColors.g}, ${rgbaColors.b}, ${0.6})`, borderColor: color }}>
                        <span style={{ background: color }}></span>
                      </div>
                    </Fragment>
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

      </Drawer>
    </>
  );
};

export default AppSettingsPanel;