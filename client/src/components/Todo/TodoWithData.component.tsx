import TodoCard from "./TodoCard.component";
import Collapse from "@mui/material/Collapse";
import { TransitionGroup } from "react-transition-group";
import { useTodo } from "context/Todo.context";
import { Status } from "interface/status.enum";
import { Priority } from "interface/priority.enum";
import { ITodo } from "interface/Todo.interface";

interface TodoWithDataProps {
  status: Status;
  onUpdate?: (todo: ITodo) => void;
}

interface TodoWithPriorityProps extends TodoWithDataProps {
  priority: Priority;
}

function MapTodoWithPriority(_props: TodoWithPriorityProps) {
  const { todos, loading, deleteTodo } = useTodo();
  const { status, priority, onUpdate } = _props;

  return (
    <TransitionGroup>
      {todos &&
        todos.map((todo) => {
          if (todo.status === status && todo.priority === priority) {
            return (
              <Collapse key={todo._id} in={true} timeout={500}>
                <TodoCard
                  loading={loading}
                  sx={{
                    margin: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.109)",
                    borderRadius: "50px",
                  }}
                  todo={todo}
                  onDelete={deleteTodo}
                  onUpdate={onUpdate}
                />
              </Collapse>
            );
          }

          return null;
        })}
    </TransitionGroup>
  );
}

export default function TodoWithData(_props: TodoWithDataProps) {
  return (
    <>
      <MapTodoWithPriority {..._props} priority={Priority.HIGH} />
      <MapTodoWithPriority {..._props} priority={Priority.MEDIUM} />
      <MapTodoWithPriority {..._props} priority={Priority.LOW} />
    </>
  );
}
