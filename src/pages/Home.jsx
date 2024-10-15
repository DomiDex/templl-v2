import TemplateCard from '../components/TemplateCard';
export default function Home() {
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
                Lorem ipsum dolor sit amet consectetur. Eu ut sed non ultricies
                sit est. At elementum tristique cras purus. Urna interdum
                consectetur aliquet quam. Volutpat pharetra consequat nunc
                facilisis mauris facilisi. Duis pretium ullamcorper nulla urna.
                Facilisis malesuada felis a amet facilisi enim arcu.
              </p>
            </div>
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
