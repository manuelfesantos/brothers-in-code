import { Drawer, IconButton, MenuItem } from "@mui/material";
import Link from "next/link";
import { userContext, UserContext } from "@/context/user-context";
import { useContext } from "react";
import Box from "@mui/material/Box";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

interface Props {
  showingUserDrawer: boolean;
  handleCloseUserMenu: () => void;
  settings: string[][];
}

export default function UserDrawer({
  showingUserDrawer,
  handleCloseUserMenu,
  settings,
}: Props) {
  const { user, setUser } = useContext(userContext) as UserContext;
  return (
    <Drawer
      sx={{
        mt: "45px",
        zIndex: (theme) => theme.zIndex.drawer,
      }}
      id="menu-appbar"
      anchor={"right"}
      keepMounted
      open={showingUserDrawer}
      onClose={handleCloseUserMenu}
      PaperProps={{
        sx: {
          pt: 10,
          width: { xs: "100vw", md: 500 },
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        },
      }}
    >
      <Box pr={1} display={"flex"} justifyContent={"flex-end"}>
        <IconButton
          color={"secondary"}
          onClick={handleCloseUserMenu}
          size={"small"}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {settings.map((setting, index) => (
        <Link key={index} href={setting[1]}>
          <MenuItem
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
            onClick={
              setting[0] === "Logout"
                ? () => {
                    setUser(null);
                    localStorage.removeItem("user");
                    handleCloseUserMenu();
                  }
                : handleCloseUserMenu
            }
          >
            {setting[0]}
          </MenuItem>
        </Link>
      ))}
    </Drawer>
  );
}
