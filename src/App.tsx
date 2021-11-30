import React from 'react';
import AreaChart from './components/chart/AreaChart';
import ConnectWalletDialog from './components/connect-wallet-dialog/ConnectWalletDialog';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import CustomSnackbar from './components/snackbar/Snackbar';
import './_app.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="Snackbar">
        <CustomSnackbar />
      </div>
      <Header name="hung" />
      <div className="area-chart-main">
        <AreaChart />
      </div>
      <div className="footer">
        <Footer />
      </div>
      <ConnectWalletDialog />
    </div>
  );
};

export default App;
