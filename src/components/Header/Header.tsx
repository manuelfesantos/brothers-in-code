import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { useState } from "react";
import UserDrawer from "@/components/Header/UserDrawer";
import NavDrawer from "@/components/Header/NavDrawer";
import UserIcon from "@/components/Header/UserIcon";
import CartIcon from "@/components/Header/CartIcon";

const HideOnScroll = ({ children }: any) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction={"down"} in={!trigger}>
      {children}
    </Slide>
  );
};

export default function Header() {
  const [showingNavDrawer, setShowingNavDrawer] = useState<boolean>(false);
  const [showingUserDrawer, setShowingUserDrawer] = useState<boolean>(false);

  const pages = [
    ["Products", "/products"],
    ["About", "/about"],
  ];

  const settings = [
    ["Profile", "/profile"],
    ["Settings", "/settings"],
    ["Logout", "/"],
  ];

  const websiteName = "B.i.C.";

  const handleOpenNavMenu = () => {
    setShowingNavDrawer(true);
  };
  const handleOpenUserMenu = () => {
    setShowingUserDrawer(true);
  };

  const handleCloseNavMenu = () => {
    setShowingNavDrawer(false);
  };

  const handleCloseUserMenu = () => {
    setShowingUserDrawer(false);
  };

  return (
    <>
      <HideOnScroll>
        <AppBar
          color={"primary"}
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Container maxWidth={"xl"}>
            <Toolbar disableGutters>
              <Box
                sx={{ flexGrow: 0, display: "flex" }}
                mr={1}
                display={"flex"}
                justifyContent={"space-evenly"}
                alignItems={"center"}
                height={70}
              >
                <IconButton
                  size={"small"}
                  aria-label={"home"}
                  onClick={
                    showingNavDrawer ? handleCloseNavMenu : handleOpenNavMenu
                  }
                  color={"inherit"}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: "flex",
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {websiteName}
              </Typography>
              <Box display={"flex"} alignItems={"center"} sx={{ flexGrow: 0 }}>
                <CartIcon />
                <UserIcon
                  showingUserDrawer={showingUserDrawer}
                  handleCloseUserMenu={handleCloseUserMenu}
                  handleOpenUserMenu={handleOpenUserMenu}
                />
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Box height={70}></Box>
      <NavDrawer
        handleCloseNavMenu={handleCloseNavMenu}
        showingNavDrawer={showingNavDrawer}
        pages={pages}
      />
      <UserDrawer
        settings={settings}
        showingUserDrawer={showingUserDrawer}
        handleCloseUserMenu={handleCloseUserMenu}
      />
    </>
  );
}
