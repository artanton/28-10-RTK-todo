import { useAuth } from '../../Hooks/useAuth';
import { LogOutButton, LogOutMenu, Name, UserAvatar } from './UserMenuStyled';
import { FC, useState } from 'react';
import { Modal } from '../../Pages/mainPage/Components/modal/modalWindow';
import { UserSettings } from './component/userSettings/userSettings';
import { IUser } from '../../helpers/Auth.types';
import { useLogoutMutation } from '../../redux/sliceApi';

const baseURL = `${process.env.REACT_APP_API_URL}`;

export const UserMenu: FC = () => {
  const { user } = useAuth() as { user: IUser };

  const [showModal, setShowModal] = useState(false);

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
