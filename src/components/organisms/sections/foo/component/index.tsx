'use client'
import React from 'react'
import ComposerComponent from '@organisms/composer/composerComponent';

type pageProps = {
    config: any,
    currentPage: string,
    parentId: any
}
function Foo(props: pageProps) {
    return (
        <ComposerComponent {...props} />
    )
}

export default Foo;