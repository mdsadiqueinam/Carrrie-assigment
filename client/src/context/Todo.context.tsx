import { createContext, useReducer, useEffect, useContext } from "react";
import { axiosInstance } from "config/axios.config";
import { ITodo, ITodoForm, IUpdateTodoForm } from "interface/Todo.interface";

interface PayloadProps {
  todos?: Array<ITodo>;
  loading?: boolean;
  error?: string | Array<string>;
}

interface IOptions {
  onSuccess?: (res: any) => void;
  onError?: (error: any) => void;
}

interface TodoState extends PayloadProps {
  deleteTodo?: (id: string, options?: IOptions) => void;
  updateTodo?: (updateTodo: IUpdateTodoForm, options?: IOptions) => void;
  createTodo?: (todo: ITodoForm, options?: IOptions) => void;
}

const initialState: TodoState = {
  todos: [],
  loading: true,
  deleteTodo: (id: string, options?: IOptions) => {},
  updateTodo: (updateTodo: IUpdateTodoForm, options?: IOptions) => {},
  createTodo: (todo: ITodoForm, options?: IOptions) => {},
};

const TodoContext = createContext(initialState);

function todoReducer(
  state: any,
  action: { type: string; payload: PayloadProps }
) {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        todos: action.payload.todos,
        loading: action.payload.loading,
        error: action.payload.error,
      };
    case "LOADING":
      return {
        ...state,
        loading: action.payload.loading,
      };
    case "ERROR":
      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

function TodoProvider(props: any) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const loading = () => {
    dispatch({ type: "LOADING", payload: { loading: true } });
  };

  useEffect(() => {
    loading();
    axiosInstance
      .get("/todo/view")
      .then((res) => {
        dispatch({
          type: "UPDATE",
          payload: {
            todos: res?.data ? res.data : [],
            loading: false,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const deleteTodo = (id: string, options?: IOptions) => {
    loading();

    axiosInstance
      .delete(`/todo/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        const index = state.todos.findIndex((todo: any) => todo._id === id);
        state.todos.splice(index, 1);
        dispatch({
          type: "UPDATE",
          payload: {
            todos: state.todos,
            loading: false,
          },
        });
        options && options.onSuccess && options.onSuccess(res);
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: "ERROR",
          payload: {
            loading: false,
            error: err?.response?.data
              ? err.response.data
              : "Something Went Wrong",
          },
        });
        options && options.onError && options.onError(err?.response);
      });
  };

  const createTodo = (todo: ITodoForm, options?: IOptions) => {
    loading();

    axiosInstance
      .post("/todo/create", todo)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "UPDATE",
          payload: {
            todos: [...state.todos, res.data],
            loading: false,
          },
        });
        options && options.onSuccess && options.onSuccess(res);
      })
      .catch((err) => {
        console.error(err.response);
        dispatch({
          type: "ERROR",
          payload: {
            loading: false,
            error: err?.response?.data
              ? err.response.data
              : "Something Went Wrong",
          },
        });
        options && options.onError && options.onError(err?.response);
      });
  };

  const updateTodo = (updateTodo: IUpdateTodoForm, options?: IOptions) => {
    loading();

    axiosInstance
      .patch("todo/update", updateTodo)
      .then((res) => {
        const index = state.todos.findIndex((todo: any) => todo._id === updateTodo.id);
        state.todos[index] = res.data;
        dispatch({
          type: "UPDATE",
          payload: {
            todos: state.todos,
            loading: false,
          },
        });
        options && options.onSuccess && options.onSuccess(res);
      })
      .catch((err) => {
        console.error(err.response);
        dispatch({
          type: "ERROR",
          payload: {
            loading: false,
            error: err?.response?.data
              ? err.response.data
              : "Something Went Wrong",
          },
        });
        options && options.onError && options.onError(err?.response);
      });
  };

  return (
    <TodoContext.Provider
      value={{ ...state, deleteTodo, createTodo, updateTodo }}
      {...props}
    />
  );
}

function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
}

export default TodoProvider;
export { useTodo };
