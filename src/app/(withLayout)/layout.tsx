import AntdLayoutWrapper from '@antdComponent/layoutWrapper'
import { NAVIGARIONS_ROUTINGS } from '@constant/navigations'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const WithLayout = async ({ children }) => {


    console.log("Inside with layout")
    //if user not authenticated then redirect to login page
    const session = await getServerSession()
    if (!session?.user) {
        redirect(`/${NAVIGARIONS_ROUTINGS.SIGNIN}`);
    }

    return (
        // <Loading page="withlayout" />
        <AntdLayoutWrapper>
            {children}
        </AntdLayoutWrapper>
    )
}

export default WithLayout