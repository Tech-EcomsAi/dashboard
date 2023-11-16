"use client";
import React from "react";
import { ConfigProvider } from "antd";
import { theme } from 'antd';
import { useAppSelector } from "@hook/useAppSelector";
import { getDarkColorState, getDarkModeState, getLightColorState } from '@reduxSlices/clientThemeConfig';

const AntdClient = ({ children }: any) => {
    const isDarkMode = useAppSelector(getDarkModeState)
    const lightThemeColor = useAppSelector(getLightColorState)
    const darkThemeColor = useAppSelector(getDarkColorState)
    const { token } = theme.useToken();
    return (
        <>
            <ConfigProvider
                theme={{
                    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                    token: {
                        // colorPrimary: '#3bceac',
                        colorPrimary: isDarkMode ? darkThemeColor : lightThemeColor,
                        borderRadius: 5,
                        wireframe: false
                    },
                    components: {
                        Menu: {
                            itemSelectedBg: token.colorPrimaryBg
                        },
                    },
                }}
            >
                <ConfigProvider
                    theme={{
                        token: {
                            borderRadius: 4,
                        }
                    }}
                >
                    {children}
                </ConfigProvider>
            </ConfigProvider>
        </>
    )
}

export default AntdClient;