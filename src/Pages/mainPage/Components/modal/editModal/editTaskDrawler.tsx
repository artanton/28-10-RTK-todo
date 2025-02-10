import { FC } from 'react';
import { IeditTaskModal } from '../../../../../helpers/Task.types';
import { TaskForm } from '../../taskForm/taskForm';

export const EditTaskDrawler: FC<IeditTaskModal> = ({
  _id,
  title,
  text,
  date,
  onClose,
}) => {
  return (
    <div>
      <h2 style={{ padding: '20px', textAlign: 'center' }}>Edit Task</h2>

      <TaskForm
        _id={_id}
        title={title}
        text={text}
        date={date}
        onClose={onClose}
      />
    </div>
  );
};
