import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home';
import RegisterPage from '../pages/Auth/Register';

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
  }
]);

export default router;
