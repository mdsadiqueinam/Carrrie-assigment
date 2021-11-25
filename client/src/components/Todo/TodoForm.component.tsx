import { ChangeEvent } from "react";
import { Box, TextField, MenuItem } from "@mui/material";

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";

import { StatusList } from "interface/status.enum";
import { PriorityList } from "interface/priority.enum";
import { ITodoForm } from "interface/Todo.interface";
import ErrorBox from "components/ErrorBox/ErrorBox.component";

export interface TodoFormProps {
  errors: any;
  values: ITodoForm;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (newDate: Date | null) => void;
}

export default function TodoForm(props: TodoFormProps) {
  const { errors, values, handleChange, handleDateChange } = props;
  
  return (
    <Box
      sx={{
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        rowGap: "20px",
      }}
    >
      {errors.general && <ErrorBox message={errors.general} error={errors.general !== null}/>}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          columnGap: "20px",
        }}
      >
        <TextField
          id="title"
          label="Title"
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
          error={errors.title !== null || errors.general !== null}
          helperText={errors.title}
        />
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DateTimePicker
            label="Due Date and time"
            value={values.dueDate}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField
                {...params}
                id="dueData"
                name="dueDate"
                error={errors.dueDate !== null || errors.general !== null }
                helperText={errors.dueDate}
              />
            )}
            inputFormat="dd/MM/yyyy hh:mm a"
          />
        </LocalizationProvider>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          columnGap: "20px",
        }}
      >
        <TextField
          select
          id="status"
          label="Status"
          name="status"
          value={values.status}
          onChange={handleChange}
          fullWidth
          error={errors.status !== null || errors.general !== null}
          helperText={errors.status}
        >
          {StatusList.map((status: string) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          id="priority"
          label="Priority"
          name="priority"
          value={values.priority}
          onChange={handleChange}
          fullWidth
          error={errors.priority !== null || errors.general !== null}
          helperText={errors.priority}
        >
          {PriorityList.map((priority: string) => (
            <MenuItem key={priority} value={priority}>
              {priority}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <TextField
        id="description"
        label="Description"
        type="text"
        name="description"
        multiline
        rows={4}
        value={values.description}
        onChange={handleChange}
        error={errors.description !== null || errors.general !== null}
        helperText={errors.description}
      />
    </Box>
  );
}
