import AntdThemeProvider from '@providers/antdThemeProvider'
import React, { Fragment } from 'react'

function WithoutLayout({ children }) {
    console.log("Inside without layout")
    return <Fragment>
        <AntdThemeProvider>
            {children}
        </AntdThemeProvider>
    </Fragment>
}

export default WithoutLayout