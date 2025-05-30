import { useState } from 'react';
import avatar from '../assets/avatar.png';
import {
  MagnifyingGlassIcon,
  BoltIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';

const HeaderComponent: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="navbar bg-base-100 px-4 sm:px-10 lg:px-36">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-lg sm:text-3xl">
          <span className="font-righteous hidden sm:inline">NEXUS</span>
          <span className="font-righteous sm:hidden">NEXUS</span>
        </a>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered input-sm hidden w-64 rounded-full md:block"
        />

        <a href="/games">
          <button className="btn btn-ghost p-2">
            <TrophyIcon className="hidden size-5 md:block" />
          </button>
        </a>

        <a href="/activity">
          <button className="btn btn-ghost p-2">
            <BoltIcon className="hidden size-5 md:block" />
          </button>
        </a>

        <div className="relative flex w-full justify-center md:hidden">
          <button
            className="btn btn-ghost p-2"
            onClick={() => setIsSearchOpen((prev) => !prev)}
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-white" />
          </button>

          {isSearchOpen && (
            <div className="dropdown-content fixed top-16 left-1/2 z-50 mt-2 w-64 -translate-x-1/2">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered input-xs w-full rounded-full"
              />
            </div>
          )}
        </div>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-square avatar"
          >
            <div className="w-10 flex-shrink-0 rounded sm:w-11">
              <img alt="Avatar do usuário" src={avatar} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-48 p-2 shadow-lg sm:w-52"
          >
            <li>
              <a href="/" className="justify-between">
                Profile
              </a>
            </li>
            <li className="md:hidden">
              <a href="/games" className="flex items-center gap-2">
                Games
              </a>
            </li>
            <li className="md:hidden">
              <a href="/activity" className="flex items-center gap-2">
                Activity
              </a>
            </li>

            <li>
              <a href="/setting">Settings</a>
            </li>
            <li>
              <a href="/login">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default HeaderComponent;
