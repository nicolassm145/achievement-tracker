import SystemLayout from '../../components/Layout/SystemLayout';
import avatar from '../../assets/avatar.png';
import { useAuth } from '../../contexts/AuthContext';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const ProfilePage: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <SystemLayout>
        <div className="flex h-64 items-center justify-center">
          Carregando perfil...
        </div>
      </SystemLayout>
    );
  }

  return (
    <SystemLayout>
      <div className="relative -mt-20 h-54 w-full sm:h-64 md:h-96 lg:h-128">
        <img
          src="/profileBG.png"
          alt="Banner"
          className="h-full w-full object-cover"
        />
        <div className="via-black-100/80 to-base-100 absolute inset-0 bg-gradient-to-b from-transparent" />
      </div>

      <div className="relative mx-auto -mt-8 px-4 sm:-mt-32 sm:px-8 md:-mt-36 lg:-mt-40 lg:px-36">
        <div className="profile-card rounded-lg shadow-xl md:p-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 md:items-start">
            <img
              alt="Avatar do usuário"
              src={avatar}
              className="border-base-100 -mt-20 h-32 w-32 rounded border-4 shadow-md"
            />

            <div className="flex-1">
              <h1 className="-ml-1 text-xl font-bold sm:-mt-16 sm:text-2xl md:text-3xl lg:-mt-15">
                {user?.username ?? 'Usuário'}
              </h1>
            </div>
            <div>
              <a href="/settings">
                <AdjustmentsHorizontalIcon className="ml-auto w-10 cursor-pointer" />
              </a>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <div className="bg-base-200 basis-[65%] rounded p-4"></div>
            <div className="bg-base-300 basis-[35%] rounded p-4"></div>
          </div>
        </div>
      </div>
    </SystemLayout>
  );
};

export default ProfilePage;
