import domidex from '../assets/domidex@2x.webp';

export default function About() {
  return (
    <main>
      <section className='px-4 py-8  sm:px-8 md:px-16 md:py-16'>
        <div className='container-xl lg:container mx-auto flex flex-col items-center justify-center'>
          <h1 className='text-darkPurple text-3xl md:text-5xl font-heading font-semibold mb-8'>
            Who Is Behing <span className='text-lightPurple'>Templl</span> ?
          </h1>
          <img
            className=' w-full md:w-2/4 rounded-full my-10'
            src={domidex}
            alt='DomiDex the creator of Templl'
          />
          <p className='text-darkPurple text-lg  w-full sm:w-2/4'>
            DomiDex's journey into the world of web development began with a
            personal quest to create a website that was not only visually
            appealing but also easy to use and navigate. This desire led him to
            explore the capabilities of various tools and technologies,
            ultimately discovering the power of Webflow for its intuitive visual
            interface and the versatility of React.js for building dynamic and
            interactive experiences. Along the way, he was drawn to the clean
            and efficient styling offered by Tailwind CSS, which allowed him to
            create visually appealing and responsive designs with ease.
            <br />
            <br />
            DomiDex's passion for web development grew as he realized the
            potential of websites to connect people and share information. He
            was inspired by the idea of creating online spaces that were not
            only functional but also enjoyable to use. This led him to focus on
            user experience (UX) design, ensuring that his websites were not
            only visually appealing but also intuitive and easy to navigate.
            <br />
            <br />
            With his newfound knowledge and skills, DomiDex began to share his
            expertise by creating Webflow templates. He believed that everyone
            deserved the opportunity to build their own beautiful and functional
            websites, regardless of their technical background. By providing
            high-quality templates, DomiDex hoped to empower others to bring
            their visions to life and create a positive impact online.
          </p>
        </div>
      </section>
    </main>
  );
}
