import { useGoogleLogin } from 'react-google-login';
import { useAuthState } from './AuthStateProvider';
import { useAccountState } from './AccountProvider';
import axios from 'axios';

const LoginButton = ({ children, ...rest }) => {
  const { dispatch } = useAuthState();
  const { dispatch:accountDispatch } = useAccountState();

  const onSuccess = (res) => {
    let userId = null;

    // add a new user account entry if one does not exist for this user
    (async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/account/${res.profileObj.googleId}?isGoogleId=true`);
        
        switch (response.data.account.theme) {
          case 'light':
            accountDispatch({ type: 'LIGHT_MODE' });
            break;
          case 'dark':
            accountDispatch({ type: 'DARK_MODE' });
            break;
          default:
            throw Error('The account should have a theme, but did not.');
        }
        userId = response.data.account._id;
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 404) {
          try {
            const createUserResponse = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/account`, { googleId: res.profileObj.googleId, theme: 'light' });
            
            userId = createUserResponse.data.account._id;
          } catch (e) {
            console.log(`Error from post: ${e.response.toString()}`);
          }
        }
      } finally {
        dispatch({ type: 'LOGIN', user: { ...res.profileObj, userId: userId } });
        console.log(`[Login Success] current user: ${res.profileObj.name}`);
      }
    })();
  }

  const onFailure = (res) => console.log(`[Login Failed] reason: ${res.toString()}`);

  const { signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onSuccess,
    onFailure,
    isSignedIn: true,
    accessType: 'offline',
    cookiePolicy: 'single_host_origin'
  });

  const onClick = () => {
    signIn();
  }

  return (
    <span {...rest} onClick={onClick}>{children}</span>
  );
};

export default LoginButton;