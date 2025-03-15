import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux";
import { getUserProfileAction } from "../../redux/actions/UserActions";

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  return <p>Soon</p>;
};

export default UserProfile;
