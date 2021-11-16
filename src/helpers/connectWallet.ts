import Web3 from 'web3';
import {
    MISSING_EXTENSION_ERROR, SoftwareWalletType, UninstallExtensionException
} from './../constant/uninstallExtentionException';

declare global {
  interface Window {
    ethereum?: any;
    web3?: any;
  }
}

// CONNECT METAMASK
export const connectMetaMask = async (): Promise<string> => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    return accounts[0];
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    const accounts = window.web3.eth.getAccounts();
    return accounts[0];
  } else {
    const exception: UninstallExtensionException = {
      walletType: SoftwareWalletType.METAMASK,
      message: MISSING_EXTENSION_ERROR,
    };
    throw exception;
  }
};
