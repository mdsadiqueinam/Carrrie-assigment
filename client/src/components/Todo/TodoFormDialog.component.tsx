import { useState, ChangeEvent } from "react";
import {
  useMediaQuery,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from "@mui/material";
import TodoForm from "./TodoForm.component";
import { ITodo, ITodoForm } from "interface/Todo.interface";
import { useTodo } from "context/Todo.context";
import  { manageError } from 'utils/utils';

interface TodoFormDialogProps {
  todo: ITodo;
  open: boolean;
  onClose: () => void;
  onOpen?: () => void;
}

export default function TodoFormDialog(props: TodoFormDialogProps) {
  const theme = useTheme();
  const { loading, createTodo, updateTodo } = useTodo();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { todo, open, onClose } = props;

  const [values, setValues] = useState({
    title: todo.title,
    description: todo.description,
    dueDate: todo.dueDate !== "" ? new Date(todo.dueDate) : null,
    status: todo.status,
    priority: todo.priority,
  });

  const [errors, setErrors] = useState({
    title: null,
    description: null,
    dueDate: null,
    status: null,
    priority: null,
    general: null,
  });

  const handleDateChange = (newDate: Date | null) => {
    setValues({ ...values, dueDate: newDate });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    if (todo._id === "") {
      if (createTodo) {
        createTodo(values as ITodoForm, {
          onSuccess: () => {
            onClose();
          },
          onError: (error) => {
            manageError(errors, setErrors, error?.data);
          }
        });
      } else {
        console.error("createTodo is not defined");
      }
    } else {
      if (updateTodo) {
        updateTodo(
          {
            ...values,
            id: todo._id,
            dueDate: values.dueDate ? values.dueDate.toISOString() : "",
          },
          {
            onSuccess: () => {
              onClose();
            },
            onError: (error) => {
              manageError(errors, setErrors, error?.data);
            }
          }
        );
      } else {
        console.error("updateTodo is not defined");
      }
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      PaperProps={{ sx: { borderRadius: "10px", padding: "10px" } }}
    >
      {loading && <LinearProgress />}

      <DialogTitle id="responsive-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <TodoForm
          errors={errors}
          values={values}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} autoFocus variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export type { TodoFormDialogProps };
