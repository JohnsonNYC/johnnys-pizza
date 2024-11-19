import Header from "../components/Header";
import Footer from "../components/Footer";

const BASE = import.meta.env.VITE_BASE_URL;
console.log({ BASE });

const Home = () => {
  return (
    <>
      <Header />
      <main>Home PAGE!!</main>
      <Footer />
    </>
  );
};

export default Home;
