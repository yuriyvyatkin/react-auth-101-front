import { useNavigate } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';

interface PrivateRouteProps {
  children: ReactNode;
  redirectTo: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, redirectTo }) => {
  const user = null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(redirectTo);
    }
  }, [user, navigate, redirectTo]);

  if (!user) return null;

  return <>{children}</>;
};
