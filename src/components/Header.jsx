import LogginSystem from './LogginSystem';
import templl from '../assets/templl.svg';

export default function Header() {
  return (
    <header className='flex justify-between items-center px-4 md:px-6 lg:px-8 py-1'>
      <a href='/'>
        <img className='w-20' src={templl} alt='' />
      </a>
      <LogginSystem />
    </header>
  );
}
