import { TaskItem } from '../taskItem/taskItem';
import { TasksList } from './taskListStyled';

import {
  getColorForLevel,
  groupTasksByParentId,
  rootEl,
} from '../../../../helpers/helper';
import { ITask } from '../../../../helpers/Task.types';
import { FC } from 'react';
import { useFetchTasksQuery } from '../../../../redux/sliceApi';

// recursieve func to order tasks correctly

const renderTasks = (
  tasks: ITask[],
  taskMap: Record<string, ITask[]>,
  level = 0
): JSX.Element => {
  return (
    <ul>
      {tasks &&
        tasks.map(task => (
          <li key={task._id} style={{ paddingLeft: 20 }}>
            <TaskItem task={task} color={getColorForLevel(level)} children />
            {taskMap[task._id] &&
              renderTasks(taskMap[task._id], taskMap, level + 1)}
          </li>
        ))}
    </ul>
  );
};

export const TaskList: FC = () => {
  const { data: tasks } = useFetchTasksQuery();
  if (!tasks) {
    return null;
  }

  const taskMap = groupTasksByParentId(tasks);

  const topLevelTasks = taskMap[rootEl(tasks) || ''] || [];

  return <TasksList>{renderTasks(topLevelTasks, taskMap)}</TasksList>;
};
