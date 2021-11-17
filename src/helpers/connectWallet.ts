import { WalletData } from './../interfaces/WalletData';
import Web3 from 'web3';
import {
    MISSING_EXTENSION_ERROR, SoftwareWalletType, UninstallExtensionException
} from './../constant/uninstallExtentionException';
import WalletConnect from "@walletconnect/client";

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

// Connect Trust wallet
export const connectTrust = () => {
  const connector = new WalletConnect({bridge: `${process.env.REACT_APP_TRUST_BRIDGE}`});
  let accounts;
  if (!connector.connected) {
    // create new session
    connector.createSession();
  }
  connector.on("connect", (error, payload) => {
    if (error) {
      console.log('CONNECT TRUST ERROR: ', error);
      const exception: UninstallExtensionException = {
        walletType: SoftwareWalletType.TRUST,
        message: MISSING_EXTENSION_ERROR,
      };
      throw exception;
    }
    // Get provided accounts and chainId
    accounts = payload.params[0].accounts;
    console.log('SERVICE: ', payload.params[0]);
  });
  return accounts;
}

export const isConnected = (wallet: WalletData): boolean => {
  return !!(wallet.bsc || wallet.ethereumAddress);
}
