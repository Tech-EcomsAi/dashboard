import React from 'react'
import NotFound from './404/page'
// import { translator } from 'public/dictionaries'

async function page() {
    // const t = translator('en');
    // console.log("tttttt", t.aboutContent)
    return (
        <>
            <NotFound />
        </>
    )
}

export default page