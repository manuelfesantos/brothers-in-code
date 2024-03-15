import { Avatar, IconButton, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext, userContext } from "@/context/user-context";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import Button from "@mui/material/Button";

interface Props {
  showingUserDrawer: boolean;
  handleOpenUserMenu: () => void;
  handleCloseUserMenu: () => void;
}
export default function UserIcon({
  showingUserDrawer,
  handleOpenUserMenu,
  handleCloseUserMenu,
}: Props) {
  const { user, setUser } = useContext(userContext) as UserContext;

  useEffect(() => {
    const storageUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storageUser);
  }, [setUser]);
  return user ? (
    <Tooltip title={"Open settings"}>
      <IconButton
        onClick={showingUserDrawer ? handleCloseUserMenu : handleOpenUserMenu}
        sx={{ p: 0 }}
      >
        <Avatar
          alt={user.firstName
            .substring(0, 1)
            .toUpperCase()
            .concat(user.firstName.substring(1))}
          src={`https://floral-hill-5d85.manuelfesantos.workers.dev/${user.profilePicture}`}
        />
      </IconButton>
    </Tooltip>
  ) : (
    <Link href={"/login"}>
      <Button variant={"outlined"} color={"secondary"}>
        Sign in
      </Button>
    </Link>
  );
}
