import WithLayoutProvider from '@providers/withLayoutProvider'
import SalesReport from '@template/reports/salesReport'
import React from 'react'

function SalesReportPage() {
    return (
        <WithLayoutProvider>
            <SalesReport />
        </WithLayoutProvider>
    )
}

export default SalesReportPage