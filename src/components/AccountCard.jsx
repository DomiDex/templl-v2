import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteTemplate } from '../redux/templateSlice';

export default function AccountCard({ template }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      dispatch(deleteTemplate(template.id));
    }
  };

  return (
    <div className='relative overflow-hidden bg-darkerGray hover:bg-hoverGray transition-colors duration-200 group rounded-lg p-2'>
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
        <p>by {template.author || 'Unknown'}</p>
        <p className='text-xs sm:text-sm'>{template.category}</p>
      </div>

      <div className='absolute bottom-0 left-0 w-full h-full flex flex-col justify-center items-center translate-y-full group-hover:translate-y-0 transition-all duration-200 rounded-md gap-2'>
        <button className='relative z-10 bg-lightGray hover:bg-hoverGray text-darkPurple py-2 px-4 rounded transition-colors duration-200 w-32'>
          Edit
        </button>
        <button
          className='bg-purple hover:bg-lightPurple text-white py-2 px-4 rounded transition-colors duration-200 w-32'
          onClick={handleDelete}
        >
          Delete
        </button>
        <div className='absolute -z-10 bottom-0 left-0 w-full h-full bg-darkPurple opacity-30'></div>
      </div>
    </div>
  );
}

AccountCard.propTypes = {
  template: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    image_thumbnail: PropTypes.string.isRequired,
    author: PropTypes.string,
  }).isRequired,
};
