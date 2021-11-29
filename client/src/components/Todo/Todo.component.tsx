import { SyntheticEvent, useState } from "react";
import TodoWithData from "./TodoWithData.component";
import { Box, LinearProgress, Tabs, Tab, Fab } from "@mui/material";
import TabPanel from "components/Tabs/TabPanel.component";
import AddIcon from "@mui/icons-material/Add";
import TodoFormDialog from "./TodoFormDialog.component";
import { useTodo } from "context/Todo.context";
import { Status } from "interface/status.enum";
import { ITodo } from "interface/Todo.interface";
import { Priority } from "interface/priority.enum";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const emptyTodo: ITodo = {
  _id: "",
  title: "",
  description: "",
  dueDate: "",
  status: Status.OPEN,
  priority: Priority.LOW,
};

export default function Todo() {
  const { loading } = useTodo();
  const [value, setValue] = useState(0);
  const [todo, setTodo] = useState(null as ITodo | null);

  const handleFormOpen = () => {
    setTodo(emptyTodo);
  };

  const handleFormClose = () => {
    setTodo(null);
  };

  const handleUpdateTodo = (todo: ITodo) => {
    setTodo(todo);
  };

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="Open Todo" {...a11yProps(0)} />
          <Tab label="Pending Todo" {...a11yProps(1)} />
          <Tab label="Closed Todo" {...a11yProps(2)} />
        </Tabs>
      </Box>
      {loading && <LinearProgress color="secondary" />}
      <TabPanel value={value} index={0}>
        <TodoWithData status={Status.OPEN} onUpdate={handleUpdateTodo} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TodoWithData status={Status.PENDING} onUpdate={handleUpdateTodo} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TodoWithData status={Status.CLOSED} onUpdate={handleUpdateTodo} />
      </TabPanel>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 16, right: 26 }}
        onClick={handleFormOpen}
      >
        <AddIcon />
      </Fab>
      {todo && (
        <TodoFormDialog
          todo={todo}
          onClose={handleFormClose}
          open={todo !== null}
        />
      )}
    </Box>
  );
}
