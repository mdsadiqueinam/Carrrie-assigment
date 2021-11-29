import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { CardActionArea, useTheme, Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { SxProps, Theme } from "@mui/system";
import TodoOptionsMenu from "./TodoOptionsMenu.component";
import TodoAlertDialog from "./TodoAlertDialog.component";
import { ITodo } from "interface/Todo.interface";
import { Status } from "interface/status.enum";
import { Priority } from "interface/priority.enum";

interface TodoCardProps {
  todo: ITodo;
  sx?: SxProps<Theme>;
  loading?: boolean;
  onToggle?: (id: string, isCompleted: boolean) => void;
  onDelete?: (id: string) => void;
  onUpdate?: (todo: ITodo) => void;
}

export default function TodoCard(_props: TodoCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const { sx, todo, loading } = _props;
  const theme = useTheme();

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    if (_props.onDelete) {
      _props.onDelete(todo._id);
    } else {
      console.error("onDelete function is not defined");
    }
  };

  const handleUpdate = () => {
    if (_props.onUpdate) {
      _props.onUpdate(todo);
    } else {
      console.error("onUpdate function is not defined");
    }
  }

  const statusColor =
    todo.status === Status.OPEN
      ? theme.palette.info.main
      : todo.status === Status.PENDING
      ? theme.palette.warning.main
      : theme.palette.primary.main;

  const priorityColor =
    todo.priority === Priority.HIGH
      ? theme.palette.error.main
      : todo.priority === Priority.MEDIUM
      ? theme.palette.warning.main
      : theme.palette.primary.main;


  return (
    <Card sx={sx}>
      <CardHeader
        avatar={
          <CheckCircleOutlineIcon
            sx={{ fontSize: "48px", color: statusColor }}
          />
        }
        action={
          <TodoOptionsMenu
            menuItemsProps={{
              onUpdate: handleUpdate,
              onDelete: handleDialogOpen,
            }}
          />
        }
        title={
          <CardActionArea
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <Typography gutterBottom variant="h6" component="h2">
              {todo.title}
            </Typography>
          </CardActionArea>
        }
        subheader={
          <Box className={"todo-detail"}>
            <Typography variant="body2" color="textSecondary" component="span"  >
              {new Date(todo.dueDate).toString()}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="span" >
              Priority:{" "}
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
                sx={{
                  color: priorityColor,
                }}
              >
                {todo.priority}
              </Typography>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="span">
              Status:{" "}
              <Typography
                variant="body2"
                color="textSecondary"
                component="span"
                sx={{
                  color: statusColor,
                }}
              >
                {todo.status}
              </Typography>
            </Typography>
          </Box>
        }
      />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ margin: "10px 20px" }}>
          <Typography>{todo.description}</Typography>
        </CardContent>
      </Collapse>
      <TodoAlertDialog
        loading={loading}
        open={open}
        handleClose={handleDialogClose}
        handleConfirm={handleDelete}
      />
    </Card>
  );
}

export type { TodoCardProps };
