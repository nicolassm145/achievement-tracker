import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

// Raw API response
interface UserRaw {
  id: number;
  username: string;
  steam_id?: string;
  xbox_id?: string;
  psn_id?: string;
}

// Normalized user type
export interface User {
  id: number;
  username: string;
  steamid?: string;
  xboxId?: string;
  psnId?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
  setUser: () => {},
});

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const resp = await api.get<UserRaw>('/user/me');
        const raw = resp.data;
        const normalized: User = {
          id: raw.id,
          username: raw.username,
          steamid: raw.steam_id,
          xboxId: raw.xbox_id,
          psnId: raw.psn_id,
        };
        setUser(normalized);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const logout = () => {
    localStorage.removeItem('access_token');
    delete api.defaults.headers.common['Authorization'];
    sessionStorage.removeItem('steam_cards_cache');
    sessionStorage.removeItem('xbox_cards_cache');
    sessionStorage.removeItem('psn_cards_cache');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, setUser, loading, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
