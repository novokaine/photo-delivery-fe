import { BASE_URL, handleResponse } from "./Const";

const adminApi = {
  get: (url: string) => {},
  post: async (url: string, data: any) => {
    const apiUrl = `${BASE_URL}/admin${url}`;
    const requestOptions = await fetch(apiUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(data)
    });

    return handleResponse(requestOptions);
  }
};

export default adminApi;
