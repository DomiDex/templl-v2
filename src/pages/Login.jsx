import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import coolText from '../assets/cool-text.webp';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/account');
    } catch (error) {
      setErrorMessage('Failed to log in: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <main>
      <section className='bg-darkGray'>
        <div className='h-screen container-xl lg:container mx-auto flex flex-col lg:flex-row items-between justify-center'>
          <div className='hidden md:flex md:w-2/3 bg-darkGray flex-col items-center justify-center'>
            <img className='w-96' src={coolText} alt='cool-text' />
          </div>
          <div className='w-full h-screen md:w-1/3 bg-lightGray flex items-center justify-center'>
            <form
              className='flex flex-col space-y-4 p-8 w-full max-w-md'
              onSubmit={handleSubmit}
              autoComplete='off'
            >
              <h2 className='text-2xl font-bold text-darkPurple mb-4'>Login</h2>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-darkPurple mb-1'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full px-3 py-2 bg-white border border-darkGray rounded-md focus:outline-none focus:ring-1 focus:ring-darkPurple'
                  placeholder='Enter your email'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-darkPurple mb-1'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full px-3 py-2 bg-white  border border-darkGray rounded-md focus:outline-none focus:ring-1 focus:ring-darkPurple'
                  placeholder='Enter your password'
                  required
                />
              </div>
              {errorMessage && (
                <p className='text-red-500 text-sm font-medium'>
                  {errorMessage}
                </p>
              )}
              <button
                type='submit'
                className='w-full bg-purple text-white py-2 px-4 rounded-md hover:bg-lightPurple transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
              <p className='text-sm text-center text-darkPurple'>
                Don't have an account?{' '}
                <a
                  href='/sign-up'
                  className='text-purple-600 hover:text-purple-500'
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
