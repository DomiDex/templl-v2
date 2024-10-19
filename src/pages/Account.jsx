import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTemplates } from '../redux/templateSlice';
import AccountCard from '../components/AccountCard';

export default function Account() {
  const dispatch = useDispatch();
  const { templates, loading, error } = useSelector((state) => state.templates);

  useEffect(() => {
    dispatch(fetchTemplates());
  }, [dispatch]);

  return (
    <main className='container mx-auto px-4 py-8'>
      <section className='px-4 py-8 sm:px-8 md:px-16 md:py-16'>
        <div className='container-xl lg:container mx-auto flex flex-col lg:flex-row justify-between items-center gap-8'>
          <div className='w-full lg:w-1/2'>
            <h1 className='text-darkPurple text-3xl md:text-5xl font-heading font-semibold'>
              My Account
            </h1>
          </div>
          <a
            href='/publish-template'
            className='hover:bg-lightPurple hover:text-white bg-purple text-lightGray transition-colors duration-300 px-4 py-2 rounded-md'
          >
            Add Template
          </a>
        </div>
      </section>
      <section className='px-4 py-8 sm:px-8 md:px-16'>
        <div className='container-xl lg:container mx-auto'>
          {loading && <p>Loading templates...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && !error && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {templates.map((template) => (
                <AccountCard key={template.id} template={template} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
