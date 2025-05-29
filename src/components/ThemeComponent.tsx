import { useEffect, useState } from 'react';

type Theme = 'light' | 'dracula';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'light'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dracula' : 'light'));
  const iconClass = theme === 'light' ? 'text-black' : 'text-white';

  return (
    <label className="flex cursor-pointer items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconClass} ${theme === 'light' ? 'opacity-100' : 'opacity-50'}`}
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>

      <input
        type="checkbox"
        className="toggle toggle-primary"
        checked={theme === 'dracula'}
        onChange={toggleTheme}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconClass} ${theme === 'dracula' ? 'opacity-100' : 'opacity-50'}`}
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </label>
  );
}
export default ThemeToggle;
