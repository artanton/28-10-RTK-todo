import axios from 'axios';
// import { refreshTokens } from '../redux/auth/operators';

// export const setupAxiosInterceptors = (store: any) => {
//   axios.interceptors.response.use(
//     response => {
//       return response;
//     },
//     async error => {
//       const originalRequest = error.config;
      
//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;        

//         try {
//           if (store) {
//             await store.dispatch(refreshTokens());
//             console.log(originalRequest);
//             return axios(originalRequest);
//           }
//         } catch (refreshError) {
//           console.log('Error', refreshError);
//           return Promise.reject(refreshError);
//         }
//       }
//       return Promise.reject(error);
//     }
//   );
// };
