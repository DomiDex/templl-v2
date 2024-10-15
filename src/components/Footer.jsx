import templlLogo from '../assets/templl-light.svg';
import xIcon from '../assets/x-icon.svg';
import linkedinIcon from '../assets/linkedin-icon.svg';

export default function Footer() {
  return (
    <footer className='bg-darkPurple px-4 py-8  sm:px-8 md:px-16 md:pt-24 md:pb-8'>
      <div className='container-xl lg:container mx-auto'>
        <div className='flex flex-col justify-between items-center'>
          <img className='mb-8' src={templlLogo} alt='templl' />
          <div className='flex flex-col md:flex-row justify-center items-center gap-6 mb-6 '>
            <a
              href='/'
              className='text-lightGray text-xl hover:scale-105 transition-all duration-300'
            >
              Webflow Templates
            </a>
            <div className='h-[1px] w-3 bg-lightGray hidden md:block '></div>
            <a
              href='/about'
              className='text-lightGray text-xl hover:scale-105 transition-all duration-300'
            >
              About Me
            </a>
            <div className='h-[1px] w-3 bg-lightGray hidden md:block'></div>
            <a
              href='mailto:domidex01@gmail.com'
              className='text-lightGray text-xl hover:scale-105 transition-all duration-300'
            >
              Contact Me
            </a>
          </div>
          <div className='flex flex-row justify-center items-center gap-6 mb-12'>
            <a
              href='https://x.com/domidexdesign'
              className='text-lightGray text-xl hover:scale-110 transition-all duration-300'
            >
              <img src={xIcon} alt='Link to my X profile' />
            </a>
            <a
              href='https://www.linkedin.com/in/dominique-degottex-08420778/'
              className='text-lightGray text-xl hover:scale-110 transition-all duration-300'
            >
              <img src={linkedinIcon} alt='Link to my LinkedIn profile' />
            </a>
          </div>
          <div className='bg-lightGray w-full h-[0.5px] mb-6'></div>
          <div className='w-full flex flex-col md:flex-row justify-between items-center gap-6'>
            <p className='text-lightGray text-xs'>
              © 2024 Templl | All rights reserved
            </p>
            <div className='flex flex-row justify-center items-center gap-4'>
              <a href='/privacy' className='text-lightGray text-xs'>
                Privacy Policy
              </a>
              <a href='/terms' className='text-lightGray text-xs'>
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
