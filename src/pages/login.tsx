import Head from "next/head";
import { Avatar, Box, Container, Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import React, { FormEvent, useContext, useState } from "react";
import ShowPassword from "@/components/Form/ShowPassword";
import { usersMock } from "@/mocks/users";
import { useRouter } from "next/router";
import FormAlert from "@/components/Form/FormAlert";
import { UserContext, userContext } from "@/context/user-context";

export default function Login() {
  const [error, setError] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useContext(userContext) as UserContext;
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = usersMock.find((user) => {
      return (
        user.email === data.get("email") &&
        user.password === data.get("password")
      );
    });
    if (!user) {
      setError("Incorrect email or password");
      setShowAlert(true);
      return;
    }
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    await router.push("/");
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Login</title>
      </Head>
      {showAlert && (
        <FormAlert
          error={true}
          success={false}
          handleClose={() => setShowAlert(false)}
        >
          {error}
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <ShowPassword setShow={setShowPassword} show={showPassword} />
                ),
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
