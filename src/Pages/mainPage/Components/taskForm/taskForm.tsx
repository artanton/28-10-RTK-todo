import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import {
  ButtonContainer,
  ButtonStyled,
  FieldStyled,
  FormStyled,
  TimePickerContainer,
} from './taskFormStyled';

import { ITask } from '../../../../helpers/Task.types';
import { FC } from 'react';
import {
  useAddTaskMutation,
  useUpdateTaskMutation,
} from '../../../../redux/sliceApi';
import {  Divider } from '@mui/material';

interface TaskFormProp extends Partial<ITask> {
  onClose: () => void;
}

const taskSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  text: Yup.string(),
  date: Yup.string(),
});

export const TaskForm: FC<TaskFormProp> = props => {
  const {
    _id,
    title = '',
    text = '',
    date = new Date().toString(),
    parentId,
    subLevel,
    onClose,
  } = props;

  const [updateTask] = useUpdateTaskMutation();
  const [addTask] = useAddTaskMutation();

  const onEdit = (
    values: { title: string; text: string; date: string },
    actions: FormikHelpers<{ title: string; text: string; date: string }>
  ) => {
    const editedTask = {
      _id: _id,
      title: values.title,
      text: values.text,
      date: values.date,
    };
    updateTask(editedTask);
    actions.resetForm();

    onClose();
  };
  const onAdd = (
    values: { title: string; text: string; date: string },
    actions: FormikHelpers<{ title: string; text: string; date: string }>
  ) => {
    const taskParentId = parentId ?? '0';
    const taskSubLevel = parentId ? 0 : (subLevel ?? 0) + 1;

    const newTask = {
      title: values.title,
      text: values.text,
      date: values.date,
      parentId: taskParentId,
      subLevel: taskSubLevel,
      done: false,
    };

    addTask(newTask);
    actions.resetForm();

    onClose();
  };
  const submit = (
    values: { title: string; text: string; date: string },
    actions: FormikHelpers<{ title: string; text: string; date: string }>
  ) => {
    if (_id) {
      onEdit(values, actions);
    } else {
      onAdd(values, actions);
    }
  };

  const initialValues = {
    title: title,
    text: text,
    date: date,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: taskSchema,
    onSubmit: submit,
  });

  const { values,  handleChange, handleSubmit, setFieldValue } =
    formik;
  return (
    <>
      <Divider />
      <FormStyled autoComplete="off" onSubmit={handleSubmit}>
        <FieldStyled
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          onChange={handleChange}
          value={values.title}
        />

        <FieldStyled
          id="text"
          name="text"
          label="Task description"
          multiline
          rows={5}
          value={values.text}
          onChange={handleChange}
        />
        <TimePickerContainer>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            name="date"
            label="Shcedule task"
            ampm={false}
            format="YYYY/MM/DD HH:mm"
            value={dayjs(values.date)}
            onChange={newValue =>
              setFieldValue('date', newValue?.toISOString())
            }
          />
        </LocalizationProvider>
        </TimePickerContainer>

        <ButtonContainer>
          {!_id ? (
            <ButtonStyled size="small" variant="contained" type="submit">
              Add Task
            </ButtonStyled>
          ) : (
            <ButtonStyled size="small" variant="contained" type="submit">
              Edit task
            </ButtonStyled>
          )}
        </ButtonContainer>
      </FormStyled>
    </>
  );
};
