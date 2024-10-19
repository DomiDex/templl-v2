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
      <h1 className='text-5xl font-bold mb-6'>My Templates</h1>
      {loading && <p>Loading templates...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {templates.map((template) => (
            <AccountCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </main>
  );
}
