import Assurance from '../../components/assurance/Assurance';
import Flexers from '../../components/flexers/Flexers';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import OurServices from '../../components/our-services/OurServices';
import Ratings from '../../components/ratings/Ratings';

const LandingPage = () => {
  return (
    <>
      <Header />
      <OurServices />
      <Ratings />
      <Flexers />
      <Assurance />
      <Footer />
    </>
  );
};

export default LandingPage;