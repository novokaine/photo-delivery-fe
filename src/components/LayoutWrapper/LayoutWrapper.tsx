import { JSX, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";

import { routes } from "../../routes";
import { logoutAction } from "../../redux/actions/UserActions";
import { AppDispatch } from "../../redux";

import "./css/LayoutWrapper.scss";

interface LayoutWrapperType {
  children: React.ReactNode;
}

interface NavBarProps {
  open: boolean;
  handleDrawerOpenState: () => void;
}

const internalRoutes = routes.filter(
  (route) => !["/login", "/register"].includes(route.path)
);

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

const LeftMenu = ({ open }: { open: boolean }) => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const getLinkClassName = ({ path }: { path: string }) =>
    location.pathname.startsWith(path) ? "active" : "";

  return (
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
        {internalRoutes.map(({ path, name }) => (
          <ListItem key={path} disablePadding>
            <Link to={path} className={getLinkClassName({ path })}>
              <ListItemText primary={name} />
            </Link>
          </ListItem>
        ))}
        <ListItem>
          <Button onClick={() => dispatch(logoutAction())}>Logout</Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

const LayoutWrapper: React.FC<LayoutWrapperType> = ({
  children
}: LayoutWrapperType): JSX.Element => {
  const [open, setOpen] = useState<boolean>(true);
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
