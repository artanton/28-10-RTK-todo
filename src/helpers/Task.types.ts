export interface ITask {
  _id: string;
  title: string;
  text: string;
  date: string;
  parentId: string;
  subLevel: number;
  done: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface IState {
  tasks: ITask[];
  isLoading: boolean;
  error: null | string | unknown;
}

export interface ITaskItemProp {
  task: Omit<ITask, 'parentId'>;
  color: string;
  children: React.ReactNode;
}

export interface IgeneralModal {
  onClose: () => void;
  isOpen: boolean;
  children: React.ReactNode;
}

export interface IcreateTaskProp extends Pick<ITask, 'parentId' | 'subLevel'> {
  onClose: () => void; 
}

export interface IaddTaskProp extends Pick<ITask, '_id' | 'subLevel'> {
  onClose: () => void; 
}

export interface IdeleteTaskModal extends Pick<ITask, '_id'> {
  onClose: () => void;
}

export  interface IeditTaskModal
  extends Pick<ITask, '_id' | 'title' | 'date' | 'text'> {
  onClose: () => void;
}

export  interface ITaskContentProps {
  task: Omit<ITask, 'parentId'>;
  onClose: () => void;
}