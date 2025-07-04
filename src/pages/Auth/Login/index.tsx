import { useTranslation } from 'react-i18next';
import AuthComponent from '../../../components/AuthComponent';
import { useAuth } from '../../../contexts/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { setToken } from '../../../services/api';
import type { User } from "../../../contexts/AuthContext";



const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    login: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await api.post('/user/login', {
        login: formData.login,
        password: formData.password,
      });

      const { access_token } = response.data as { access_token: string };

      // 2) salva token na chave certa
      localStorage.setItem('access_token', access_token);
      setToken(access_token); // que faz api.defaults.headers… também
      const meResp = await api.get<User>('/user/me');
      setUser(meResp.data);
      // 3) aí sim navega pro protected
      navigate('/settings');
    } catch (err: any) {
      if (err.response?.data?.detail) {
        setMessage(`Erro: ${err.response.data.detail}`);
      } else {
        setMessage('Erro ao realizar login.');
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[url('/loginBG.jpg')] bg-cover bg-center">
      <AuthComponent />
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10">
        <form
          onSubmit={handleSubmit}
          className="register-overlay md:max-w flex w-full max-w-xs flex-col items-center rounded-lg p-8 shadow-md backdrop-blur-sm sm:max-w-md sm:p-10 md:p-12"
        >
          <a href="/">
            <h1 className="font-righteous text-5xl">NEXUS</h1>
          </a>
          <h1 className="mt-10 mb-6 text-center text-2xl font-bold tracking-tight">
            {t('auth.login')}
          </h1>

          <div className="flex w-full flex-col items-center gap-2">
            <label className="input flex w-full max-w-xs items-center gap-2">
              <input
                type="email"
                name="login"
                className="w-full bg-transparent focus:outline-none"
                placeholder={t('auth.email')}
                required
                value={formData.login}
                onChange={handleChange}
              />
            </label>

            <label className="input flex w-full max-w-xs items-center gap-2">
              <input
                type="password"
                name="password"
                className="w-full bg-transparent focus:outline-none"
                placeholder={t('auth.password')}
                required
                value={formData.password}
                onChange={handleChange}
              />
            </label>

            <button className="btn mt-6 w-1/2" type="submit">
              {t('auth.loginBtn')}
            </button>

            {message && (
              <p className="mt-2 text-center text-sm text-red-500">{message}</p>
            )}

            <p className="mt-4 justify-center px-2 text-center text-sm">
              {t('auth.noAccount')} <br />
              <a
                href="/register"
                className="text-primary hover:text-primary-focus underline"
              >
                {t('auth.createAccount')}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
