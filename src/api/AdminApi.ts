import { handleResponse } from "./Api.ts";

const baseUrl = "http://localhost:8000/api/admin";

const adminApi = {
  get: (url: string) => {},
  post: async (url: string) => {
    const apiUrl = `${baseUrl}/${url}`;
    const response = await fetch(apiUrl, {
      mode: "cors",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    });

    return handleResponse(response);
  }
};

export default adminApi;
