import { DEFAULT_DARK_COLOR, DEFAULT_LIGHT_COLOR } from "@constant/common";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "@reduxStore/index";

export type ClientThemeConfigType = {
    darkMode: boolean;
    lightColor: string;
    darkColor: string;
    collapsedSidebar: boolean;
    showSettingsPanel: boolean;
    sidebarBgColor: string,
    sidebarColor: string,
    stickyHeader: boolean,
    headerBgBlur: boolean,
    isRTLDirection: boolean,
    language: string
}

const initialState: ClientThemeConfigType = {
    darkMode: true,
    lightColor: DEFAULT_LIGHT_COLOR,
    darkColor: DEFAULT_DARK_COLOR,
    collapsedSidebar: true,
    showSettingsPanel: false,
    sidebarBgColor: '',
    sidebarColor: "",
    stickyHeader: true,
    headerBgBlur: false,
    isRTLDirection: false,
    language: "en"
}

export const clientThemeConfig = createSlice({
    name: "clientThemeConfig",
    initialState,
    reducers: {
        toggleDarkMode(state, action) {
            state.darkMode = action.payload;
        },
        updateLightThemeColor(state, action) {
            state.lightColor = action.payload;
        },
        updateDarkThemeColor(state, action) {
            state.darkColor = action.payload;
        },
        updateSidebarBgColor(state, action) {
            state.sidebarBgColor = action.payload;
        },
        updateSidebarColor(state, action) {
            state.sidebarColor = action.payload;
        },
        toggleSidbar(state, action) {
            state.collapsedSidebar = action.payload;
        },
        toggleHeaderPosition(state, action) {
            state.stickyHeader = action.payload;
        },
        toggleHeaderBgBlur(state, action) {
            state.headerBgBlur = action.payload;
        },
        toggleAppSettingsPanel(state, action) {
            state.showSettingsPanel = action.payload;
        },
        toggleRTLDirection(state, action) {
            state.isRTLDirection = action.payload;
        },
        updateAppLanguage(state, action) {
            state.language = action.payload;
        },
    }
});

const { toggleDarkMode, updateLightThemeColor, updateDarkThemeColor, toggleSidbar, toggleAppSettingsPanel, updateSidebarBgColor, updateSidebarColor, toggleHeaderPosition, toggleHeaderBgBlur, toggleRTLDirection, updateAppLanguage } = clientThemeConfig.actions;
const getDarkModeState = (state: AppState) => state.clientThemeConfig?.darkMode;
const getLightColorState = (state: AppState) => state.clientThemeConfig?.lightColor;
const getDarkColorState = (state: AppState) => state.clientThemeConfig?.darkColor;
const getSidebarState = (state: AppState) => state.clientThemeConfig?.collapsedSidebar;
const getSidebarBgColorState = (state: AppState) => state.clientThemeConfig?.sidebarBgColor;
const getSidebarColorState = (state: AppState) => state.clientThemeConfig?.sidebarColor;
const getAppSettingsPanelStatus = (state: AppState) => state.clientThemeConfig?.showSettingsPanel;
const getHeaderPositionState = (state: AppState) => state.clientThemeConfig?.stickyHeader;
const getHeaderBgBlurState = (state: AppState) => state.clientThemeConfig?.headerBgBlur;
const getRTLDirectionState = (state: AppState) => state.clientThemeConfig?.isRTLDirection;
const getAppLanguageState = (state: AppState) => state.clientThemeConfig?.language;

export {
    toggleDarkMode, updateLightThemeColor, updateDarkThemeColor, toggleSidbar, toggleAppSettingsPanel, updateSidebarBgColor, updateSidebarColor, toggleHeaderPosition, toggleHeaderBgBlur, toggleRTLDirection, updateAppLanguage,
    getDarkModeState, getLightColorState, getDarkColorState, getSidebarState, getAppSettingsPanelStatus, getSidebarBgColorState, getSidebarColorState, getHeaderPositionState, getHeaderBgBlurState, getRTLDirectionState, getAppLanguageState
}