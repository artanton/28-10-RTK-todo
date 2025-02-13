import { FC } from 'react';

import { TaskForm } from '../../taskForm/taskForm';
import { IcreateTaskProp } from '../../../../../helpers/Task.types';

  
  export const CreateTaskDrawler: FC<IcreateTaskProp> = ({ 
    parentId,
    onClose,
    subLevel, }) => {
  return (
    <div>
      <h2 style={{ padding: '20px', textAlign: 'center' }}> Create Task</h2>

      <TaskForm parentId={parentId} subLevel={subLevel} onClose={onClose} />
    </div>
  );
};