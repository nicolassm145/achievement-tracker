import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

// Raw API response
type UserRaw = {
  id: number;
  username: string;
  steam_id?: string;
  xbox_id?: string;
  psn_id?: string;
};


export interface User {
  id: number;
  username: string;
  steamid?: string;
  xboxId?: string;
  psnId?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  loading: true,
  logout: () => {},
});

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('access_token'));
  const [loading, setLoading] = useState(true);
 

  // Whenever token changes, update axios header
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('access_token', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('access_token');
    }
  }, [token]);

  const AVATAR_CACHE_KEY = 'selectedAvatar';

  useEffect(() => {
    (async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const resp = await api.get<UserRaw>('/user/me');
        const raw = resp.data;
        const cachedAvatar = sessionStorage.getItem(AVATAR_CACHE_KEY) ?? undefined;
        const normalized: User = {
          id: raw.id,
          username: raw.username,
          steamid: raw.steam_id,
          xboxId: raw.xbox_id,
          psnId: raw.psn_id,
          avatarUrl: cachedAvatar,
        };
        setUser(normalized);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem('steam_cards_cache');
    sessionStorage.removeItem('xbox_cards_cache');
    sessionStorage.removeItem('psn_cards_cache');
    sessionStorage.removeItem('steam_rare_achievements_cache');
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
