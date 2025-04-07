import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux";
import { Button } from "@mui/material";
import { getAccessTokenAction } from "../../redux/actions/TockenActions";

const DashBoard = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Button
      variant="contained"
      fullWidth
      color="primary"
      onClick={() => dispatch(getAccessTokenAction())}
    >
      Generate access token
    </Button>
  );
};

export default DashBoard;
