import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Home';
import RegisterPage from '../pages/Auth/Register';
import LoginPage from '../pages/Auth/Login';
import TitleComponent from '../components/TitleComponent';
import NotFound from '../pages/NotFound';
import ProfilePage from '../pages/Profile';
import TermsPage from '../pages/Terms';
import AboutPage from '../pages/About';
import PrivacyPage from '../pages/Privacy';
import ComingSoonPage from '../pages/ComingSoon';
import AnticipatedPage from '../pages/Anticipated';
import GamePage from '../pages/Games';


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
  },
  {
    path: '/terms',
    element: (
      <>
          <TermsPage />
          <TitleComponent title="Terms" />
      </>
    ),
  },
  {
    path: '/about',
    element: (
      <>
          <AboutPage />
          <TitleComponent title="About" />
      </>
    ),
  },
  {
    path: '/privacy',
    element: (
      <>
          <PrivacyPage />
          <TitleComponent title="Privacy" />
      </>
    ),
  },
  {
    path: '/coming-soon',
    element: (
      <>
        <ComingSoonPage />
        <TitleComponent title="Coming Soon" />
      </>
    ),
  },
  {
    path: '/anticipated',
    element: (
      <>
        <AnticipatedPage />
        <TitleComponent title="Anticipaded" />
      </>
    ),
  },
  { 
    path: '/games/:gameId',
    element: (
      <>
        <GamePage />
        <TitleComponent title="Game Details" />
      </>
    ),
  }
]);

export default router;
