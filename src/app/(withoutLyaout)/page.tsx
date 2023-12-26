import GenericDashboard from '@template/genericDashboard'
import { Suspense } from 'react'
import Loading from '../loading'

function page() {
    return (
        <Suspense fallback={<Loading page={"Home"} />}>
            <GenericDashboard />
        </Suspense>
    )
}

export default page