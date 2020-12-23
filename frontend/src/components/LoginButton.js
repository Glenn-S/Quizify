import { useGoogleLogin } from 'react-google-login';
import { useAuthState } from './AuthStateProvider';
import { getCookies, setCookies } from './cookies';
// import { refreshTokenSetup } from './refreshToken'; 

const LoginButton = ({ children, ...rest }) => {
  const { dispatch } = useAuthState();

  const onSuccess = (res) => {
    const profile = res.profileObj;
    
    // create a cookie
    setCookies(profile);
    const user = getCookies();

    // refreshTokenSetup(res);
    dispatch({ type: 'LOGIN', user });

    console.log(`[Login Success] current user: ${profile.name}`);
  };

  const onFailure = (res) => {
    console.log(`[Login Failed] reason: ${res.toString()}`);
  };

  const { signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onSuccess,
    onFailure,
    isSignedIn: true,
    accessType: 'offline',
    cookiePolicy: 'single_host_origin'
  });

  return (
    <span {...rest} onClick={signIn}>{children}</span>
  );
};

export default LoginButton;