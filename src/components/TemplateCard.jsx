import PropTypes from 'prop-types';

export default function TemplateCard({ template }) {
  return (
    <a
      href={template.template_link}
      className='relative overflow-hidden bg-darkerGray hover:bg-hoverGray transition-colors duration-200 group rounded-lg p-2'
    >
      <img
        className='w-full rounded-md'
        src={template.image_thumbnail}
        alt={template.name}
      />
      <div className='flex flex-row justify-between items-center gap-2 p-2'>
        <h3 className='text-darkPurple text-xl font-bold'>{template.name}</h3>
        <p>${template.price}</p>
      </div>
      <div className='flex flex-row justify-between items-center gap-2 p-2'>
        <p className='text-xs sm:text-sm'>{template.category}</p>
      </div>
    </a>
  );
}

TemplateCard.propTypes = {
  template: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    template_link: PropTypes.string.isRequired,
    image_thumbnail: PropTypes.string.isRequired,
    author: PropTypes.string,
  }).isRequired,
};
