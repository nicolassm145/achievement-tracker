import { ThemeToggle } from './ThemeComponent';

const FooterComponent: React.FC = () => {
  return (
    <footer className="footer bg-base-100 text-base-content flex flex-col items-center gap-8 p-8 sm:px-10 md:flex-row md:items-start md:justify-between md:px-36 lg:px-36">
      {/* 1) Logo + Texto */}
      <aside className="flex flex-col items-center md:items-start">
        <div className="flex flex-row items-center gap-2 md:flex-row md:items-start">
          <a
            href="/about"
            className="link link-hover text-base font-bold sm:text-lg"
          >
            About
          </a>
          <a href="/terms" className="link link-hover text-base font-bold sm:text-lg">
            Terms
          </a>
          <a href="/privacy" className="link link-hover text-base font-bold sm:text-lg">
            Privacy
          </a>
        </div>

        <div className="space-y-1 text-center md:text-left">
          <p>Your unified achievements hub for Steam, Xbox &amp; PSN.</p>
          <p>Copyright © {new Date().getFullYear()} – All rights reserved</p>
        </div>
      </aside>

      {/* 3) Social + ThemeToggle */}
      <nav className="flex flex-col items-center gap-4">
        <div className="flex space-x-4">
          {/* Email */}
          <a
            href="#"
            aria-label="Custom Icon"
            className="text-base-content fill-current"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 256 256"
              className="text-base-content fill-current"
            >
              <g
                transform="translate(1.4066 1.4066) scale(2.81 2.81)"
                fill="currentColor"
                fillRule="nonzero"
              >
                <path d="M 75.546 78.738 H 14.455 C 6.484 78.738 0 72.254 0 64.283 V 25.716 c 0 -7.97 6.485 -14.455 14.455 -14.455 h 61.091 c 7.97 0 14.454 6.485 14.454 14.455 v 38.567 C 90 72.254 83.516 78.738 75.546 78.738 z M 14.455 15.488 c -5.64 0 -10.228 4.588 -10.228 10.228 v 38.567 c 0 5.64 4.588 10.229 10.228 10.229 h 61.091 c 5.64 0 10.228 -4.589 10.228 -10.229 V 25.716 c 0 -5.64 -4.588 -10.228 -10.228 -10.228 H 14.455 z" />
                <path d="M 11.044 25.917 C 21.848 36.445 32.652 46.972 43.456 57.5 c 2.014 1.962 5.105 -1.122 3.088 -3.088 C 35.74 43.885 24.936 33.357 14.132 22.83 C 12.118 20.867 9.027 23.952 11.044 25.917 L 11.044 25.917 z" />
                <path d="M 46.544 57.5 c 10.804 -10.527 21.608 -21.055 32.412 -31.582 c 2.016 -1.965 -1.073 -5.051 -3.088 -3.088 C 65.064 33.357 54.26 43.885 43.456 54.412 C 41.44 56.377 44.529 59.463 46.544 57.5 L 46.544 57.5 z" />
                <path d="M 78.837 64.952 c -7.189 -6.818 -14.379 -13.635 -21.568 -20.453 c -2.039 -1.933 -5.132 1.149 -3.088 3.088 c 7.189 6.818 14.379 13.635 21.568 20.453 C 77.788 69.973 80.881 66.89 78.837 64.952 L 78.837 64.952 z" />
                <path d="M 14.446 68.039 c 7.189 -6.818 14.379 -13.635 21.568 -20.453 c 2.043 -1.938 -1.048 -5.022 -3.088 -3.088 c -7.189 6.818 -14.379 13.635 -21.568 20.453 C 9.315 66.889 12.406 69.974 14.446 68.039 L 14.446 68.039 z" />
              </g>
            </svg>
          </a>
          {/* Linkedin */}
          <a
            href="#"
            aria-label="Linkedin"
            className="text-base-content fill-current"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              ></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
          {/* Github */}
          <a
            href="#"
            aria-label="Facebook"
            className="text-base-content fill-current"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
            </svg>
          </a>
        </div>

        <ThemeToggle />
      </nav>
    </footer>
  );
};

export default FooterComponent;
