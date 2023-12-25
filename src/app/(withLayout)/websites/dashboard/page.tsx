import WithLayoutProvider from '@providers/withLayoutProvider'
import WebsiteBuilderDashboard from '@template/websiteBuilderDashboard'
import React, { Suspense } from 'react'
import Loading from 'src/app/loading'

function page() {
    return (
        <React.Fragment>
            <Suspense fallback={<Loading page="Builder Dashboard" />}>
                <WithLayoutProvider>
                    <WebsiteBuilderDashboard />
                </WithLayoutProvider>
            </Suspense>
        </React.Fragment>
    )
}

export default page