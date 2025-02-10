import { FC } from 'react';
import { IaddTaskProp } from '../../../../../helpers/Task.types';
import { TaskForm } from '../../taskForm/taskForm';

export const AddSubTaskModal: FC<IaddTaskProp> = ({
  _id,
  onClose,
  subLevel,
}) => {
  return (
    <div>
      <h2 style={{ padding: '20px', textAlign: 'center' }}>Add SubTask</h2>

      <TaskForm parentId={_id} onClose={onClose} subLevel={subLevel} />
    </div>
  );
};
