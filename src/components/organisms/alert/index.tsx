'use client'
import { useAppDispatch } from '@hook/useAppDispatch';
import { useAppSelector } from '@hook/useAppSelector';
import { clearAlert, getAlertState } from '@reduxSlices/alert';
import { Space, Alert } from 'antd';
import React, { useEffect, useState, SyntheticEvent, MouseEvent } from 'react';
import Style from "@organismsCSS/alert/alert.module.scss";

function AlertNotification() {

    const alert = useAppSelector(getAlertState);
    const [displayAlert, setDisplayAlert] = useState(false);
    const dispatch = useAppDispatch();

    const handleClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(clearAlert(null));
        setDisplayAlert(false);
    };

    useEffect(() => {
        if (alert?.type && !displayAlert) {
            setDisplayAlert(true);
            setTimeout(() => {
                setDisplayAlert(false);
                dispatch(clearAlert(null));
            }, alert?.time)
        }
    }, [alert])

    return (
        <>
            {displayAlert && alert?.message ? <div className={Style.alertWrap}>
                {/* <Snackbar open={displayAlert}
                    className={alert?.type}
                    autoHideDuration={alert?.duration}
                    TransitionComponent={TransitionRightToLeft}
                    // message={alert?.message}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    key='topright'
                >
                    <Alert
                        // onClose={handleClose}
                        severity={alert?.type}
                    // action={
                    //     <IconButton
                    //         aria-label="close"
                    //         color="inherit"
                    //         size="small"
                    //         onClick={() => {
                    //             setDisplayAlert(false);
                    //         }}
                    //     >
                    // <SvgIcon icon="closeLarge" />
                    //     </IconButton>
                    // }
                    >{alert?.message}</Alert>
                </Snackbar> */}

                <Space direction="vertical" style={{ width: '100%' }}>
                    {alert?.title ?
                        <Alert
                            message={alert?.title}
                            type={alert?.type}
                            description={alert?.message}
                            closable
                            afterClose={() => setDisplayAlert(false)}
                            showIcon
                        /> :
                        <Alert
                            message={alert?.message}
                            type={alert?.type}
                            closable
                            afterClose={() => setDisplayAlert(false)}
                            showIcon />}
                </Space>
            </div> : null}
        </>
    )
}

export default AlertNotification;
