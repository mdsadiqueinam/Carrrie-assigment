import { Priority } from "./priority.enum";
import { Status } from "./status.enum";

export interface ITodoForm {
  title: string;
  description?: string;
  dueDate: Date | string |null;
  status: Status;
  priority: Priority;
}

export interface ITodo extends ITodoForm {
  _id: string;
  dueDate: string | Date;
}

export interface IUpdateTodoForm {
  id: string;
  status?: Status;
  priority?: Priority;
  title?: string;
  description?: string;
  dueDate?: string;
}