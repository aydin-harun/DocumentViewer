import React, { Component, Fragment } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Kullanıcı Girişi
        </Typography>
        <form onSubmit={props.onSubmitLoginForm} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="Kullanıcı Adı"
            name="userName"
            autoComplete="userName"
            autoFocus
            onChange={props.onChangeLoginInputs}
            //value = {props.loginPageInfo.userName}
          />
          {props.loginPageInfo.userNameError && <Alert severity="error">Kullanıcı Adı Girmelisiniz!</Alert>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Şifre"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={props.onChangeLoginInputs}
            //value = {props.loginPageInfo.pwd}
          />
          {props.loginPageInfo.pwdError && <Alert severity="error">Şifre Adı Girmelisiniz!</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            GİRİŞ
          </Button>
          {props.loginPageInfo.loginError=== true && <Alert severity="error">{props.loginPageInfo.message}</Alert>}
        </form>        
      </div>
    </Container>
  );
}

export default Login;
