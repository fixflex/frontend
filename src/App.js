import Assurance from './components/assurance/Assurance';
import Flexers from './components/flexers/Flexers';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import OurServices from './components/our-services/OurServices';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Header />
      <OurServices />
      <Flexers />
      <Assurance />
    </div>
  );
}

export default App;
