import { FETCH_STATE } from "../../const/Common";

export interface UserDataTypes {
  userName: string;
  password: string;
  email?: string;
  retypePassword?: string;
}

export interface UserReducerType {
  loginState: FETCH_STATE;
  registerState: FETCH_STATE;
  isAdmin: boolean;
}
