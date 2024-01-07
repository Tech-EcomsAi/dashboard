'use client'
import ComposerComponent from '@organisms/composer/composerComponent';

type pageProps = {
    config: any,
    currentPage: string,
    id: any
}
function Foo(props: pageProps) {
    return (
        <ComposerComponent {...props} />
    )
}

export default Foo;