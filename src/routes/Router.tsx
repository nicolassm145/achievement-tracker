import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home';
import RegisterPage from '../pages/Auth/Register';
import LoginPage from '../pages/Auth/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <HomePage />
      </>
    ),
  },
  {
    path: '/register',
    element: (
      <>
        <RegisterPage />
      </>
    ),
  },
  {
    path: '/login',
    element: (
      <>
        <LoginPage />
      </>
    ),
  }
]);

export default router;
