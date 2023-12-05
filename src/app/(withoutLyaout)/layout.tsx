import Toast from '@organisms/toast'
import AntdThemeProvider from '@providers/antdThemeProvider'
import NoSSRProvider from '@providers/noSSRProvider'
import React, { Fragment } from 'react'

function WithoutLayout({ children }) {
    console.log("Inside without layout")
    return <NoSSRProvider>
        <AntdThemeProvider>
            <Toast />
            {children}
        </AntdThemeProvider>
    </NoSSRProvider>
}

export default WithoutLayout