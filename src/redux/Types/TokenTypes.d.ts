import { FETCH_STATE } from "../../const/Common";

export interface TokenReducerType {
  tokenFetchState: FETCH_STATE;
  accessToken: string | null;
}
