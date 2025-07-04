import { useTranslation } from 'react-i18next';
import AuthComponent from '../../../components/AuthComponent';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false); // controla se o cadastro foi bem-sucedido

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('As senhas não coincidem.');
      return;
    }

    try {
      await axios.post('https://tracker-api-bh00.onrender.com/user/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      setMessage('Cadastro realizado com sucesso! Redirecionando...');
      setSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setSuccess(false);
      if (err.response && err.response.data.detail) {
        setMessage(`Erro: ${err.response.data.detail}`);
      } else {
        setMessage('Erro ao registrar usuário.');
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[url('/registerBG.png')] bg-cover bg-center">
      <AuthComponent />
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10">
        <form onSubmit={handleSubmit} className="register-overlay flex w-full max-w-xs flex-col items-center rounded-lg p-8 shadow-md backdrop-blur-sm sm:max-w-md sm:p-10 md:max-w-lg md:p-12">
          <a href="/">
            <h1 className="font-righteous text-5xl">NEXUS</h1>
          </a>
          <h1 className="mt-10 mb-6 text-center text-2xl font-bold tracking-tight">
            {t('auth.register')}
          </h1>

          <div className="flex w-full flex-col items-center gap-2">
            {/* campos de entrada */}
            <label className="input validator">
              <input
                type="text"
                name="username"
                placeholder={t('auth.username')}
                required
                minLength={3}
                maxLength={30}
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                value={formData.username}
                onChange={handleChange}
              />
            </label>

            <label className="input validator">
              <input
                type="email"
                name="email"
                placeholder={t('auth.email')}
                required
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label className="input validator">
              <input
                type="password"
                name="password"
                placeholder={t('auth.password')}
                required
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                value={formData.password}
                onChange={handleChange}
              />
            </label>

            <label className="input validator">
              <input
                type="password"
                name="confirmPassword"
                placeholder={t('auth.confirmPassword')}
                required
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </label>

            <button className="btn mt-6 w-1/2" type="submit">
              {t('auth.registerbtn')}
            </button>

            <p className="justify-center px-2 text-center text-sm">
              {t('auth.alreadyHaveAccount')} <br />
              <a
                href="/login"
                className="text-primary hover:text-primary-focus underline"
              >
                {t('auth.loginNow')}
              </a>
            </p>

            {message && (
              <p className={`text-sm text-center mt-2 ${success ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;