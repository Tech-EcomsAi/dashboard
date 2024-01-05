import ComposerComponent from '@organisms/composer/composerComponent';

type pageProps = {
    config: any,
    currentPage: string,
    parentId: any
}
function NavigationOneComponent(props: pageProps) {
    return (
        <ComposerComponent {...props} />
    )
}

export default NavigationOneComponent