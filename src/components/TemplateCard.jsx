import template from '../assets/thumbnail-1@2x.png';
export default function TemplateCard() {
  return (
    <button className='bg-darkerGray hover:bg-hoverGray transition-colors duration-200  rounded-lg p-2'>
      <img className='w-full rounded-md' src={template} alt='alt' />
      <div className='flex flex-row justify-between items-center gap-2 p-2'>
        <h3 className='text-darkPurple text-xl font-bold'>Odil</h3>
        <p>$49</p>
      </div>
      <div className='flex flex-row justify-between items-center gap-2 p-2'>
        <p>by Domidex</p>
        <p className='text-xs sm:text-sm'>SAAS</p>
      </div>
    </button>
  );
}
