import LoginButton from './LoginButton'
import { useAccountState } from './AccountProvider';

const Login = () => {
  const { theme } = useAccountState();

  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-center'>
        <div className='card'>
          <div className={`card-body ${theme}`}>
            <h4 className='card-title mb-4 mt-1 d-flex justify-content-center'>Sign in</h4>
            <LoginButton className='btn btn-block btn-danger'>
              <i className="fab fa-google"></i> Login via Google
            </LoginButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;