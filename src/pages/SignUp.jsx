import { useState, useCallback } from 'react';
import coolText from '../assets/cool-text.webp';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrorMessage(''); // Clear error message on input change
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match!');
    } else {
      // Proceed with signup logic (e.g., send data to server)
      console.log('Signup successful!', formData);
      // Reset form and error message
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setErrorMessage('');
    }
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
              <h2 className='text-2xl font-bold text-darkPurple mb-4'>
                Sign Up
              </h2>
              <div>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium text-darkPurple mb-1'
                >
                  Username
                </label>
                <input
                  type='text'
                  id='username'
                  name='username'
                  value={formData.username}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 bg-white border border-darkGray rounded-md focus:outline-none focus:ring-1 focus:ring-darkPurple'
                  placeholder='Enter your email'
                  required
                />
              </div>
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
                  value={formData.email}
                  onChange={handleInputChange}
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
                  value={formData.password}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 bg-white border border-darkGray rounded-md focus:outline-none focus:ring-1 focus:ring-darkPurple'
                  placeholder='Enter your password'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='confirmPassword'
                  className='block text-sm font-medium text-darkPurple mb-1'
                >
                  Confirm Password
                </label>
                <input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 bg-white border border-darkGray rounded-md focus:outline-none focus:ring-1 focus:ring-darkPurple'
                  placeholder='Confirm your password'
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
              >
                Sign Up
              </button>
              <p className='text-sm text-center text-darkPurple'>
                Already have an account?{' '}
                <a
                  href='/login'
                  className='text-purple-600 hover:text-purple-500'
                >
                  Log in
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
