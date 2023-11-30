import { DEFAULT_DARK_COLOR, DEFAULT_LIGHT_COLOR } from "@constant/common";
import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "@reduxStore/index";
import { ReactNode } from "react";

export type BreadcrumbType = { key: number, value: string, label: string | ReactNode, onClick: any, subPaths: BreadcrumbSubpathsType[] }
export type BreadcrumbSubpathsType = { key: number, value: string, label: string | ReactNode, onClick: any, active: boolean }

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
    language: string,
    breadCrumbs: BreadcrumbType[],
    showDateInHeader: boolean,
    showUserDetailsInHeader: boolean,
    fullscreenMode: boolean,
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
    language: "en",
    breadCrumbs: [],
    showDateInHeader: false,
    showUserDetailsInHeader: false,
    fullscreenMode: false
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
        updateBreadcrumbs(state, action) {
            state.breadCrumbs = action.payload;
        },
        toggleShowDateInHeader(state, action) {
            state.showDateInHeader = action.payload;
        },
        toggleShowUserDetailsInHeader(state, action) {
            state.showUserDetailsInHeader = action.payload;
        },
        toggleFullscreenMode(state, action) {
            state.fullscreenMode = action.payload;
        },
    }
});

const { toggleDarkMode, updateLightThemeColor, updateDarkThemeColor, toggleSidbar, toggleAppSettingsPanel, updateSidebarBgColor, updateSidebarColor, toggleHeaderPosition, toggleHeaderBgBlur, toggleRTLDirection, updateAppLanguage, updateBreadcrumbs, toggleShowDateInHeader, toggleShowUserDetailsInHeader, toggleFullscreenMode } = clientThemeConfig.actions;
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
const getAppBreadcrumbsState = (state: AppState) => state.clientThemeConfig?.breadCrumbs;
const getShowDateInHeaderState = (state: AppState) => state.clientThemeConfig?.showDateInHeader;
const getShowUserDetailsInHeaderState = (state: AppState) => state.clientThemeConfig?.showUserDetailsInHeader;
const getFullscreenModeState = (state: AppState) => state.clientThemeConfig?.fullscreenMode;

export {
    toggleDarkMode, updateLightThemeColor, updateDarkThemeColor, toggleSidbar, toggleAppSettingsPanel, updateSidebarBgColor, updateSidebarColor, toggleHeaderPosition, toggleHeaderBgBlur, toggleRTLDirection, updateAppLanguage, updateBreadcrumbs, toggleShowDateInHeader, toggleShowUserDetailsInHeader, toggleFullscreenMode,
    getDarkModeState, getLightColorState, getDarkColorState, getSidebarState, getAppSettingsPanelStatus, getSidebarBgColorState, getSidebarColorState, getHeaderPositionState, getHeaderBgBlurState, getRTLDirectionState, getAppLanguageState, getAppBreadcrumbsState, getShowDateInHeaderState, getShowUserDetailsInHeaderState, getFullscreenModeState
}