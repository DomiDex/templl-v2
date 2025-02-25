import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTemplates } from '../redux/templateSlice';
import TemplateCard from '../components/TemplateCard';

export default function Home() {
  const dispatch = useDispatch();
  const { templates, loading, error } = useSelector((state) => state.templates);

  useEffect(() => {
    dispatch(fetchTemplates());
  }, [dispatch]);

  return (
    <>
      <main>
        <section className='px-4 py-8  sm:px-8 md:px-16 md:py-16'>
          <div className='container-xl lg:container mx-auto flex flex-col md:flex-row justify-between items-center gap-8'>
            <div className='w-full md:w-1/2'>
              <h1 className='text-darkPurple text-3xl md:text-5xl font-heading font-semibold'>
                A selection of the best <br />
                <span className='text-lightPurple'>Webflow</span> templates
              </h1>
            </div>
            <div className='w-full md:w-1/2'>
              <p>
                Whether you're building a portfolio, launching an e-commerce
                site, or creating a blog, these templates combine sleek design,
                responsive layouts, and user-friendly customization options.
                Perfect for anyone looking to create a professional website with
                ease, Temple A's Webflow templates provide the perfect blend of
                aesthetics and functionality to help your brand stand out.
              </p>
            </div>
          </div>
        </section>
        <section className='px-4 py-8  sm:px-8 md:px-16 '>
          <div className='container-xl lg:container mx-auto '>
            {loading && <p>Loading templates...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && (
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                {console.log(templates)}

                {templates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
