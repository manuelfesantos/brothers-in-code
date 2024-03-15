import { Drawer, IconButton, MenuItem } from "@mui/material";
import Link from "next/link";
import { CloseIcon } from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import Box from "@mui/material/Box";

interface Props {
  showingNavDrawer: boolean;
  handleCloseNavMenu: () => void;
  pages: string[][];
}
export default function NavDrawer({
  showingNavDrawer,
  handleCloseNavMenu,
  pages,
}: Props) {
  return (
    <Drawer
      id={"menu-appbar"}
      anchor={"left"}
      keepMounted
      open={showingNavDrawer}
      onClose={handleCloseNavMenu}
      PaperProps={{
        sx: {
          pt: 10,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          width: { xs: "100vw", md: 500 },
        },
      }}
      sx={{
        display: "block",

        zIndex: (theme) => theme.zIndex.drawer,
      }}
    >
      <Box pl={1}>
        <IconButton
          size={"small"}
          color={"secondary"}
          onClick={handleCloseNavMenu}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {pages.map((page, index) => (
        <Link key={index} href={page[1]} onClick={handleCloseNavMenu}>
          <MenuItem sx={{ display: "flex", justifyContent: "center" }}>
            {page[0]}
          </MenuItem>
        </Link>
      ))}
    </Drawer>
  );
}
