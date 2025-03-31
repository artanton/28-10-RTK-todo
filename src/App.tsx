import { lazy } from 'react';

import { Route, Routes } from 'react-router-dom';
import { AppLayout } from './AppLauout';
import { PrivateRoute } from './Routes/PrivatRoute';
import { RestrictedRoute } from './Routes/ResrtrictedRoute';

import { MagnifyingGlass } from 'react-loader-spinner';
import { Loader } from './AppLayoutStyled';
import { useRefreshQuery } from './redux/sliceApi';


const HomePage = lazy(() => import('./Pages/Home/HomePage'));
const RegisterPage = lazy(() => import('./Pages/Register/RegisterPage'));
const LoginPage = lazy(() => import('./Pages/Login/LoginPage'));
const TaskPage = lazy(() => import('./Pages/mainPage/TaskPage'));
const NotFoundPage = lazy(() => import('./Pages/notFoundPage/NotFoundPage'));

export const App = () => {
  const { isLoading } = useRefreshQuery();

  return isLoading ? (
    <Loader>
      <h2 style={{ color: 'red', width: '40%', textAlign: 'center' }}>
        Please note that the app has a delay at startup because it uses a free
        server that tends to go to sleep when there are no requests.
      </h2>
      <MagnifyingGlass
        visible={true}
        height="120"
        width="120"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#3d9bba"
        color="#0f0d0d"
      />
    </Loader>
  ) : (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/tasks" component={RegisterPage} />
          }
        />

        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/tasks" component={LoginPage} />
          }
        />

        <Route
          path="/tasks"
          element={<PrivateRoute redirectTo="/login" component={TaskPage} />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
