import CloseIcon from '@material-ui/icons/Close';
import { ButtonBase, Dialog, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import classnames from 'classnames/bind';
import React from 'react';
import BscSVG from '../../assets/icon/BscSVG';
import CoinBaseSVG from '../../assets/icon/CoinBaseSVG';
import TrustSVG from '../../assets/icon/TrustSVG';
import { MISSING_EXTENSION_ERROR } from '../../constant/uninstallExtentionException';
import { connectMetaMask, connectTrust } from '../../helpers/connectWallet';
import { openSnackbar, SnackbarVariant } from '../../store/snackbar';
import { setEthereumAddress, setOpenConnectDialog, setTrustAddress } from '../connect-wallet/redux/wallet';
import { useAppDispatch, useAppSelector } from './../../store/hooks';
import styles from './ConnectWalletDialog.module.scss';

const cx = classnames.bind(styles);

const ConnectWalletDialog: React.FC = () => {
  const dispatch = useAppDispatch();
  const wallet = useAppSelector((state) => state.wallet);
  const openConnectWalletDialog = useAppSelector(
    (state) => state.wallet.openConnectDialog
  );
  const handleCloseConnectDialog = () => {
    dispatch(setOpenConnectDialog(false));
  };

  // Check network
  const checkNetwork = () => {
    if (!window.ethereum) {
      dispatch(openSnackbar({
        message: 'Your brower are not install Metamask extension, please install it!',
        variant: SnackbarVariant.ERROR
      }))
    }
    const netId = window.ethereum.networkVersion
      ? +window.ethereum.networkVersion
      : +window.ethereum.chainId;
    if (netId) {
      if (netId === 1 || netId === 3) {
        if (netId === 3 && process.env.REACT_APP_ENV === 'prod') {
          dispatch(openSnackbar({
            message: 'You are currently visiting the Ropsten Test Network for Strike Finance. Please change your metamask to access the Ethereum Mainnet.',
            variant: SnackbarVariant.ERROR
          }))
        } else if (netId === 1 && process.env.REACT_APP_ENV === 'dev') {
          dispatch(openSnackbar({
            message: 'You are currently visiting the Main Network for Strike Finance. Please change your metamask to access the Ropsten Test Network.',
            variant: SnackbarVariant.ERROR
          }));
        } 
      } else {
        dispatch(openSnackbar({
          message: 'You are currently connected to another network. Please connect to Ethereum Network',
          variant: SnackbarVariant.ERROR
        }));
      }
    }
  };
  // Connect MetaMask
  const handleConnectMetaMask = async () => {
    try {
      if (wallet.ethereumAddress) {
        dispatch(openSnackbar({
          message: 'Please open MetaMask extension in your browser to change wallet address!',
          variant: SnackbarVariant.ERROR
        }))
      } else {
        checkNetwork();
        const publicKey = await connectMetaMask();
        dispatch(setEthereumAddress(publicKey));
      }
    } catch (e: any) {
      if (e.message === MISSING_EXTENSION_ERROR) {
        dispatch(
          openSnackbar({
            message: 'Extension not install!',
            variant: SnackbarVariant.ERROR,
          })
        );
      }
    }
    handleCloseConnectDialog();
  };

  // Connect Trust
  const handleConnectTrust = async() => {
    const connectedTrust = await connectTrust();
    if (connectedTrust.length > 0) {
      dispatch(setTrustAddress(connectedTrust[0]));
      dispatch(setOpenConnectDialog(false));
    } else {
      dispatch(openSnackbar({
        message: 'Connect to Trust wallet did not success!',
        variant: SnackbarVariant.WARNING
      }))
    }
  }

  return (
    <Dialog
      open={openConnectWalletDialog}
      onClose={handleCloseConnectDialog}
      fullWidth={true}
      maxWidth={'xs'}
      disableEscapeKeyDown={true}
    >
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography component={'div'}>
          <IconButton size={'small'} className={cx('hidden')}>
            <CloseIcon />
          </IconButton>
        </Typography>
        <Typography component={'div'} className={cx('title')}>
          <Box>Connect wallet</Box>
        </Typography>
        <Typography component={'div'}>
          <IconButton
            onClick={handleCloseConnectDialog}
            size={'small'}
            className={cx('close-button')}
          >
            <CloseIcon />
          </IconButton>
        </Typography>
      </Box>

      <ButtonBase
        disableRipple={true}
        className={cx('button')}
        onClick={handleConnectMetaMask}
      >
        <BscSVG size={'xl'} />
        <p>MetaMask</p>
      </ButtonBase>
      <ButtonBase
        disableRipple={true}
        className={cx('button')}
        onClick={handleConnectTrust}
      >
        <TrustSVG size={'xl'} />
        <p>Trust</p>
      </ButtonBase>
      <ButtonBase
        disableRipple={true}
        className={cx('button')}
        // onClick={handleConnectMetaMask}
      >
        <CoinBaseSVG size={'xl'} />
        <p>CoinBase</p>
      </ButtonBase>
      <ButtonBase
        disableRipple={true}
        className={cx('button')}
        // onClick={handleConnectMetaMask}
      >
        <BscSVG size={'xl'} />
        <p>WalletConnect</p>
      </ButtonBase>
    </Dialog>
  );
};
export default ConnectWalletDialog;
