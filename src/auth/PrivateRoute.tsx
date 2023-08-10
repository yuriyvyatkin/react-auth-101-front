import { useNavigate } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { useUser } from './hooks/useUser';

interface PrivateRouteProps {
  children: ReactNode;
  redirectTo: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, redirectTo }) => {
  const user = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(redirectTo);
    }
  }, [user, redirectTo]);

  if (!user) return null;

  return <>{children}</>;
};
