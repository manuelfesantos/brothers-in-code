import Head from "next/head";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import React, { FormEvent, useContext } from "react";
import Link from "@mui/material/Link";
import { Container } from "@mui/material";
import ShowPassword from "@/components/Form/ShowPassword";
import { User } from "@/types/user";
import { userContext, UserContext } from "@/context/user-context";
import { useRouter } from "next/router";
import FormAlert from "@/components/Form/FormAlert";
import { usersMock } from "@/mocks/users";

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { setUser } = useContext(userContext) as UserContext;
  const [message, setMessage] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const router = useRouter();

  const handleCloseAlert = () => {
    setShowAlert(false);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password"));
    const confirmPassword = String(data.get("confirmPassword"));
    if (password !== confirmPassword) {
      setupAlert("Passwords do not match", false);
      return;
    }
    const user: User = {
      firstName: String(data.get("firstName")),
      lastName: String(data.get("lastName")),
      email: String(data.get("email")),
      password: password,
    };
    const sameUser = usersMock.find((u) => {
      return u.email === user.email;
    });

    if (sameUser) {
      setupAlert("This email already exists!", false);
      return;
    }
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setupAlert("Your account was created successfully", true);
    setTimeout(async () => {
      await router.push("/");
    }, 3000);
  };

  const setupAlert = (message: string, success: boolean) => {
    setMessage(message);
    setSuccess(success);
    setShowAlert(true);
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Signup</title>
      </Head>
      {showAlert && (
        <FormAlert
          handleClose={handleCloseAlert}
          error={!success}
          success={success}
        >
          {message}
        </FormAlert>
      )}
      <Container maxWidth={"sm"}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  type={"email"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <ShowPassword
                        setShow={setShowPassword}
                        show={showPassword}
                      />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  InputProps={{
                    endAdornment: (
                      <ShowPassword
                        setShow={setShowPassword}
                        show={showPassword}
                      />
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
