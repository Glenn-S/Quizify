import { useAuthState } from './AuthStateProvider';

const Account = () => {
  const { user } = useAuthState();
  
  return (
    <div className='container'>
      <h1 className='title'>Account Information</h1>
      <div className='card'>
        <div className='card-body d-flex'>
          <img src={user.imageUrl} alt='' className='p-3' />
          <div className='p-2'>
            <h4 className='card-title'>{user.user}</h4>
            <p className='card-text'>{user.email}</p>
            <p className='card-text'>{user.id}</p>
          </div>
        </div>
      </div>

      <h1 className='title'>Settings</h1>
      <p>Stay Tuned</p>
    </div>
  );
};

export default Account;