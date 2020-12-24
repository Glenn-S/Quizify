import { BrowserRouter } from 'react-router-dom';
import { AuthStateProvider } from './AuthStateProvider';
import PrimaryLayout from './PrimaryLayout';
import dotenv from 'dotenv';
import { AccountProvider } from './AccountProvider';

const App = () => {
  dotenv.config();

  return (
    <BrowserRouter>
      <AuthStateProvider>
        <AccountProvider>
          <PrimaryLayout />
        </AccountProvider>
      </AuthStateProvider>
    </BrowserRouter>
  );
};

export default App;