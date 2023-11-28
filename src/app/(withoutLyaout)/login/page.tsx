import LoginPage from '@template/loginPage'
import React, { Suspense } from 'react'

function page() {
    return <React.Fragment>
        {/* <Suspense fallback={<p style={{ height: "100vh", width: "100vw", background: "deeppink", color: "green" }}>Logging out...</p>}> */}
        <LoginPage />
        {/* </Suspense> */}
    </React.Fragment>
}

export default page