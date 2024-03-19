import { userContext, UserContext } from "@/context/user-context";
import { useContext } from "react";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function AccountActionButton() {
  const { user } = useContext(userContext) as UserContext;
  return (
    <Link href={user ? "/profile" : "/login"}>
      <Button variant={"contained"} color={"primary"}>
        {user ? "Profile" : "Sign In"}
      </Button>
    </Link>
  );
}
