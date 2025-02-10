import { Checkbox } from '@mui/material';
import styled from 'styled-components';
export const TaskRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 70vw;
  margin-bottom: 10px;
`;

export const DoneCheckbox = styled(Checkbox)`
 width: 20px;
 height:20px;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;

  cursor: pointer;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
export const AddSubTaskButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
