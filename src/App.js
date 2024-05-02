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
import NotFound from './features/not-found/NotFound';
import { userLoggedIn } from './features/signup/authSlice';
import PostTask from './features/post-task/PostTask';
import MyTasks from './features/my-tasks/MyTasks';
import Profile from './features/profile/Profile';
import baseURL from './API/baseURL';
import { setCategories } from './features/task-category/categorySlice';
import TaskerOnboarding from './features/tasker-onboarding/TaskerOnboarding';
import AccountSettings from './features/account-settings/AccountSettings';
import UserAccountUpdate from './features/update-user/UserAccountUpdate';
import ChangePassword from './features/change-password/ChangePassword';
import TaskerAccountUpdate from './features/update-tasker/TaskerAccountUpdate';
import UpdateTask from './features/update-task/UpdateTask';
import ViewOffers from './features/view-offers/ViewOffers';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      dispatch(userLoggedIn(foundUser));
    } else {
      console.log('user not logged in yet');
    }

    if (!localStorage.getItem('userTasks')) {
      localStorage.setItem('userTasks', JSON.stringify([]));
    }

    (async () => {
      try {
        const response = (await baseURL.get('/categories')).data.data;

        const filteredCategories = response.map((category) => ({
          name: category.name.en,
          id: category._id,
        }));

        dispatch(setCategories(filteredCategories));
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    })();
    (async () => {
      try {
        const response = await baseURL.get('/users/me');

        console.log('get me : ', response);
      } catch (error) {
        console.error('Failed to fetch me:', error);
      }
    })();
  }, [dispatch]);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Navbar isLoggedIn={isAuthenticated} />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/discover'
          element={isAuthenticated ? <Discover /> : <AuthRedirect />}
        />
        <Route
          path='/browse'
          element={isAuthenticated ? <Browse /> : <AuthRedirect />}
        />
        <Route
          path='/post-task/:taskTitle?'
          element={isAuthenticated ? <PostTask /> : <AuthRedirect />}
        />
        <Route
          path='/my-tasks'
          element={isAuthenticated ? <MyTasks /> : <AuthRedirect />}
        />
        <Route
          path='/tasker-onboarding'
          element={isAuthenticated ? <TaskerOnboarding /> : <AuthRedirect />}
        />
        <Route
          path='/account'
          element={isAuthenticated ? <Profile /> : <AuthRedirect />}
        />
        <Route
          path='/account-settings'
          element={isAuthenticated ? <AccountSettings /> : <AuthRedirect />}
        />
        <Route
          path='/change-password'
          element={isAuthenticated ? <ChangePassword /> : <AuthRedirect />}
        />
        <Route
          path='/update-account'
          element={isAuthenticated ? <UserAccountUpdate /> : <AuthRedirect />}
        />
        <Route
          path='/update-tasker'
          element={isAuthenticated ? <TaskerAccountUpdate /> : <AuthRedirect />}
        />
        <Route
          path='/update-task/:id'
          element={isAuthenticated ? <UpdateTask /> : <AuthRedirect />}
        />
        <Route
          path='/view-offers/:id'
          element={isAuthenticated ? <ViewOffers /> : <AuthRedirect />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
