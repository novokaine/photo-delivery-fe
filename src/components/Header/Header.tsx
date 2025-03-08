import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/UserActions";
import { AppDispatch } from "../../redux";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();

  return <Button onClick={() => dispatch(logoutAction())}>Logout</Button>;
};

export default Header;
