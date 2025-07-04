import InfoComponent from '../../components/InfoComponent';
import SystemLayout from '../../components/Layout/SystemLayout';
import TrendingGamesComponent from '../../components/TrendingGamesComponent';
import UpcomingGamesComponent from '../../components/UpcomingGamesComponent';

const HomePage = () => {
  return (
    <SystemLayout>
      <div className="px-4 sm:px-10 lg:px-36">
        <div>
          <InfoComponent />
        </div>
        <div className="mt-6 mb-6 border-t-1 border-gray-700" />
        <div>
          <TrendingGamesComponent />
        </div>
        <div className="mt-12">
          <UpcomingGamesComponent />
        </div>
      </div>
    </SystemLayout>
  );
};
export default HomePage;
