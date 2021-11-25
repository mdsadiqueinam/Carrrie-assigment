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

export default function Login() {
  const context = useAuth();
  const classes = useStyles();
  const [values, setValues] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    usernameOrEmail: null,
    password: null,
    general: null,
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
        const { data } = await axiosInstance.post("/user/login", values);
        context.login(data);
      } catch (error: any) {
        console.error(error);
        manageError(errors, setErrors, error?.response?.data)
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={"form-container form"}>
        <Typography variant="h2" gutterBottom>
          Sign in
        </Typography>
        <Typography variant="body1" gutterBottom>
          Sign in and start managing your tasks
        </Typography>
        {errors.general && <ErrorBox message={errors.general} error={errors.general !== null}/>}
        <TextField
          id="username-or-email"
          label="Username or Email"
          type="text"
          name="usernameOrEmail"
          value={values.usernameOrEmail}
          onChange={handleChange}
          className={classes.root}
          error={errors.usernameOrEmail !== null || errors.general !== null}
          helperText={errors.usernameOrEmail}
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
          Login
        </Button>
        <Typography variant="body1" gutterBottom>
          Don't have an account?, not to worry <Link href={"/register"} underline="hover">create one</Link>
        </Typography>
      </form>
    </div>
  );
}
