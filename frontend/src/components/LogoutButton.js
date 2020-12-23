import { useGoogleLogout } from 'react-google-login';
import { useAuthState } from './AuthStateProvider';

const LogoutButton = ({ component:Component, children, ...rest }) => {
  const { dispatch } = useAuthState()

  const onLogoutSuccess = (res) => {
    dispatch({ type: 'LOGOUT' });
    console.log('Logged out successfully');
  };

  const onFailure = () => {
    // TODO take care of the failure case
    console.log('Handle failure case');
  };

  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onLogoutSuccess,
    onFailure
  });

  return (
    <span {...rest} onClick={signOut}>{children}</span>
  )
};

export default LogoutButton;