import { SyntheticEvent, useState } from "react";
import {
  Button,
  Card,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  OutlinedInput,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../services/auth/AuthProvider";
import { Redirect } from "react-router-dom";
import { auth } from "../services/auth/FirebaseAuth";
import CloseIcon from "@material-ui/icons/Close";

export interface ILoginPageProps {}

const useStyle = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      width: "100vw",
      height: "100vh",
      padding: theme.spacing(2),
    },
    form: {
      display: "flex",
      flexDirection: "column",
      "& >*": {
        marginBottom: theme.spacing(2),
      },
    },
    card: {
      padding: theme.spacing(2),
      maxWidth: 500,
      margin: "auto",
    },
    logo: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(5),
      fontWeight: "bold",
      color: theme.palette.primary.main,
      textAlign: "center",
    },
  })
);

export function LoginPage(props: ILoginPageProps) {
  const classes = useStyle();

  const [error, setError] = useState(null);

  const { currentUser } = useAuth();

  if (currentUser) {
    return <Redirect to="/app" />;
  }

  const submitLoginHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      login: { value: string };
      pass: { value: string };
    };

    const login = target.login.value;
    const pass = target.pass.value;

    try {
      await auth.signInWithEmailAndPassword(login, pass);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Typography variant="h3" component="h3" className={classes.logo}>
          Remont/Depo
        </Typography>
        <form
          autoComplete="off"
          onSubmit={submitLoginHandler}
          className={classes.form}
          method="post"
        >
          <FormControl variant="outlined">
            <InputLabel htmlFor="login">Логин</InputLabel>
            <OutlinedInput
              id="login"
              name="login"
              type="email"
              label="Логин"
              required
              aria-describedby="login-text"
            />
            <FormHelperText id="login-text"></FormHelperText>
          </FormControl>
          <FormControl variant="outlined">
            <InputLabel htmlFor="password">Пароль</InputLabel>
            <OutlinedInput
              id="password"
              name="pass"
              type="password"
              label="Пароль"
              required
              aria-describedby="password-text"
            />
            <FormHelperText id="password--text"></FormHelperText>
          </FormControl>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
          >
            Войти
          </Button>
        </form>
      </Card>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setError(null)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
}
