/* eslint-disable react/no-unescaped-entities */


const HeroSection = () => {
  return (
    <section
      className="hero min-h-[90.8vh]"
      style={{backgroundImage: 'url(https://cdn.dribbble.com/users/2140475/screenshots/15528887/media/6cb693316efc9d7da75e7416621c7101.jpg?compress=1&resize=400x300&vertical=center)'}}
    >
      <div className="hero-overlay bg-opacity-75 bg-black"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-lg">
          <h1 className="mb-5 text-5xl font-bold">Welcome to book Mountain</h1>
          <p className="mb-5">
            Didn't find the your favourite book? or Want to start reading? <br />
            We are one stop solution for all!
          </p>
          <a href="/get-started" className="btn btn-secondary hover:-translate-y-1 ">Get Started</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
