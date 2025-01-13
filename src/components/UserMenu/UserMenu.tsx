// import { logout } from '../../redux/auth/operators';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../../redux/store';
import { useAuth } from '../../Hooks/useAuth';
import { LogOutButton, LogOutMenu, Name, UserAvatar } from './UserMenuStyled';
import { FC, useState } from 'react';
import { Modal } from '../../Pages/mainPage/Components/modal/modalWindow';
import { UserSettings } from './component/userSettings/userSettings';
import { IUser } from '../../helpers/Auth.types';
import { useLogoutMutation } from '../../redux/sliceApi';

const baseURL = `${process.env.REACT_APP_API_URL}`;
// const baseURL = 'https://recursive-todo-api-1.onrender.com'

export const UserMenu: FC = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth() as { user: IUser };
  // console.log(store.getState());
  const [showModal, setShowModal] = useState(false);
  //   const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [logout] = useLogoutMutation();
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  const isDefaultAvatar = user.avatarURL
    ? user.avatarURL.split('/').includes('gravatar.com')
    : false;

  const openUserModal = () => {
    <UserSettings />;
    openModal();
  };

  return (
    <LogOutMenu>
      <Name>{user.name}</Name>
      <span>
        {isDefaultAvatar ? (
          <UserAvatar
            src={`${user.avatarURL}`}
            alt="userPhoto"
            onClick={openUserModal}
          />
        ) : (
          <UserAvatar
            src={`${baseURL}/${user.avatarURL}`}
            alt="userPhoto"
            onClick={openUserModal}
          />
        )}
      </span>
      <LogOutButton to="/" type="button" onClick={logout}>
        Logout
      </LogOutButton>
      <Modal isOpen={showModal} onClose={closeModal}>
        <UserSettings />
      </Modal>
    </LogOutMenu>
  );
};
