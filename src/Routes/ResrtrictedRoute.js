import { Navigate } from 'react-router-dom';

// import { useRefreshQuery } from '../redux/auth/sliceApi';
import { useAuth } from '../Hooks';
// interface RestrictedRouteProps {
//   component: React.ComponentType;
//   redirectTo?: string;
// }

// export const RestrictedRoute: React.FC<RestrictedRouteProps> = ({

export const RestrictedRoute = ({ 
  component: Component, redirectTo = '/' }) => {
  // const {data: user } = useRefreshQuery();
  const {isLoggedIn, user}= useAuth();

  if (isLoggedIn && !user.verify) {
    return Component;
  }

  return isLoggedIn && user.verify ? (
    <Navigate to={redirectTo} />
  ) : (
    <Component />
  );
};
