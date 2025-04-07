import { store } from "../redux";
import { withAuthRetry } from "./Common";
import { BASE_URL, handleResponse } from "./Const";

const adminApi = {
  get: (url: string) => {},
  post: async (url: string, data: any) => {
    const accessToken = store.getState().TokenReducer.accessToken;

    if (!accessToken) return;

    const apiUrl = `${BASE_URL}/admin${url}`;
    const requestOptions = await fetch(apiUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      credentials: "include",
      body: JSON.stringify(data)
    });

    return handleResponse(requestOptions);
  },
  uploadPhotos: async (data: FormData): Promise<any> => {
    const apiUrl = `${BASE_URL}/admin/upload-photos`;

    const fetchFn = async () => {
      const accessToken = store.getState().TokenReducer.accessToken;
      if (!accessToken) throw new Error("No access token available");

      return await fetch(apiUrl, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    };

    return await withAuthRetry(fetchFn);
  }
};

export default adminApi;
