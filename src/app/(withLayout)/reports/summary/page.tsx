import WithLayoutProvider from '@providers/withLayoutProvider'
import React from 'react'

function ReportsSummary() {
    return (
        <WithLayoutProvider>
            <div style={{ color: "yellow" }}>ReportsSummary</div>
        </WithLayoutProvider>
    )
}

export default ReportsSummary