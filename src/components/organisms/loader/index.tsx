import React from 'react'
import { useAppSelector } from '@hook/useAppSelector';
import Style from '@styles/components/organisms/loader/loader.module.scss';
import { Spin, Alert } from 'antd';
import { getLoaderState } from '@reduxSlices/loader';
function Loader() {
    const loading = useAppSelector(getLoaderState);
    return (
        <>
            {loading ? <div className={Style.loaderbody}>
                {/* <Spin tip="Loading...">
                    <Alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                        type="info"
                    />
                </Spin> */}
                <div className={Style.spinner}>
                    <div className={Style.bounce1}></div>
                    <div className={Style.bounce2}></div>
                    <div className={Style.bounce3}></div>
                </div>
            </div> : null}
        </>
    )
}

export default Loader;
