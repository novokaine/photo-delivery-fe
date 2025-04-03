import { store } from "../redux";
import { getAccessTokenAction } from "../redux/actions/TockenActions";

export const BASE_URL: string = "http://localhost:8000/api";

export const handleResponse = async (response: Response): Promise<any> => {
  if (response.status === 401) {
    return store.dispatch(getAccessTokenAction());
  }

  if (!response.ok) throw new Error("Cannot fetch data");

  return await response.json();
};
