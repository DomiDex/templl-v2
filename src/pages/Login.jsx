import coolText from '../assets/cool-text.webp';

export default function Login() {
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
                  className='w-full px-3 py-2 bg-white  border border-darkGray rounded-md focus:outline-none focus:ring-1 focus:ring-darkPurple'
                  placeholder='Enter your password'
                  required
                />
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    type='checkbox'
                    id='remember'
                    name='remember'
                    className='h-4 w-4 text-darkPurple focus:ring-darkPurple border-gray-300 rounded'
                  />
                  <label
                    htmlFor='remember'
                    className='ml-2 block text-sm text-darkPurple'
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href='#'
                  className='text-sm text-purple-600 hover:text-purple-500'
                >
                  Forgot password?
                </a>
              </div>
              <button
                type='submit'
                className='w-full bg-purple text-white py-2 px-4 rounded-md hover:bg-lightPurple transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
