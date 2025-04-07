import { store } from "../redux";
import { ERROR, IDLE } from "../const/Common";
import { getAccessTokenAction } from "../redux/actions/TockenActions";
import { BASE_URL } from "./Const";

// @TODO - investigate typescript promise type
export const getAccessToken: () => Promise<any> = async () => {
  const apiUrl = `${BASE_URL}/refresh-token`;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      credentials: "include"
    });

    if (!response.ok) throw new Error("Unable to fetch refresh token");

    const data = await response.json();
    return { accessToken: data.accessToken };
  } catch (err) {
    return err;
  }
};

const waitForTokenRefresh = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = store.subscribe(() => {
      const { tokenFetchState } = store.getState().TokenReducer;
      if (tokenFetchState === IDLE) {
        unsubscribe();
        resolve();
      }
      if (tokenFetchState === ERROR) {
        unsubscribe();
        reject(new Error("Token refresh failed"));
      }
    });
  });
};

export const withAuthRetry = async <T>(
  fetchFn: () => Promise<Response>
): Promise<T> => {
  const response = await fetchFn();

  if (response.status === 419) {
    store.dispatch(getAccessTokenAction());

    try {
      await waitForTokenRefresh();
    } catch (error) {
      throw new Error("Token refresh failed, cannot retry the request.");
    }

    const retryResponse = await fetchFn();

    if (!retryResponse.ok) {
      throw new Error(`Retry failed with status ${retryResponse.status}`);
    }

    return retryResponse.json();
  }

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
};
