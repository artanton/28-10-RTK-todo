import { GlobalStyle } from '../../globalStyles/GlobalStyle';
import { TaskList } from './Components/taskList/taskList';

import { FC, useState } from 'react';

import { MagnifyingGlass } from 'react-loader-spinner';

import TemporaryDrawer from './Components/swipeableEdgeDrawer/SwipeableEdgeDrawer';
import { Container, DrawlerBtn, Loader } from './TaskPageStyled';

import { Helmet } from 'react-helmet-async';
import { useFetchTasksQuery } from '../../redux/sliceApi';
import Button from '@mui/material/Button';

import { ITask } from '../../helpers/Task.types';
import { CreateTaskDrawler } from './Components/modal/createTaskDrawler/createTaskDrawler';

export interface TemporaryDrawerProps extends Partial<ITask> {}
const Tasks: FC<TemporaryDrawerProps> = ({ parentId = '0', subLevel = 0 }) => {
  const {
    data: tasks,
    isLoading,
    isSuccess,

    error,
  } = useFetchTasksQuery();

  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Container>
      <Helmet>
        <title>Your tasks</title>
      </Helmet>
      <DrawlerBtn style={{ zIndex: 0, padding: '40px' }}>
        <Button variant="contained" onClick={toggleDrawer(true)}>
          Create Task
        </Button>
      </DrawlerBtn>
      <TemporaryDrawer open={open} onClose={toggleDrawer(false)}>
        <CreateTaskDrawler
          parentId={parentId}
          subLevel={subLevel}
          onClose={toggleDrawer(false)}
        />
      </TemporaryDrawer>

      {isLoading && !error && (
        <Loader>
          <MagnifyingGlass
            visible={true}
            height="120"
            width="120"
            ariaLabel="magnifying-glass-loading"
            wrapperStyle={{}}
            wrapperClass="magnifying-glass-wrapper"
            glassColor="#3d9bba"
            color="#0f0d0d"
          />
        </Loader>
      )}

      {isSuccess && tasks.length > 0 ? (
        <div>
          <TaskList />
        </div>
      ) : (
        <h2>Add Your first task</h2>
      )}

      <GlobalStyle />
    </Container>
  );
};
export default Tasks;
