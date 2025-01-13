import { lazy,
  //  useEffect
  } from 'react';
// import {useDispatch} from 'react-redux';
// import { AppDispatch} from './redux/store';
// import { useAuth } from './Hooks/useAuth';
import { Route, Routes } from 'react-router-dom';
import { AppLayout } from './AppLauout';
import { PrivateRoute } from './Routes/PrivatRoute';
import { RestrictedRoute } from './Routes/ResrtrictedRoute';

// import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';

import { MagnifyingGlass } from 'react-loader-spinner';
import { Loader } from './AppLayoutStyled';
import {useRefreshQuery} from './redux/sliceApi';
// import { refreshUser } from './redux/auth/AuthSlice';

// import { useRefreshQuery } from './redux/auth/sliceApi';
// import { setupAxiosInterceptors } from './helper/axiosInterceptr';

const HomePage = lazy(() => import('./Pages/Home/HomePage'));
const RegisterPage = lazy(() => import('./Pages/Register/RegisterPage'));
const LoginPage = lazy(()=> import('./Pages/Login/LoginPage'));
const TaskPage = lazy(()=> import ('./Pages/mainPage/TaskPage'));
const NotFoundPage = lazy (()=>import('./Pages/notFoundPage/NotFoundPage'));

export const App = () => {
//  const {isLoggedIn}= useAuth();
  const {isLoading}= useRefreshQuery();
//   const {error} = useRegenerateQuery();
  
//   const [logout] = useLogoutMutation();
  // useRefreshQuery().
 
//  if(isLoggedIn){
  
//   // console.log(error);
// console.log("!!!");

  
//  }
  
  // const dispatch =useDispatch<AppDispatch>();
  // const { isRefreshing } = useAuth();
  // const [state] = useState(0);
  // const [hasMounted, setHasMounted] = useState(false);
  
  

  // useEffect(()=>{
  //   dispatch(refreshUser(user));    
  // },[dispatch, user])


// useEffect(() => {
//   if (hasMounted) {
//     setupAxiosInterceptors(store);
//   } else {
//     setHasMounted(true);
//   }
// }, [state, hasMounted]);






return isLoading?(
  <Loader>
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
): (
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
        path='/login'
        element={
          <RestrictedRoute redirectTo="/tasks" component={LoginPage } />
        }
      />

      <Route
      path='/tasks'
      element={
        <PrivateRoute redirectTo='/login' component={TaskPage}/>
      } />

      <Route 
      path='*' 
      element={<NotFoundPage />} />
    </Route>
  </Routes>
);
};
