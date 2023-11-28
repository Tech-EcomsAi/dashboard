import WebsiteBuilder from '@template/websiteBuilder'
import React, { Suspense } from 'react'
import Loading from 'src/app/loading'

function page() {
    return (
        <React.Fragment>
            <Suspense fallback={<Loading page="withlayout page" />}>
                <WebsiteBuilder />
            </Suspense>
        </React.Fragment>
    )
}

export default page