import ComposerComponent from '@organisms/composer/composerComponent';

type pageProps = {
    config: any,
    currentPage: string,
    id: any
}
function NavigationOneComponent(props: pageProps) {
    return (
        <ComposerComponent {...props} />
    )
}

export default NavigationOneComponent