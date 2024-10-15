export default function LogginSystem() {
  return (
    <div className=' bg-darkerGray flex flex-row items-center p-1 rounded-lg'>
      <a href='/login' className='text-lg px-6 py-2'>
        Login
      </a>
      <a
        href='/sign-up'
        className='text-lg text-lightGray px-6 py-2 bg-purple rounded-md hover:bg-lightPurple transition-colors duration-200'
      >
        Submit Here
      </a>
    </div>
  );
}
