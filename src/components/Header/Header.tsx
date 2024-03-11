import Link from "next/link";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { useState, MouseEvent, useEffect, useContext } from "react";
import { CartContext, cartContext } from "@/context/cart-context";

const HideOnScroll = ({ children }: any) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction={"down"} in={!trigger}>
      {children}
    </Slide>
  );
};

export default function Header() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { cart, setCart } = useContext(cartContext) as CartContext;

  const pages = [
    ["Home", "/"],
    ["Products", "/products"],
    ["About", "/about"],
  ];

  const settings = [
    ["Profile", "/profile"],
    ["Settings", "/settings"],
    ["Logout", "/login"],
  ];

  const websiteName = "B.i.C.";

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const storageCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storageCart);
  }, [setCart]);

  return (
    <>
      <HideOnScroll>
        <AppBar color={"primary"}>
          <Container maxWidth={"xl"}>
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                {websiteName}
              </Typography>
              <Box
                sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}
                display={"flex"}
                justifyContent={"space-evenly"}
                alignItems={"center"}
                height={100}
              >
                <IconButton
                  size={"large"}
                  aria-label={"home"}
                  onClick={handleOpenNavMenu}
                  color={"inherit"}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id={"menu-appbar"}
                  anchorEl={anchorElNav}
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page, index) => (
                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                      <Link href={page[1]}>{page[0]}</Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
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
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page, index) => (
                  <Link key={page[0]} href={page[1]}>
                    <Button
                      key={index}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page[0]}
                    </Button>
                  </Link>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Link href={"/cart"} style={{ marginRight: 10 }}>
                  <IconButton
                    color={"inherit"}
                    size={"large"}
                    sx={{ position: "relative" }}
                  >
                    <Badge
                      badgeContent={cart.reduce(
                        (count, item) => count + item.quantity,
                        0,
                      )}
                      color="error"
                    >
                      <ShoppingCartIcon />
                    </Badge>
                  </IconButton>
                </Link>
                <Tooltip title={"Open settings"}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, index) => (
                    <MenuItem key={index} onClick={handleCloseUserMenu}>
                      <Link href={setting[1]}>{setting[0]}</Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Box height={100}></Box>
    </>
  );
}
