import TemplateCard from '../components/TemplateCard';
export default function Account() {
  return (
    <>
      <main>
        <section className='px-4 py-8  sm:px-8 md:px-16 md:py-16'>
          <div className='container-xl lg:container mx-auto flex flex-col md:flex-row justify-between items-center gap-8 w-full'>
            <h1 className='text-darkPurple text-3xl md:text-5xl font-heading font-semibold'>
              Welcome <span className='text-lightPurple'>DomiDex</span>
            </h1>

            <a
              href='/publish-template'
              className='text-lg text-lightGray px-6 py-2 bg-purple rounded-md hover:bg-lightPurple transition-colors duration-200'
            >
              Publish Template
            </a>
          </div>
        </section>
        <section className='px-4 py-8  sm:px-8 md:px-16 '>
          <div className='container-xl lg:container mx-auto '>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
              <TemplateCard />
              <TemplateCard />
              <TemplateCard />
              <TemplateCard />
              <TemplateCard />
              <TemplateCard />
              <TemplateCard />
              <TemplateCard />
              <TemplateCard />
              <TemplateCard />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
