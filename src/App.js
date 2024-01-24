import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './features/landing-page/LandingPage';
import Login from './features/login/Login';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Signup from './features/signup/Signup';
import Discover from './features/discover/Discover';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/discover' element={<Discover />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
