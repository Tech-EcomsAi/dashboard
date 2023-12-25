import WithLayoutProvider from '@providers/withLayoutProvider'
import LoggedInUserProfile from '@template/loggedInUserProfile'
import React from 'react'

function page() {
    return (
        <WithLayoutProvider>
            <LoggedInUserProfile />
        </WithLayoutProvider>
    )
}

export default page