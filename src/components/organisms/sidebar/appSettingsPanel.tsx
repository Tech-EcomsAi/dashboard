import React, { Fragment, useEffect } from 'react';
import { Button, Drawer, Select, Space, theme } from 'antd';
import { IoClose } from 'react-icons/io5';
import IconButton from '@antdComponent/iconButton';
import styles from '@organismsCSS/sidebarComponent/appSettingsPanel.module.scss'
import TextElement from '@antdComponent/textElement';
import Saperator from '@atoms/Saperator';
import { useAppSelector } from '@hook/useAppSelector';
import { useAppDispatch } from '@hook/useAppDispatch';
import { convertRGBtoOBJ, hexToRgbA } from '@util/utils';
import { getAppLanguageState, getAppSettingsPanelStatus, getDarkColorState, getDarkModeState, getFullscreenModeState, getHeaderBgBlurState, getHeaderPositionState, getLightColorState, getRTLDirectionState, getShowDateInHeaderState, getShowUserDetailsInHeaderState, getSidebarState, toggleAppSettingsPanel, toggleDarkMode, toggleFullscreenMode, toggleHeaderBgBlur, toggleHeaderPosition, toggleRTLDirection, toggleShowDateInHeader, toggleShowUserDetailsInHeader, toggleSidbar, updateAppLanguage, updateDarkThemeColor, updateLightThemeColor } from '@reduxSlices/clientThemeConfig';
import { LIGHT_COLORS, DARK_COLORS, AVAILABLE_LANGUAGES } from '@constant/common';
import SelectedItemCheck from '@atoms/selectedItemCheck';
import CheckboxElement from '@antdComponent/checkboxElement';
import { LuArrowRight, LuArrowUpRight, LuExternalLink, LuLanguages } from 'react-icons/lu';
import { showErrorToast, showSuccessToast } from '@reduxSlices/toast';

