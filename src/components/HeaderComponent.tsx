import { useState } from 'react'
import avatar from '../assets/avatar.png'
import SearchIcon from '../components/icons/SearchIcon'

const HeaderComponent: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <nav className="navbar bg-base-100 px-4 shadow-sm sm:px-8 lg:px-30">
      <div className="flex-1">
        <a className="btn btn-ghost text-lg sm:text-2xl">
          <span className="font-righteous hidden sm:inline">
            Achievements Tracker
          </span>
          <span className="font-righteous sm:hidden">Tracker</span>
        </a>
      </div>

      <div className="flex items-center gap-2">
        {/* DESKTOP/TABLET */}
        <input
          type="text"
          placeholder="Search"
          className="hidden md:block input input-bordered input-sm w-64 rounded-full"
        />

        {/* MOBILE */}
        <div className="relative md:hidden w-full flex justify-center">
          {/* botão abre/fecha */}
          <button
            className="btn btn-ghost p-2"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-label="Abrir busca"
          >
            <SearchIcon className="h-5 w-5 text-gray-600" />
          </button>

          {/* dropdown-content: usa left-0 e right-0 + mx-auto para centralizar */}
          {isSearchOpen && (
            <div
              className={`
                dropdown-content
                absolute
                top-full
                left-0
                right-0
                mx-auto
                mt-2
                w-64
                z-50
              `}
            >
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered input-xs w-full rounded-full"
              />
            </div>
          )}
        </div>

        {/* AVATAR */}
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
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default HeaderComponent
