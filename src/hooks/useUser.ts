import { useState, useEffect } from 'react';
import { useToken } from './useToken';

interface UserPayload {
  id: string;
  email: string;
  info: {
    hairColor: string;
    favoriteFood: string;
    bio: string;
  };
  isVerified: boolean;
}

export const useUser = (): UserPayload | null => {
  const [token] = useToken();

  const getPayloadFromToken = (token: string): UserPayload => {
    const encodedPayload = token.split('.')[1];

    return JSON.parse(atob(encodedPayload));
  };

  const [user, setUser] = useState<UserPayload | null>(() => {
    if (!token) return null;

    return getPayloadFromToken(token);
  });

  useEffect(() => {
    if (!token) {
      setUser(null);
    } else {
      setUser(getPayloadFromToken(token));
    }
  }, [token]);

  return user;
};
