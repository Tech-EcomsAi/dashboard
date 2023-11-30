import LoginPage from '@template/loginPage'
import React, { Suspense } from 'react'
import Loading from 'src/app/loading'

function page() {
    return <React.Fragment>
        <Suspense fallback={<Loading page={'Login'} />}>
            <LoginPage />
        </Suspense>
    </React.Fragment>
}

export default page