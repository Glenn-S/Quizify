import LoginButton from './LoginButton'

const Login = () => {
  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-center'>
        <div className='card'>
          <div className='card-body'>
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