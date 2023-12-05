import ForgotPasswordPage from '@template/forgotPassword'
import React, { Suspense } from 'react'
import Loading from 'src/app/loading'

function page() {
    return <React.Fragment>
        <Suspense fallback={<Loading page={'Forgot Password'} />}>
            <ForgotPasswordPage />
        </Suspense>
    </React.Fragment>
}

export default page