import { BrowserRouter } from 'react-router-dom';
import { AuthStateProvider } from './AuthStateProvider';
import PrimaryLayout from './PrimaryLayout';
import dotenv from 'dotenv';

const App = () => {
  dotenv.config();

  return (
    <BrowserRouter>
      <AuthStateProvider>
        <PrimaryLayout />
      </AuthStateProvider>
    </BrowserRouter>
  );
};

export default App;