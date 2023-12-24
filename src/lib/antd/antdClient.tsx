"use client";
import React from "react";
import { ConfigProvider } from "antd";
import { theme } from 'antd';
import { useAppSelector } from "@hook/useAppSelector";
import { getDarkColorState, getDarkModeState, getLightColorState } from '@reduxSlices/clientThemeConfig';
import { Inter } from "next/font/google";

export const INTER_FONT = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

const AntdClient = ({ children }: any) => {
    const isDarkMode = useAppSelector(getDarkModeState)
    const lightThemeColor = useAppSelector(getLightColorState)
    const darkThemeColor = useAppSelector(getDarkColorState)
    const { token } = theme.useToken();
    console.log(`
  ᴾʳᵉˢᵉⁿᵗⁱⁿᵍ ʸᵒᵘ...
                 🇪‌🇨‌🇴‌🇲‌🇸‌🇦‌🇮‌          
    💜  🇹‌🇭‌🇪‌ 🇪‌🇻‌🇪‌🇷‌🇾‌🇹‌🇭‌🇮‌🇳‌🇬‌ 🇦‌🇵‌🇵‌  💜   
  `)

    return (
        <>
            <ConfigProvider
                // direction="rtl"
                theme={{
                    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                    token: {
                        // colorPrimary: '#3bceac',
                        colorPrimary: isDarkMode ? darkThemeColor : lightThemeColor,
                        borderRadius: 5,
                        wireframe: false,
                        fontSize: 13
                    },
                    components: {
                        Menu: {
                            itemSelectedBg: token.colorPrimaryBg
                        },
                        Tooltip: {
                            paddingXS: 14
                        },
                        Segmented: {
                            fontSize: 12,
                            fontSizeLG: 13,
                            controlHeightSM: 28,
                            borderRadiusXS: 4,
                            controlPaddingHorizontalSM: 10
                        },
                        Button: {
                            contentFontSize: 13
                        },
                        Drawer: {
                            padding: 10,
                            paddingLG: 15
                        },
                        Collapse: {
                            // headerBg: token.colorBgLayout
                        },
                        Typography: {
                            fontFamilyCode: INTER_FONT.style.fontFamily
                        }
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