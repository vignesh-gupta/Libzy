
import HeroSection from "../components/sections/HeroSection";
import BookSection from "../components/sections/BookSection";
import { useGetBooksQuery } from "../services/libServices";

const Home = () => {

  const queryResponse = useGetBooksQuery();


  return (
    <main>
      <HeroSection />
      <section className="flex flex-col p-4 ">
        <h2 className="text-center my-4 text-5xl font-bold">
          Grab the Most Popular!
        </h2>
        <BookSection {...queryResponse} />
      </section>

      <div className="divider"></div>
    </main>
  );
};

export default Home;
