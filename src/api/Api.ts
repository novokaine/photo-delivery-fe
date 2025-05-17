import { store } from "../redux";
import { withAuthRetry } from "./Common";
import { BASE_URL, handleResponse } from "./Const";

const api = {
  get: <T>(url: string): Promise<T> => {
    const apiUrl = `${BASE_URL}/private${url}`;

    const fetchFn = async (): Promise<Response> => {
      const accessToken = store.getState().TokenReducer.accessToken;
      if (!accessToken) throw new Error("No access token available");

      return await fetch(apiUrl, {
        mode: "cors",
        credentials: "include",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      });
    };

    return withAuthRetry(fetchFn);
  },

  downloadSelection: async (selectedImages: string[]) => {
    if (selectedImages.length === 0) {
      alert("No images selected!");
      return;
    }

    const response = await fetch(`${BASE_URL}/private/download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ selectedImages })
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "images.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } else {
      console.error("Download failed");
    }
  },

  post: async (url: string, requestData: string[]) => {
    const accessToken = store.getState().TokenReducer.accessToken;

    if (!accessToken) return;
    const apiUrl = `${BASE_URL}/private${url}`;

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    };

    const response = await fetch(apiUrl, requestOptions);
    handleResponse(response);
  }
};

export default api;
