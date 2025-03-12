import { JSX, useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";

import "./css/LayoutWrapper.scss";

interface LayoutWrapperType {
  children: React.ReactNode;
}

interface NavBarProps {
  open: boolean;
  handleDrawerOpenState: () => void;
}

const drawerWidth = 240;

const NavBar = ({ handleDrawerOpenState, open }: NavBarProps) => (
  <AppBar position="fixed">
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpenState}
        edge="start"
        sx={[
          {
            mr: 2
          }
        ]}
      >
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        Welcome user
      </Typography>
    </Toolbar>
  </AppBar>
);

const LeftMenu = ({ open }: { open: boolean }) => (
  <Drawer
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box"
      }
    }}
    variant="persistent"
    anchor="left"
    className="my-drawer"
    open={open}
    classes={{
      root: "drawer-root",
      paper: "drawer-paper"
    }}
  >
    <List>
      {["Inbox", "Starred", "Send email", "Drafts"].map((text) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Drawer>
);

const LayoutWrapper: React.FC<LayoutWrapperType> = ({
  children
}: LayoutWrapperType): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const handleDrawerOpenState = () => setOpen((prevState) => !prevState);

  return (
    <Box sx={{ display: "flex" }}>
      <NavBar handleDrawerOpenState={handleDrawerOpenState} open={open} />
      <LeftMenu open={open} />
      <div className={`main-wrapper ${open ? "active" : ""}`}>{children}</div>
    </Box>
  );
};

export default LayoutWrapper;
