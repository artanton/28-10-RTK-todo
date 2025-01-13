import { GlobalStyle } from '../../globalStyles/GlobalStyle';
import { TaskList } from './Components/taskList/taskList';

// import { useSelector, useDispatch } from 'react-redux';
// import {
//   selectTask,
//   selectError,
//   selectIsLoading,
// } from '../../redux/tasks/selectors';
import { FC, useState } from 'react';
// import { fetchTasks } from '../../redux/tasks/operators';
import { MagnifyingGlass } from 'react-loader-spinner';

import TemporaryDrawer from './Components/swipeableEdgeDrawer/SwipeableEdgeDrawer';
import { Container, DrawlerBtn, Loader } from './TaskPageStyled';
// import { AppDispatch } from '../../redux/store';
import { Helmet } from 'react-helmet-async';
import { useFetchTasksQuery } from '../../redux/sliceApi';
import Button from '@mui/material/Button';

const Tasks: FC = () => {
  // const allTasks = useSelector(selectTask);

  const {
    data: tasks,
    isLoading,
    isSuccess,
    // isError,
    error,
  } = useFetchTasksQuery();
  // const dispatch = useDispatch<AppDispatch>();
  // const isLoading = useSelector(selectIsLoading);
  // const error = useSelector(selectError);

  // useEffect(() => {
  //   dispatch(fetchTasks());
  // }, [dispatch]);
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
      <TemporaryDrawer open={open} onClose={toggleDrawer(false)} />

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
