import React, { Fragment } from 'react';
import { Button, Drawer, Skeleton, theme } from 'antd';
import { IoClose } from 'react-icons/io5';
import IconButton from '@antdComponent/iconButton';
import styles from '@organismsCSS/sidebarComponent/appSettingsPanel.module.scss'
import TextElement from '@antdComponent/textElement';
import Saperator from '@atoms/Saperator';
import { useAppSelector } from '@hook/useAppSelector';
import { useAppDispatch } from '@hook/useAppDispatch';
import { convertRGBtoOBJ, hexToRgbA } from '@util/utils';
import { getDarkColorState, getDarkModeState, getLightColorState, getSidebarState, toggleDarkMode, toggleSidbar, updateDarkThemeColor, updateLightThemeColor } from '@reduxSlices/clientThemeConfig';
import { LIGHT_COLORS, DARK_COLORS } from '@constant/common';
import SelectedItemCheck from '@atoms/selectedItemCheck';

type PanelProps = {
  open: boolean,
  togglePannel: any
}

const colorsList = {
  light: LIGHT_COLORS,
  dark: DARK_COLORS,
}
const AppSettingsPanel = ({ open, togglePannel }: PanelProps) => {
  const { token } = theme.useToken();
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(getDarkModeState);
  const lightThemeColor = useAppSelector(getLightColorState)
  const darkThemeColor = useAppSelector(getDarkColorState)
  const isCollapsed = useAppSelector(getSidebarState)

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

  const updateThemeColor = (color: any) => {
    if (isDarkMode) {
      dispatch(updateDarkThemeColor(color))
    } else {
      dispatch(updateLightThemeColor(color))
    }
  }

  const toggleSidebarState = () => {
    dispatch(toggleSidbar(!isCollapsed))
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
          {/* //color mode wrap */}
          <div className={styles.settingsWrap}>
            <TextElement text={'Color Mode'} color={token.colorPrimary} size={"small"} />
            <div className={styles.settingsDetails}>
              <div className={styles.setting} style={{ borderColor: !isDarkMode ? token.colorPrimary : token.colorBorder }} onClick={() => toggleDarkModeTheme("light")}>
                <TextElement text={'Light Mode'} color={token.colorTextBase} />
                <div className={`${styles.skeletonWrap} ${styles.light}`}>
                  <div className={styles.small}></div>
                  <div className={styles.large}></div>
                </div>
                <SelectedItemCheck active={!isDarkMode} />
              </div>
              <div className={styles.setting} style={{ borderColor: isDarkMode ? token.colorPrimary : token.colorBorder }} onClick={() => toggleDarkModeTheme("dark")}>
                <TextElement text={'Dark Mode'} color={token.colorTextBase} />
                <div className={`${styles.skeletonWrap} ${styles.dark}`}>
                  <div className={styles.small}></div>
                  <div className={styles.large}></div>
                </div>
                <SelectedItemCheck active={isDarkMode} />
              </div>
            </div>
          </div>
          {/* //side bar wrap */}
          <Saperator />
          <div className={styles.settingsWrap}>
            <TextElement text={'Sidebar'} color={token.colorPrimary} size={"small"} />
            <div className={styles.settingsDetails}>
              <div className={styles.setting} style={{ borderColor: !isCollapsed ? token.colorPrimary : token.colorBorder }} onClick={isCollapsed ? toggleSidebarState : () => { }}>
                <TextElement text={'Default'} color={token.colorTextBase} />
                <div className={`${styles.skeletonWrap} ${styles.sidebar} ${styles.default}`} style={{ background: token.colorBgContainer }}>
                  <div className={styles.elementWrap} style={{ background: token.colorBgBase, borderColor: token.colorBorderSecondary }}>
                    <div className={styles.element} style={{ background: token.colorFillContent }}><span style={{ background: token.colorFillContent }}></span></div>
                    <div className={styles.element} style={{ background: token.colorFillContent }}><span style={{ background: token.colorFillContent }}></span></div>
                    <div className={styles.element} style={{ background: token.colorFillContent }}><span style={{ background: token.colorFillContent }}></span></div>
                  </div>
                </div>
                <SelectedItemCheck active={!isCollapsed} />
              </div>
              <div className={styles.setting} style={{ borderColor: isCollapsed ? token.colorPrimary : token.colorBorder }} onClick={!isCollapsed ? toggleSidebarState : () => { }}>
                <TextElement text={'Minimized'} color={token.colorTextBase} />
                <div className={`${styles.skeletonWrap} ${styles.sidebar} ${styles.minimized}`} style={{ background: token.colorBgContainer }}>
                  <div className={styles.elementWrap} style={{ background: token.colorBgBase, borderColor: token.colorBorderSecondary }}>
                    <div className={styles.element} style={{ background: token.colorFillContent }}></div>
                    <div className={styles.element} style={{ background: token.colorFillContent }}></div>
                    <div className={styles.element} style={{ background: token.colorFillContent }}></div>
                  </div>
                </div>
                <SelectedItemCheck active={isCollapsed} />
              </div>
            </div>
          </div>
          {/* //theme color wrap */}
          <Saperator />
          <div className={styles.settingsWrap}>
            <TextElement text={'Color presets'} color={token.colorPrimary} size={"small"} />
            <div className={styles.settingsDetails}>
              <div className={styles.setting}
                style={{ borderColor: token.colorBorder, transform: "unset" }}>
                <TextElement text={'Primary theme color'} color={token.colorTextBase} />
                <div className={`${styles.skeletonWrap} ${styles.colors}`} style={{ background: token.colorBgContainer }}>
                  {colorsList[isDarkMode ? "dark" : "light"].map((color: any, i: number) => {
                    const rgbaColors: any = convertRGBtoOBJ(hexToRgbA(color));
                    return <Fragment key={i}>
                      <Button className={styles.element}
                        onClick={() => updateThemeColor(color)}
                        style={{ background: `rgba(${rgbaColors.r}, ${rgbaColors.g}, ${rgbaColors.b}, ${0.6})`, borderColor: color }}>
                        <SelectedItemCheck active={isDarkMode ? (darkThemeColor == color) : (lightThemeColor == color)} />
                        <span style={{
                          background: color,
                          borderRadius: isDarkMode ? (darkThemeColor == color ? "4px" : "15px") : (lightThemeColor == color ? "4px" : "15px")
                        }}></span>
                      </Button>
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