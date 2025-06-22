import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home';
import RegisterPage from '../pages/Auth/Register';
import LoginPage from '../pages/Auth/Login';
import TitleComponent from '../components/TitleComponent';
import NotFound from '../pages/NotFound';
import ProfilePage from '../pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <HomePage />
        <TitleComponent title="Nexus" />
      </>
    ),
  },
  {
    path: '/register',
    element: (
      <>
        <RegisterPage />
        <TitleComponent title="Register" />
      </>
    ),
  },
  {
    path: '/login',
    element: (
      <>
        <LoginPage />
        <TitleComponent title="Login" />
      </>
    ),
  },
  {
    path: "*",
    element: (
      <>
        <NotFound />
        <TitleComponent title="NotFound" />
      </>
    ),
  },
  {
    path: '/profile',
    element: (
      <>
        <ProfilePage />
        <TitleComponent title="Profile" />
      </>
    ),
  }
]);

export default router;
