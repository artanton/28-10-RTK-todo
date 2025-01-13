import { Navigate } from 'react-router-dom';
// import { useRefreshQuery } from '../redux/auth/sliceApi';
import { useAuth } from '../Hooks';

// interface PrivateRouteProps {
//   component: React.ComponentType;
//   redirectTo?: string;
// }

// export const PrivateRoute: React.FC<PrivateRouteProps> = ({
export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  // const {isLoading} =useRefreshQuery();
  const shouldRedirect = !isLoggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};