const colorsList = {
  light: LIGHT_COLORS,
  dark: DARK_COLORS,
}
const AppSettingsPanel = () => {
  const { token } = theme.useToken();
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(getDarkModeState)
  const lightThemeColor = useAppSelector(getLightColorState)
  const darkThemeColor = useAppSelector(getDarkColorState)
  const isCollapsed = useAppSelector(getSidebarState)
  const isOpen = useAppSelector(getAppSettingsPanelStatus)
  const fixedHeader = useAppSelector(getHeaderPositionState)
  const headerBgBlured = useAppSelector(getHeaderBgBlurState)
  const isRTLDirection = useAppSelector(getRTLDirectionState)
  const showDateInHeader = useAppSelector(getShowDateInHeaderState)
  const showUserInHeader = useAppSelector(getShowUserDetailsInHeaderState)
  const appLanguage = useAppSelector(getAppLanguageState);
  const fullscreenMode = useAppSelector(getFullscreenModeState);

  useEffect(() => {
    dispatch(toggleFullscreenMode(false))
    // addEventListener("fullscreenchange", () => {

    // });
  }, [])


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

  const handleLanguageChange: any = (lang: any) => {
    dispatch(updateAppLanguage(lang))
  };

  const getLanguageOptions = () => {
    return [
      {
        value: 'en',
        label: <Space> <>En</>English</Space>,
      },
      {
        value: 'hi',
        label: <Space> <>हिंदी</>Hindi</Space>,
      },
      {
        value: 'ar',
        label: <Space> <>عربي</>Arebic</Space>,
      },
    ]
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setTimeout(() => {
        if (Boolean(window?.document?.fullscreenEnabled)) {
          dispatch(showSuccessToast("Fullscreen mode enabled"))
          dispatch(toggleFullscreenMode(true))
        }
        else dispatch(showErrorToast("Your broweser does not support fullscreen mode"))
      }, 1000);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      dispatch(showSuccessToast("Fullscreen mode disabled"))
      dispatch(toggleFullscreenMode(false))
    }
  }

  const renderTitle = () => {
    return <Space direction='vertical' size={0}>
      <TextElement text={'App Appearance'} size="medium" color={token.colorPrimary} />
      <TextElement text={'Customize & Preview in Real Time'} size="small" color={token.colorTextDescription} />
    </Space>
  }

  return (
    <>
      <Drawer
        title={renderTitle()}
        placement={"right"}
        closable={false}
        onClose={() => dispatch(toggleAppSettingsPanel(!isOpen))}
        destroyOnClose={true}
        open={isOpen}
        mask={false}
        key={"app-settings"}
        extra={<IconButton type={'circle'} icon={<IoClose />} active={false} onClickButton={() => dispatch(toggleAppSettingsPanel(!isOpen))} />}
      >
        <div className={styles.appSettingsPanelWrap}>
          {/* //color mode wrap */}
          <div className={styles.settingsWrap}>
            <TextElement text={'Color Mode'} color={token.colorTextBase} size="medium" />
            <div className={styles.settingsDetails}>
              <Button type='text' className={styles.setting} style={{ height: "auto", borderColor: !isDarkMode ? token.colorPrimary : token.colorBorderSecondary }} onClick={() => toggleDarkModeTheme("light")}>
                <TextElement text={'Light Mode'} color={token.colorTextLabel} />
                <div className={`${styles.skeletonWrap} ${styles.light}`}>
                  <div className={styles.small}></div>
                  <div className={styles.large}></div>
                </div>
                <SelectedItemCheck active={!isDarkMode} />
              </Button>
              <Button type='text' className={styles.setting} style={{ height: "auto", borderColor: isDarkMode ? token.colorPrimary : token.colorBorderSecondary }} onClick={() => toggleDarkModeTheme("dark")}>
                <TextElement text={'Dark Mode'} color={token.colorTextLabel} />
                <div className={`${styles.skeletonWrap} ${styles.dark}`}>
                  <div className={styles.small}></div>
                  <div className={styles.large}></div>
                </div>
                <SelectedItemCheck active={isDarkMode} />
              </Button>
            </div>
          </div>
          {/* //side bar wrap */}
          <Saperator />
          <div className={styles.settingsWrap}>
            <TextElement text={'Sidebar Layout'} color={token.colorTextBase} size="medium" />
            <div className={styles.settingsDetails}>
              <Button type='text' className={styles.setting} style={{ height: "auto", borderColor: !isCollapsed ? token.colorPrimary : token.colorBorderSecondary }} onClick={isCollapsed ? toggleSidebarState : () => { }}>
                <TextElement text={'Default'} color={token.colorTextLabel} />
                <div className={`${styles.skeletonWrap} ${styles.sidebar} ${styles.default}`} style={{ background: token.colorBgContainer }}>
                  <div className={styles.elementWrap} style={{ background: token.colorBgBase, borderColor: token.colorBorderSecondary }}>
                    <div className={styles.element} style={{ background: token.colorFillContent }}><span style={{ background: token.colorFillContent }}></span></div>
                    <div className={styles.element} style={{ background: token.colorFillContent }}><span style={{ background: token.colorFillContent }}></span></div>
                    <div className={styles.element} style={{ background: token.colorFillContent }}><span style={{ background: token.colorFillContent }}></span></div>
                    <div className={styles.element} style={{ background: token.colorFillContent }}><span style={{ background: token.colorFillContent }}></span></div>
                  </div>
                </div>
                <SelectedItemCheck active={!isCollapsed} />
              </Button>
              <Button type='text' className={styles.setting} style={{ height: "auto", borderColor: isCollapsed ? token.colorPrimary : token.colorBorderSecondary }} onClick={!isCollapsed ? toggleSidebarState : () => { }}>
                <TextElement text={'Minimized'} color={token.colorTextLabel} />
                <div className={`${styles.skeletonWrap} ${styles.sidebar} ${styles.minimized}`} style={{ background: token.colorBgContainer }}>
                  <div className={styles.elementWrap} style={{ background: token.colorBgBase, borderColor: token.colorBorderSecondary }}>
                    <div className={styles.element} style={{ background: token.colorFillContent }}></div>
                    <div className={styles.element} style={{ background: token.colorFillContent }}></div>
                    <div className={styles.element} style={{ background: token.colorFillContent }}></div>
                  </div>
                </div>
                <SelectedItemCheck active={isCollapsed} />
              </Button>
            </div>
            {/* <div className={styles.settingsDetails}>
              <div className={styles.setting}
                style={{ borderColor: token.colorBorder, transform: "unset" }}>
                <TextElement text={'Sidebar Background Color'} color={token.colorTextBase} />
                <div className={`${styles.skeletonWrap} ${styles.colors}`} style={{ background: token.colorBgContainer }}>
                  {colorsList[isDarkMode ? "dark" : "light"].map((color: any, i: number) => {
                    const rgbaColors: any = convertRGBtoOBJ(hexToRgbA(color));
                    return <Fragment key={i}>
                      <Button className={styles.element}
                        onClick={() => dispatch(updateSidebarBgColor(color))}
                        style={{ background: `rgba(${rgbaColors.r}, ${rgbaColors.g}, ${rgbaColors.b}, ${0.6})`, borderColor: color }}>
                        <SelectedItemCheck active={sidebarBgColor == color} />
                        <span style={{ background: color, borderRadius: sidebarBgColor == color ? "4px" : "15px" }}></span>
                      </Button>
                    </Fragment>
                  })}
                </div>
              </div>
            </div>
            <div className={styles.settingsDetails}>
              <div className={styles.setting}
                style={{ borderColor: token.colorBorder, transform: "unset" }}>
                <TextElement text={'Sidebar Color'} color={token.colorTextBase} />
                <div className={`${styles.skeletonWrap} ${styles.colors}`} style={{ background: token.colorBgContainer }}>
                  {colorsList[isDarkMode ? "dark" : "light"].map((color: any, i: number) => {
                    const rgbaColors: any = convertRGBtoOBJ(hexToRgbA(color));
                    return <Fragment key={i}>
                      <Button className={styles.element}
                        onClick={() => dispatch(updateSidebarColor(color))}
                        style={{ background: `rgba(${rgbaColors.r}, ${rgbaColors.g}, ${rgbaColors.b}, ${0.6})`, borderColor: color }}>
                        <SelectedItemCheck active={sidebarColor == color} />
                        <span style={{ background: color, borderRadius: sidebarColor == color ? "4px" : "15px" }}></span>
                      </Button>
                    </Fragment>
                  })}
                </div>
              </div>
            </div> */}
          </div>
          {/* //theme color wrap */}
          <Saperator />
          <div className={styles.settingsWrap}>
            <TextElement text={'Color presets'} color={token.colorTextBase} size="medium" />
            <div className={styles.settingsDetails}>
              <div className={styles.setting}
                style={{ borderColor: token.colorBorder, transform: "unset" }}>
                <TextElement text={'Primary theme color'} color={token.colorTextLabel} />
                <div className={`${styles.skeletonWrap} ${styles.colors}`} style={{ background: token.colorBgContainer }}>
                  {colorsList[isDarkMode ? "dark" : "light"].map((color: any, i: number) => {
                    const rgbaColors: any = convertRGBtoOBJ(hexToRgbA(color));
                    return <Fragment key={i}>
                      <Button className={styles.element}
                        onClick={() => updateThemeColor(color)}
                        style={{ background: `rgba(${rgbaColors.r}, ${rgbaColors.g}, ${rgbaColors.b}, ${0.6})`, borderColor: color }}>
                        <SelectedItemCheck active={isDarkMode ? (darkThemeColor == color) : (lightThemeColor == color)} />
                        <span style={{ background: color, borderRadius: isDarkMode ? (darkThemeColor == color ? "4px" : "15px") : (lightThemeColor == color ? "4px" : "15px") }}></span>
                      </Button>
                    </Fragment>
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* //header wrap */}
          <Saperator />
          <div className={styles.settingsWrap}>
            <TextElement text={'Header Styles'} color={token.colorTextBase} size="medium" />
            <div className={styles.settingsDetails}>
              <div className={styles.setting} style={{ borderColor: token.colorBorder, transform: "unset" }}>
                <CheckboxElement label='Fixed Header' active={fixedHeader} onChange={() => dispatch(toggleHeaderPosition(!fixedHeader))} />
              </div>
              <div className={styles.setting} style={{ borderColor: token.colorBorder, transform: "unset" }}>
                <CheckboxElement label='Blur Header' active={headerBgBlured} onChange={() => dispatch(toggleHeaderBgBlur(!headerBgBlured))} />
              </div>
            </div>
          </div>

          {/* //App language */}
          <Saperator />
          <div className={styles.settingsWrap}>
            <TextElement text={'App Language'} color={token.colorTextBase} size="medium" />
            <div className={styles.settingsDetails} style={{ gap: 0 }}>
              <div className={styles.setting} style={{ borderColor: token.colorBorder, transform: "unset", width: "auto" }}>
                <Select
                  defaultValue="En English"
                  value={appLanguage}
                  style={{ width: 'auto' }}
                  onChange={handleLanguageChange}
                  options={getLanguageOptions()}
                />
              </div>
              <div className={styles.setting} style={{ borderColor: token.colorBorder, transform: "unset", paddingLeft: "0" }}>
                {/* <Button icon={<LuLanguages />}>Update Keywords</Button> */}
                <Button type='link' icon={<LuExternalLink />}>Update {AVAILABLE_LANGUAGES.find((lang) => lang.value == appLanguage).label} Keywords</Button>
              </div>
            </div>
          </div>

          {/* //App rtl */}
          <Saperator />
          <div className={styles.settingsWrap}>
            <div className={styles.settingsDetails}>
              <div className={styles.setting} style={{ borderColor: token.colorBorder, transform: "unset" }}>
                <CheckboxElement label={<TextElement text={'RTL Direction Layout'} color={token.colorTextBase} size="medium" />} active={isRTLDirection} onChange={() => dispatch(toggleRTLDirection(!isRTLDirection))} />
              </div>
            </div>
          </div>

          {/* //Current date in header */}
          <Saperator />
          <div className={styles.settingsWrap}>
            <div className={styles.settingsDetails}>
              <div className={styles.setting} style={{ borderColor: token.colorBorder, transform: "unset" }}>
                <CheckboxElement label={<TextElement text={'Todays date in header'} color={token.colorTextBase} size="medium" />} active={showDateInHeader} onChange={() => dispatch(toggleShowDateInHeader(!showDateInHeader))} />
              </div>
            </div>
          </div>

          {/* //User details in header */}
          <Saperator />
          <div className={styles.settingsWrap}>
            <div className={styles.settingsDetails}>
              <div className={styles.setting} style={{ borderColor: token.colorBorder, transform: "unset" }}>
                <CheckboxElement label={<TextElement text={'Logged in user name in header'} color={token.colorTextBase} size="medium" />} active={showUserInHeader} onChange={() => dispatch(toggleShowUserDetailsInHeader(!showUserInHeader))} />
              </div>
            </div>
          </div>

          {/* //Fullscreen mode */}
          <Saperator />
          <div className={styles.settingsWrap}>
            <div className={styles.settingsDetails}>
              <div className={styles.setting} style={{ borderColor: token.colorBorder, transform: "unset" }}>
                <CheckboxElement label={<TextElement text={`Fullscreen Mode`} color={token.colorTextBase} size="medium" />} active={fullscreenMode} onChange={toggleFullscreen} />
              </div>
            </div>
          </div>

        </div>
        <Saperator />

      </Drawer>
    </>
  );
};

export default AppSettingsPanel;