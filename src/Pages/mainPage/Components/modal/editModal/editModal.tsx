import { ModalButton, TextInput, TitleInput } from './editModalStyled';
import { FC, useState } from 'react';
import { IeditTaskModal } from '../../../../../helpers/Task.types';

import { useUpdateTaskMutation } from '../../../../../redux/sliceApi';

export const EditTaskModal: FC<IeditTaskModal> = ({
  _id,
  title: initialTitle,
  date,
  text: initialText,
  onClose,
}) => {
  const [updateTask] = useUpdateTaskMutation();
  const [text, setText] = useState(initialText);
  const [title, setTitle] = useState(initialTitle);

  console.log(_id, title, text);
  const handleUpdate = () => {
    updateTask({ _id, title, text });
    onClose();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <p>Edit task please</p>

      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <TitleInput
          name="title"
          // value={title}
          onChange={handleTitleChange}
          placeholder="Insert edited title"
        />
        <TextInput
          name="text"
          rows={3}
          value={text}
          onChange={handleTextChange}
          placeholder="Insert edited task here"
        />
      </form>
      <ModalButton type="button" onClick={handleUpdate}>
        Edit
      </ModalButton>
    </div>
  );
};
