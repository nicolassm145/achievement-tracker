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
import { ProtectedRoute } from '../components/ProtectedRouteComponent';
import SearchPage from '../pages/Search';
import SettingsPage from '../pages/Settings';

const router = createBrowserRouter([
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
    element: <ProtectedRoute />,
    children: [
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
        path: '/search',
        element: (
          <>
            <SearchPage />
            <TitleComponent title="Search" />
          </>
        ),
      },
      {
        path: '/settings',
        element: (
          <>
          <SettingsPage />
          <TitleComponent title="Settings" />
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
      },
    ],
  },

  {
    path: '*',
    element: (
      <>
        <NotFound />
        <TitleComponent title="NotFound" />
      </>
    ),
  },
]);

export default router;
