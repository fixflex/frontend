import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './features/landing-page/LandingPage';
import Login from './features/login/Login';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Signup from './features/signup/Signup';
import Discover from './features/discover/Discover';
import Browse from './features/browse/Browse';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AuthRedirect from './features/auth-redirect/AuthRedirect';
import { userLoggedIn } from './features/signup/authSlice';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // axios
    //   .get('https://fixflex.onrender.com/api/v1/users/me')
    //   .then((response) => {
    //     console.log(response);
    //   });

    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      console.log('user  logged in ');

      const foundUser = JSON.parse(loggedInUser);

      dispatch(userLoggedIn(foundUser));
    } else {
      console.log('user not logged in yet');
    }
  }, [dispatch]);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return (
      <Router>
        <Navbar isLoggedIn={isAuthenticated} />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/discover' element={<Discover />} />
          <Route path='/browse' element={<Browse />} />
          <Route path='*' element={<AuthRedirect />} />
        </Routes>
        <Footer />
      </Router>
    );
  } else {
    return (
      <Router>
        <Navbar isLoggedIn={isAuthenticated} />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<AuthRedirect />} />
        </Routes>
        <Footer />
      </Router>
    );
  }
}

export default App;

// if (!isAuthenticated) {
//   return;
// } else {
//   return (
//     <Router>
//       <Navbar isLoggedIn={isAuthenticated} />
//       <Routes>
//         <Route path='/' element={<LandingPage />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/signup' element={<Signup />} />
//         <Route path='/discover' element={<Discover />} />
//         <Route path='/browse' element={<Browse />} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// }
