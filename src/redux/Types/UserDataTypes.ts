import { FETCH_STATE } from "../../const/Common";

export interface UserDataTypes {
  userName: string;
  password: string;
  email?: string;
  retypePassword?: string;
}

export type UserProfileType = {
  username: string | null;
  isAdmin: boolean;
  email: string;
} | null;

export interface UserReducerType {
  userFetchState: FETCH_STATE;
  registerState: FETCH_STATE;
  userProfile: UserProfileType;
}
