import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  DescriptionFieldStyled,
  ErrorMessageStyled,
  FieldGroup,
  FieldStyled,
  FormStyled,
} from './taskFormStyled';
// import { useDispatch } from 'react-redux';
// import { addTask } from '../../../../redux/tasks/operators';
import { ITask } from '../../../../helpers/Task.types';
import { FC } from 'react';
// import { AppDispatch } from '../../../../redux/store';
import { formatToString } from '../../../../helpers/helper';
import { useAddTaskMutation } from '../../../../redux/sliceApi';
// import Notiflix from 'notiflix';

interface TaskFormProp extends Partial<ITask> {
  onClose: () => void;
}

const taskSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  text: Yup.string(),
  date: Yup.string()
    // .matches(/^[^!]*$/, 'The task cannot contain the "!" character.')
    
});

export const TaskForm: FC<TaskFormProp> = ({ parentId, subLevel, onClose }) => {
  // const dispatchTask = useDispatch<AppDispatch>();
const [addTask]=useAddTaskMutation();
  const onAdd = (
    values: { title: string, text: string; date: string },
    actions: FormikHelpers<{  title: string, text: string; date: string }>
  ) => {
    // if (values.text.includes('!')) {
    //   Notiflix.Notify.failure('The task field cannot contain "!" character.');
    //   return;
    // }
    if (!parentId) {
      parentId = '0';
      subLevel = 0;
    } else {
      subLevel = (subLevel ?? 0) + 1;
    }

    const newTask = {
      title: values.title,
      text: values.text,
      date: values.date,
      parentId: parentId,
      subLevel: subLevel,
      done: false,
    };
    console.log(newTask);
    console.log(formatToString(Date()));

    addTask(newTask);
    actions.resetForm();
    if (onClose) {
      onClose();
    }
  };
  const initialValues={
    title: '',
    text: '',
    date: new Date().toString(),
  };
  return (
    <Formik
      initialValues ={initialValues}
      validationSchema={taskSchema}
      onSubmit={onAdd}
      setFieldValue
    >
      <FormStyled>
      <FieldGroup>
          <FieldStyled
            name="title"
            type="title"
            placeholder="Task name"
          />
          <ErrorMessageStyled name="text" component="span" />
        </FieldGroup>
        <FieldGroup>
          <DescriptionFieldStyled
            name="text"
            type="text"
            placeholder="Task description"
          />
          <ErrorMessageStyled name="text" component="span" />
        </FieldGroup>
        <FieldGroup>
          <FieldStyled
            name="date"
            type="datetime-local"
            placeholder={formatToString(initialValues.date)}
          />
          <ErrorMessageStyled name="text" component="span" />
        </FieldGroup>

        <Button type="submit">Add Task</Button>
      </FormStyled>
    </Formik>
  );
};
