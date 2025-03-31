import React, { useState } from 'react';

import { formatToString } from '../../../../helpers/helper';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { DeleteConfirmationModal } from '../modal/deleteModal/deleteModalWindow';

import { AddSubTaskModal } from '../modal/addSubTaskModal/addSubtaskModal';

import { Modal } from '../modal/modalWindow';
import {
  AddSubTaskButton,
  DeleteButton,
  DoneCheckbox,
  EditButton,
  TaskRow,
} from './taskItemStyled';
import { ITaskItemProp } from '../../../../helpers/Task.types';

import { VscTrash } from 'react-icons/vsc';
import { AiOutlineEdit } from 'react-icons/ai';
import { RiAddLargeLine } from 'react-icons/ri';
import { useUpdateTaskMutation } from '../../../../redux/sliceApi';
import { TaskContent } from '../modal/taskModal/taskModal';
import TemporaryDrawer from '../swipeableEdgeDrawer/SwipeableEdgeDrawer';

import { EditTaskDrawler } from '../modal/editModal/editTaskDrawler';

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const TaskItem: React.FC<ITaskItemProp> = ({ task, color }) => {
  const { _id, title, text, date, subLevel, done } = task;
  
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const [isDone, setIsDone] = useState(done);
  const [updateTask] = useUpdateTaskMutation();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event && setIsDone(!isDone);
    updateTask({ _id, done: !isDone });
  };

  const [isDrawlerOpen, setOpenDrawler] = useState<boolean>(false);
  const [drawlerContent, setDrawlerContent] = useState<React.ReactNode | null>(null);

  const toggleDrawer = (newOpen: boolean) => () => {
    console.log('isDrawlerOpen1:', isDrawlerOpen);
    setOpenDrawler(newOpen);
  };

  const formattedDate = formatToString(date);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const openSubTaskDrawler = () => {
    setDrawlerContent(
      <AddSubTaskModal _id={_id} subLevel={subLevel} onClose={() => toggleDrawer(false)()} />
    );
    toggleDrawer(true)();
  };

  const openEditDrawler = () => {
    setDrawlerContent(
      <EditTaskDrawler     
       _id={_id}
      title={title}
      text={text}
      date={date}
      onClose={() => toggleDrawer(false)()}
      />     
    );
    console.log('isDrawlerOpen:', isDrawlerOpen);
    toggleDrawer(true)();
    console.log('isDrawlerOpen:', isDrawlerOpen);
  };

  const openTaskModal = () => {
    setModalContent(
      <TaskContent
      task={task}
        onClose={closeModal}
      />
    );
    openModal();
  };


  const openDeleteModal = () => {
    setModalContent(<DeleteConfirmationModal _id={_id} onClose={closeModal} />);
    openModal();
  };

  function CSSGrid() {
    return (
      <TaskRow>
        <Box sx={{ width: 1 }}>
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
            {!done ? (
              <>
                <Box gridColumn="span 1">
                  <Item style={{ backgroundColor: `${color}` }}>
                    {<DoneCheckbox checked={isDone} onChange={handleChange} />}
                  </Item>
                </Box>
                <Box gridColumn="span 5">
                  <Item onClick = {openTaskModal} style={{ backgroundColor: ` ${color}` }}>{title}</Item>
                </Box>
                <Box gridColumn="span 3">
                  <Item>{formattedDate}</Item>
                </Box>
              </>
            ) : (
              <>
                <Box gridColumn="span 1">
                  <Item>
                    {<DoneCheckbox checked={isDone} onChange={handleChange} />}
                  </Item>
                </Box>
                <Box gridColumn="span 5">
                  <Item style={{ backgroundColor: `gray`, textDecoration: 'line-through' }}>{title}</Item>
                </Box>
                <Box gridColumn="span 3">
                  <Item style={{ backgroundColor: `gray`, textDecoration: 'line-through' }}>
                    {formattedDate}
                  </Item>
                </Box>
              </>
            )}
            <Box gridColumn="span 1">
              <Item>
                <AddSubTaskButton onClick={openSubTaskDrawler}>
                  <RiAddLargeLine style={{ height: '14px' }} />
                </AddSubTaskButton>
              </Item>
            </Box>
            <Box gridColumn="span 1">
              <Item>
                <EditButton onClick={openEditDrawler}>
                  <AiOutlineEdit style={{ height: '14px' }} />
                </EditButton>
              </Item>
            </Box>
            <Box gridColumn="span 1">
              <Item>
                <DeleteButton onClick={openDeleteModal}>
                  <VscTrash style={{ height: '14px' }} />
                </DeleteButton>
              </Item>
            </Box>
          </Box>
        </Box>
        <Modal isOpen={showModal} onClose={closeModal}>
          {modalContent}
        </Modal>
        <TemporaryDrawer open={isDrawlerOpen} onClose={toggleDrawer(false)}>
          {drawlerContent}
        </TemporaryDrawer>
      </TaskRow>
    );
  }

  return <CSSGrid />;
};
