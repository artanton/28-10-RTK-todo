// import { useDispatch } from 'react-redux';

// import { deleteTask} from '../../../../../redux/tasks/operators';

import { ButtonContainer, DeleteModalContent, ModalButton } from './deleteModalWindowStyled';
import { FC } from 'react';
import { IdeleteTaskModal } from '../../../../../helpers/Task.types';
import { useDeleteTaskMutation } from '../../../../../redux/sliceApi';
// import { AppDispatch } from '../../../../../redux/store';

export const DeleteConfirmationModal: FC<IdeleteTaskModal> = ({
  _id,
  onClose,
}) => {
  // const dispatch = useDispatch<AppDispatch>();
  const [deleteTask] = useDeleteTaskMutation();
  const handleDelete = async (): Promise<void> => {
    try {
      await deleteTask(_id)

      // dispatch(fetchTasks());
    } catch (error) {
      console.error('Error deleting task:', error);
    }

    onClose();
  };

  return (
    <DeleteModalContent>
      <p style={{textAlign :'center'}}>Are you sure you want to delete this task?</p>
      <ButtonContainer>
        <ModalButton onClick={handleDelete}>Yes</ModalButton>
        <ModalButton onClick={onClose}>No</ModalButton>
      </ButtonContainer>
    </DeleteModalContent>
  );
};
