import { FETCH_STATE } from "../../const/Common";

export interface TokenReducerTypes {
  tokenFetchState: FETCH_STATE;
  accessToken: string | null;
}
