import { TaskForm } from '../taskForm/taskForm';

import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { ITask } from '../../../../helpers/Task.types';

interface TemporaryDrawerProps extends Partial<ITask> {
  open: boolean;
  onClose:  () => void;
}

const  TemporaryDrawer: FC<TemporaryDrawerProps> = ({ open,  parentId, subLevel, onClose })=> {
 
  return (
    <div>
     
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box sx={{ width: '50vw' }} role="presentation">
          <Box sx={{ p: 2 }}>
            <h2
              style={{
                padding: 10,
              }}
            >
              Add New Task
            </h2>
            <Divider />
            <TaskForm parentId = {parentId} subLevel ={subLevel} onClose={onClose} />
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}
export default TemporaryDrawer

