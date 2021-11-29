import Todo from "components/Todo/Todo.component";
import TodoProvider from "context/Todo.context";
import TopAppBar from "components/AppBar/TopAppBar.component";

export default function Home() {
  return (
    <div>
      <TopAppBar />
      <TodoProvider>
        <Todo />
      </TodoProvider>
    </div>
  );
}
