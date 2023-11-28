import React, { Fragment } from 'react'

function WithoutLayout({ children }) {
    console.log("Inside without layout")
    return <Fragment>{children}</Fragment>
}

export default WithoutLayout