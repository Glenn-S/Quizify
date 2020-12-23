import { Link } from 'react-router-dom';
import { useAuthState } from './AuthStateProvider';
import AuthenticatedLink from './AuthenticatedLink';
import LogoutButton from './LogoutButton';

const PrimaryHeader = () => {
  const { authenticated } = useAuthState();

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">Quizify</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav ml-auto">
            <Link to='/home' className='nav-item ml-sm-2 mr-sm-2' children={'Home'} />
            <Link to='/about' className='nav-item ml-sm-2 mr-sm-2' children={'About'} />
            <AuthenticatedLink condition={authenticated} to='/account' className='nav-item ml-sm-2 mr-sm-2' children={'Account'} />
            <AuthenticatedLink condition={authenticated} to='/quizzes' className='nav-item ml-sm-2 mr-sm-2' children={'Quizzes'} />
            <AuthenticatedLink condition={!authenticated} to='/login' className='nav-item ml-sm-2 mr-sm-2' children={'Login'} />
            <AuthenticatedLink condition={authenticated} to='/logout' className='nav-item ml-sm-2 mr-sm-2'>
              <LogoutButton>Logout</LogoutButton>
            </AuthenticatedLink>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default PrimaryHeader;