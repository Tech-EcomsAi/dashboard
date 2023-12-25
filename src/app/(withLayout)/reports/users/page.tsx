import WithLayoutProvider from '@providers/withLayoutProvider'
import React from 'react'

function UsersReport() {
    return (
        <WithLayoutProvider>
            <div style={{ color: "pink" }}>UsersReport</div>
        </WithLayoutProvider>
    )
}

export default UsersReport