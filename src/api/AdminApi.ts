import { store } from "../redux";
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
  uploadPhotos: async (data: FormData) => {
    const accessToken = store.getState().TokenReducer.accessToken;

    if (!accessToken) return;
    const apiUrl = `${BASE_URL}/admin/upload-photos`;
    const requestOptions = await fetch(apiUrl, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      body: data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return handleResponse(requestOptions);
  }
};

export default adminApi;
