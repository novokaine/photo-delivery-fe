import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/UserActions";
import { AppDispatch } from "../../redux";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ul>
      <li>
        <Button onClick={() => dispatch(logoutAction())}>Logout</Button>
      </li>
      <li>
        <Link to="/user-profile">Profile</Link>
      </li>
    </ul>
  );
};

export default Header;
