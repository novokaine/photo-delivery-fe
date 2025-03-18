import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux";
import { getUserProfileAction } from "../../redux/actions/UserActions";
import {
  currentUserProfile,
  isUserDataLoading
} from "../../redux/selectors/UserSelectors";

const UserProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector(currentUserProfile);
  const isUserLoading = useSelector(isUserDataLoading);

  useEffect(() => {
    if (userProfile || isUserLoading) return;
    dispatch(getUserProfileAction());
  }, [userProfile, isUserLoading, dispatch]);

  return <p>Soon</p>;
};

export default UserProfile;
