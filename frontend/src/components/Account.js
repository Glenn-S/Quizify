import { useEffect, useState } from 'react';
import { useAuthState } from './AuthStateProvider';
import { useAccountState } from './AccountProvider';
import ToggleSwitch from './ToggleSwitch';

const Account = () => {
  const { user } = useAuthState();
  const { theme, dispatch } = useAccountState();
  const [isDarkMode, setIsDarkMode] = useState(theme !== 'light' ? true : false);

  useEffect(() => {
    let isCurrent = true; 
    
    if (isCurrent) {
      if (isDarkMode) {
        dispatch({ type: 'DARK_MODE' });
      } else {
        dispatch({ type: 'LIGHT_MODE' });
      }
    }

    return () => isCurrent = false;
  }, [dispatch, isDarkMode]);
  
  return (
    <div className='container'>
      <h1 className='title'>Account Information</h1>
      <div className='card'>
        <div className={`card-body d-flex ${theme}`}>
          <img src={user.imageUrl} alt='' className='p-3' />
          <div className='p-2'>
            <h4 className='card-title'>{user.name}</h4>
            <p className='card-text'>{user.email}</p>
            <p className='card-text'>{user.googleId}</p>
          </div>
        </div>
      </div>

      <h1 className='title'>Settings</h1>
      <div className='form-control'>
        <ToggleSwitch labelText='Dark mode' checked={isDarkMode} onChange={() => setIsDarkMode((prev) => !prev)} />
      </div>
    </div>
  );
};

export default Account;