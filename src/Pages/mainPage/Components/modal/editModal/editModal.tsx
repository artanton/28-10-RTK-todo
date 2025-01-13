// import { useDispatch } from 'react-redux';
// import { updateTask } from '../../../../../redux/tasks/operators';
import { ModalButton, TextInput } from './editModalStyled';
import { FC, useState } from 'react';
import { IeditTaskModal } from '../../../../../helpers/Task.types';
// import { AppDispatch } from '../../../../../redux/store';
import { useUpdateTaskMutation } from '../../../../../redux/sliceApi';

export const EditTaskModal: FC<IeditTaskModal> = ({
  _id,
  title,
  date,
  text: initialText,
  onClose,
}) => {
  // const dispatch = useDispatch<AppDispatch>();
  const [updateTask] = useUpdateTaskMutation();
  const [text, setText] = useState(initialText);

  const handleUpdate = () => {
    updateTask({ _id, text });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <p>Edit task please</p>

      <form>
        <TextInput
          name="text"
          rows={3}
          value={text}
          onChange={handleChange}
          placeholder="Insert edited task here"
        />
      </form>
      <ModalButton type="button" onClick={handleUpdate}>
        Edit
      </ModalButton>
    </div>
  );
};
