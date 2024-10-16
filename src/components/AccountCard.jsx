import template from '../assets/thumbnail-1@2x.png';
export default function TemplateCard() {
  return (
    <button className='relative overflow-hidden bg-darkerGray hover:bg-hoverGray transition-colors duration-200 group rounded-lg p-2'>
      <img className='w-full rounded-md' src={template} alt='alt' />
      <div className='flex flex-row justify-between items-center gap-2 p-2'>
        <h3 className='text-darkPurple text-xl font-bold'>Odil</h3>
        <p>$49</p>
      </div>
      <div className='flex flex-row justify-between items-center gap-2 p-2'>
        <p>by Domidex</p>
        <p className='text-xs sm:text-sm'>SAAS</p>
      </div>

      <div className='absolute  bottom-0 left-0 w-full h-full flex flex-col justify-center items-center translate-y-full group-hover:translate-y-0 transition-all duration-200 rounded-md gap-2'>
        <button className='relative z-10 bg-lightGray hover:bg-hoverGray text-darkPurple  py-2 px-4 rounded transition-colors duration-200 w-32'>
          Edit
        </button>
        <button className='bg-purple hover:bg-lightPurple text-white  py-2 px-4 rounded transition-colors duration-200 w-32'>
          Delete
        </button>
        <div className='absolute -z-10 bottom-0 left-0 w-full h-full bg-darkPurple opacity-30 '></div>
      </div>
    </button>
  );
}
