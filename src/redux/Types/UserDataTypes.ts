import { FETCH_STATE } from "../../const/Common";

export interface UserDataTypes {
  userName: string;
  password: string;
  email?: string;
  retypePassword?: string;
}

export interface UserReducerType {
  userFetchState: FETCH_STATE;
  registerState: FETCH_STATE;
  userProfile: {
    username: string | null;
    isAdmin: boolean;
  } | null;
}
