import Todo from "components/Todo/Todo.component";
import TodoProvider from "context/Todo.context";

export default function Home() {
  return (
    <div>
      <TodoProvider>
        <Todo />
      </TodoProvider>
    </div>
  );
}
