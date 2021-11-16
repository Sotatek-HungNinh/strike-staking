import React from 'react';
import ConnectWalletDialog from './components/connect-wallet-dialog/ConnectWalletDialog';
import Header from './components/header/Header';
import CustomSnackbar from './components/snackbar/Snackbar';
import './_app.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="Snackbar">
        <CustomSnackbar />
      </div>
      <Header name="hung"/>
      <ConnectWalletDialog/>
    </div>
  );
}

export default App;
