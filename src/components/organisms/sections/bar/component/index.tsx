import ComposerComponent from '@organisms/composer/composerComponent';
import React from 'react'

type pageProps = {
    config: any,
    currentPage: string,
    parentId: any
}
function Bar(props: pageProps) {
    return (
        <ComposerComponent {...props} />
    )
}

export default Bar