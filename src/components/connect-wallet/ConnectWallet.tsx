import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import classnames from 'classnames/bind';
import styles from './ConnectWallet.module.scss';
import { setOpenConnectDialog } from './redux/wallet';
import { useAppSelector } from '../../store/hooks';
import { isConnected } from '../../helpers/connectWallet';
import ArrowDown from '../../assets/icon/ArrowDown';
import BscSVG from '../../assets/icon/BscSVG';
import AddContainedSVG from '../../assets/icon/AddContainedSVG';
import useOnClickOutside from '../../helpers/useClickOutside';
const cx = classnames.bind(styles);

const ConnectWallet: React.FC = () => {
  const dispatch = useDispatch();
  const handleOpenConnectWalletDialog = () => {
    dispatch(setOpenConnectDialog(true));
  };
  const wallet = useAppSelector((state) => state.wallet);
  const ref = useRef<any>();
  const [openDropdown, setOpenDropdown] = useState(false);
  const getShortAddress = (address: string) => {
    return address.slice(0, 2) + '...' + address.slice(-4);
  };
  const handleOpenDropdown = () => {
    setOpenDropdown(true);
  };
  const handleCloseDropdown = () => {
      setOpenDropdown(false);
  }
  useOnClickOutside(ref, handleCloseDropdown);
  useEffect(() => {
    handleCloseDropdown();
  }, [wallet]);

  return (
    <>
      {isConnected(wallet) ? (
        <>
          <div className={cx('button')} onClick={handleOpenDropdown}>
            Connected wallet <ArrowDown size={'md'} />
          </div>
          <div className={cx('select', !openDropdown && 'close')} ref={ref}>
            {wallet.ethereumAddress ? (
              <div className={cx('wallet-item')}>
                <BscSVG size={'md'} />
                {getShortAddress(wallet.ethereumAddress)}
              </div>
            ) : null}
            {wallet.trust ? (
                <div className={cx('wallet-item')}>
                    <BscSVG size={'md'} />
                    {getShortAddress(wallet.trust)}
                </div>
            ) : null}
            {wallet.coinbase ? (
                <div className={cx('wallet-item')}>
                    <BscSVG size={'md'} />
                    {getShortAddress(wallet.coinbase)}
                </div>
            ) : null}
            {wallet.walletconnect ? (
                <div className={cx('wallet-item')}>
                    <BscSVG size={'md'} />
                    {getShortAddress(wallet.walletconnect)}
                </div>
            ) : null}
            <div onClick={handleOpenConnectWalletDialog}><AddContainedSVG size={'md'} /> Add wallet</div>
          </div>
        </>
      ) : (
        <div className={cx('button')} onClick={handleOpenConnectWalletDialog}>
          Connect wallet
        </div>
      )}
    </>
  );
};
export default ConnectWallet;
