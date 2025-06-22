import SystemLayout from '../../components/Layout/SystemLayout';
import avatar from '../../assets/avatar.png';

const ProfilePage = () => {
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

      <div className="relative mx-auto -mt-28 px-4 sm:-mt-32 sm:px-8 md:-mt-36 lg:-mt-40 lg:px-36">
        <div className="profile-card rounded-lg p-6 shadow-xl">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-y-0 sm:space-x-6">
            <img
              alt="Avatar do usuário"
              src={avatar}
              className="h-32 w-32 rounded -mt-20 border-4 border-base-100 shadow-md"
            />

            <div>
              <h1 className="text-2xl -ml-1 -mt-15 font-bold">Usuário</h1>
            </div>
          </div>

          <div className="mt-6">
            <p>aaaaaaa</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">aaaaaaa</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">aaaaaaa</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">aaaaaaa</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">aaaaaaa</p>
          </div>
        </div>
      </div>
    </SystemLayout>
  );
};

export default ProfilePage;
