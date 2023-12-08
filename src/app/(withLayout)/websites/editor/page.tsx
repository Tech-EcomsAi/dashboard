import WebsiteBuilder from '@template/websiteBuilder'
import React, { Suspense } from 'react'
import Loading from 'src/app/loading'

function page() {
    return (
        <Suspense fallback={<Loading page="Builder page" />}>
            <WebsiteBuilder />
        </Suspense>
    )
}

export default page