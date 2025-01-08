import { Helmet } from 'react-helmet-async';

import { LoginForm } from './components/LogInForm';
import { Header, Link, TextBlock } from '../Register/RegisterPageStyled';
import {useSelector, useDispatch} from 'react-redux';
import { selectErrorMessage } from '../../redux/auth/selectors';
// import { resendVerify } from '../../redux/auth/operators';
import { Button } from '../Register/RegisterPageStyled';
import { AppDispatch } from '../../redux/store';
import { useAuth } from '../../Hooks';
import { useResendVerifyMutation } from '../../redux/auth/sliceApi';

export default function Login() {
  const errorMessage = useSelector(selectErrorMessage)
  // const dispatch = useDispatch<AppDispatch>();
  const [resendVerify]= useResendVerifyMutation()
 const {user} = useAuth();
 const email = user?.email;
const onSubmit=()=>resendVerify(email);
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Header>Sign in</Header>
      <LoginForm />
      {errorMessage !=='Email is not verified' ? (
       <TextBlock>
       <p>
         <Link href="/28-10-RTK-Next-todo/register">Create an Account</Link>
       </p>
     </TextBlock>
      ) : (
        <TextBlock>
          <p style={{color:"red"}}>E-mail is NOT vetified</p>
          <p style={{color:"red", marginBottom:20}}>Resend verification code </p>
          <p>
            <Button type='submit' onClick={onSubmit} >Send</Button>
          </p>
        </TextBlock>
        
      )}
      
    </>
  );
}
