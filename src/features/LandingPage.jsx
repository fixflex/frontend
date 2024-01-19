import Assurance from '../components/assurance/Assurance';
import Flexers from '../components/flexers/Flexers';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
import Navbar from '../components/navbar/Navbar';
import OurServices from '../components/our-services/OurServices';

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <OurServices />
      <Flexers />
      <Assurance />
      <Footer />
    </>
  );
};

export default LandingPage;
