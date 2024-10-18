import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { publishTemplate } from '../redux/templateSlice';
import magicPenIcon from '../assets/magicpen.svg';

export default function PublishTemplate() {
  const [formData, setFormData] = useState({
    templateName: '',
    category: '',
    price: '',
    purchaseLink: '',
    mainImage: null,
    thumbnailImage: null,
    shortDescription: '',
    description: '',
    error: null,
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.templates);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData((prevState) => ({ ...prevState, error: null }));
    try {
      const templateData = {
        name: formData.templateName,
        category: formData.category,
        price: parseFloat(formData.price),
        template_link: formData.purchaseLink,
        short_description: formData.shortDescription,
        long_description: formData.description,
        image_main: formData.mainImage,
        image_thumbnail: formData.thumbnailImage,
      };
      const resultAction = await dispatch(publishTemplate(templateData));
      if (publishTemplate.fulfilled.match(resultAction)) {
        // Reset form data here
        setFormData({
          templateName: '',
          category: '',
          price: '',
          purchaseLink: '',
          mainImage: null,
          thumbnailImage: null,
          shortDescription: '',
          description: '',
          error: null,
        });
      } else if (publishTemplate.rejected.match(resultAction)) {
        const errorMessage =
          resultAction.payload || 'Failed to publish template';
        setFormData((prevState) => ({ ...prevState, error: errorMessage }));
      }
    } catch (error) {
      console.error('Failed to publish template:', error);
      setFormData((prevState) => ({ ...prevState, error: error.message }));
    }
  };

  return (
    <main>
      <section className='bg-lightGray'>
        <div className='min-h-screen container-xl lg:container mx-auto flex flex-col items-center justify-center py-8'>
          <div className='w-full max-w-2xl bg-lightGray rounded-lg p-8'>
            <h2 className='text-3xl font-bold text-darkPurple mb-6'>
              Publish Your Template
            </h2>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label
                    htmlFor='templateName'
                    className='block text-sm font-medium text-darkPurple mb-1'
                  >
                    Template Name
                  </label>
                  <input
                    type='text'
                    id='templateName'
                    name='templateName'
                    value={formData.templateName}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 bg-white border border-darkGray rounded-md focus:outline-none focus:ring-1 focus:ring-darkPurple'
                    placeholder='MyCoolTemplate'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='category'
                    className='block text-sm font-medium text-darkPurple mb-1'
                  >
                    Category
                  </label>
                  <select
                    id='category'
                    name='category'
                    value={formData.category}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 bg-white border border-darkGray rounded-md focus:outline-none focus:ring-1 focus:ring-darkPurple'
                    required
                  >
                    <option value=''>Select a category</option>
                    <option value='business'>Business</option>
                    <option value='portfolio'>Portfolio</option>
                    <option value='ecommerce'>E-commerce</option>
                    <option value='blog'>Blog</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor='price'
                    className='block text-sm font-medium text-darkPurple mb-1'
                  >
                    Template Price (USD)
                  </label>
                  <input
                    type='number'
                    id='price'
                    name='price'
                    value={formData.price}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 bg-white border border-darkGray rounded-md focus:outline-none focus:ring-1 focus:ring-darkPurple'
                    placeholder='79'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='purchaseLink'
                    className='block text-sm font-medium text-darkPurple mb-1'
                  >
                    Template Purchase Link
                  </label>
                  <input
                    type='url'
                    id='purchaseLink'
                    name='purchaseLink'
                    value={formData.purchaseLink}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 bg-white border border-darkGray rounded-md focus:outline-none focus:ring-1 focus:ring-darkPurple'
                    placeholder='https://webflow.com/'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='mainImage'
                    className='block text-sm font-medium text-darkPurple mb-1'
                  >
                    Main Image Upload
                  </label>
                  <input
                    type='file'
                    id='mainImage'
                    name='mainImage'
                    onChange={handleFileChange}
                    className='w-full px-3 py-2 bg-white border border-darkGray rounded-md focus:outline-none focus:ring-1 focus:ring-darkPurple'
                    accept='image/*'
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor='thumbnailImage'
                    className='block text-sm font-medium text-darkPurple mb-1'
                  >
                    Thumbnail Image Upload
                  </label>
                  <input
                    type='file'
                    id='thumbnailImage'
                    name='thumbnailImage'
                    onChange={handleFileChange}
                    className='w-full px-3 py-2 bg-white border border-darkGray rounded-md focus:outline-none focus:ring-1 focus:ring-darkPurple'
                    accept='image/*'
                    required
                  />
                </div>
                <div className='col-span-full'>
                  <label
                    htmlFor='shortDescription'
                    className='block text-sm font-medium text-darkPurple mb-1'
                  >
                    Short Description (160 characters)
                  </label>
                  <input
                    type='text'
                    id='shortDescription'
                    name='shortDescription'
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 bg-white border border-darkGray rounded-md focus:outline-none focus:ring-1 focus:ring-darkPurple'
                    placeholder='MyCoolTemplate is a...'
                    required
                  />
                </div>
                <div className='col-span-full'>
                  <div className='flex items-center justify-between mb-1'>
                    <label
                      htmlFor='description'
                      className='block text-sm font-medium text-darkPurple'
                    >
                      Long Description
                    </label>
                    <button
                      type='button'
                      className='text-xs bg-purple text-white py-1 px-3 rounded-md hover:bg-lightPurple transition-all duration-200 flex items-center'
                      onClick={() => {
                        /* Add AI writing logic here */
                      }}
                    >
                      <img
                        src={magicPenIcon}
                        alt='Magic Pen'
                        className='w-4 h-4 mr-2'
                      />
                      Write with AI
                    </button>
                  </div>

                  <textarea
                    id='description'
                    name='description'
                    value={formData.description}
                    onChange={handleInputChange}
                    rows='4'
                    className='w-full px-3 py-2 bg-white border border-darkGray rounded-md focus:outline-none focus:ring-1 focus:ring-darkPurple'
                    placeholder='MyCoolTemplate is a template for...'
                    required
                  ></textarea>
                </div>
                <div className='col-span-full mt-1'>
                  {formData.error && (
                    <p className='text-red-500 mb-2'>{formData.error}</p>
                  )}
                  <button
                    type='submit'
                    className='w-full bg-purple text-white py-2 px-4 rounded-md hover:bg-lightPurple transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
                    disabled={loading}
                  >
                    {loading ? 'Publishing...' : 'Publish Template'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
