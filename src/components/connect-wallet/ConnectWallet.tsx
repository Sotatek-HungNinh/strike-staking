import React from "react";
import { useDispatch } from 'react-redux';
import classnames from 'classnames/bind';
import styles from './ConnectWallet.module.scss';
import { setOpenConnectDialog } from "./redux/wallet";
const cx = classnames.bind(styles);

const ConnectWallet: React.FC = () => {
    const dispatch = useDispatch();
    const handleOpenConnectWalletDialog = () => {
        dispatch(setOpenConnectDialog(true));
    }

    return (
        <>
        <div className={cx('button-connect-wallet')} onClick={handleOpenConnectWalletDialog}>Connect wallet</div>
        </>
    )
}
export default ConnectWallet;