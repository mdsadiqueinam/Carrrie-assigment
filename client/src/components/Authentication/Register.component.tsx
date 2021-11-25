import { Button, TextField, Typography, Link } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { axiosInstance } from "config/axios.config";
import { useAuth } from "context/Auth.context";
import { makeStyles } from "@mui/styles";
import { checkValues, manageError } from "utils/utils";
import ErrorBox from "components/ErrorBox/ErrorBox.component";

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: "332px",
  },
});

export default function Register() {
  const context = useAuth();
  const classes = useStyles();
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
  });
  const [errors, setErrors] = useState({
    username: null,
    password: null,
    general: null,
    email: null,
    name: null,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hasError = checkValues(values, errors, setErrors);
    if (!hasError) {
      try {
        const { data } = await axiosInstance.post("/user/register", values);
        context.login(data);
        console.log(data);
      } catch (error: any) {
        console.error(error.response.data);
        manageError(errors, setErrors, error?.response?.data);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={"form-container form"}>
        <Typography variant="h2" gutterBottom>
          Sign up
        </Typography>
        <Typography variant="body1" gutterBottom>
          Create an account and start managing your tasks
        </Typography>
        {errors.general && <ErrorBox message={errors.general} error={errors.general !== null}/>}
        <TextField
          id="name"
          label="Name"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          className={classes.root}
          error={errors.name !== null || errors.general !== null}
          helperText={errors.name}
        />
        <TextField
          id="username"
          label="Username"
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
          className={classes.root}
          error={errors.username !== null || errors.general !== null}
          helperText={errors.username}
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className={classes.root}
          error={errors.email !== null || errors.general !== null}
          helperText={errors.email}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          className={classes.root}
          error={errors.password !== null || errors.general !== null}
          helperText={errors.password}
        />
        <Button
          type="submit"
          variant="contained"
          className={classes.root}
        >
          Sign up
        </Button>
        <Typography variant="body1" gutterBottom>
          Already have an account?, then just <Link href={"/login"} underline="hover">login</Link>
        </Typography>
      </form>
    </div>
  );
}
