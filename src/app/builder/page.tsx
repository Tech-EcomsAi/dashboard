import WebsiteBuilder from '@template/websiteBuilder'
import React, { Suspense } from 'react'

function page() {
    return (
        <React.Fragment>
            <Suspense fallback={<p style={{ height: "100vh", width: "100vw", background: "red", color: "green" }}>Loading Builder...</p>}>
                <WebsiteBuilder />
            </Suspense>
        </React.Fragment>
    )
}

export default page