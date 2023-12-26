import AnimatedVerticalLogo from '@atoms/animatedVerticalLogo';
import { useAppSelector } from '@hook/useAppSelector';
import { getLoaderState } from '@reduxSlices/loader';
import { theme } from 'antd';
import { useEffect } from 'react';
import Style from './loader.module.scss';

function Loader() {
    const { token } = theme.useToken();
    const loading = useAppSelector(getLoaderState);

    useEffect(() => {
        console.log("loading", loading)
    }, [loading])

    return (
        <>
            {loading ? <div className={Style.loaderbody} style={{ background: token.colorBgMask }}>
                <AnimatedVerticalLogo showLabel={false} />
            </div> : null}
        </>
    )
}

export default Loader;
