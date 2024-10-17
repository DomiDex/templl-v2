import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LogginSystem() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className='bg-darkerGray flex flex-row items-center p-1 rounded-lg'>
      {user ? (
        <>
          <button onClick={handleLogout} className='text-lg px-6 py-2'>
            Logout
          </button>
          <a
            href='/account'
            className='text-lg text-lightGray px-6 py-2 bg-purple rounded-md hover:bg-lightPurple transition-colors duration-200'
          >
            Account
          </a>
        </>
      ) : (
        <>
          <a href='/login' className='text-lg px-6 py-2'>
            Login
          </a>
          <a
            href='/sign-up'
            className='text-lg text-lightGray px-6 py-2 bg-purple rounded-md hover:bg-lightPurple transition-colors duration-200'
          >
            Submit Here
          </a>
        </>
      )}
    </div>
  );
}
