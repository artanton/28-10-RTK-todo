import { IUser } from '../../helpers/Auth.types';
import { useAuth } from '../../Hooks';
import { Greating, HomePageContainer, Note } from './HomePageStyled';

const Home = () => {
  const {
    user: { name },
  } = useAuth() as { user: IUser };

  return (
    <HomePageContainer>
      <Greating>Hello {!name ? '' : name}!</Greating>
      <Greating>Welcome to ToDo List App.</Greating>
      {!name && (
        <Note>
          Please note that the app has a delay at startup because it uses a free
          server that tends to go to sleep when there are no requests.
        </Note>
      )}
    </HomePageContainer>
  );
};
export default Home;
