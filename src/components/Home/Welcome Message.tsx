import { userContext, UserContext } from "@/context/user-context";
import { useContext } from "react";
import Typography from "@mui/material/Typography";

export default function WelcomeMessage() {
  const { user } = useContext(userContext) as UserContext;
  return (
    <>
      <Typography textAlign={"center"} variant="h4" component="h1">
        {user
          ? `Welcome back, ${user?.firstName}`
          : "Welcome to the Next Online Shop"}
        !
      </Typography>
    </>
  );
}
