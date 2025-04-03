import { store } from "../redux";
import { UserDataTypes, UserProfileType } from "../redux/Types/UserDataTypes";
import { BASE_URL, handleResponse } from "./Const";

const api = {
  get: async (url: string) => {
    const accessToken = store.getState().TokenReducer.accessToken;
    if (!accessToken) return;

    const apiUrl = `${BASE_URL}/private${url}`;
    const response = await fetch(apiUrl, {
      mode: "cors",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });

    return handleResponse(response);
  },

  checkAuthStatus: async (): Promise<{ userData: UserProfileType }> => {
    const apiUrl = `${BASE_URL}/check-auth`;
    const response = await fetch(apiUrl, {
      method: "GET",
      mode: "cors",
      credentials: "include"
    });

    return handleResponse(response);
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
  },

  register: async ({
    email,
    userName,
    password
  }: UserDataTypes): Promise<any> => {
    const apiUrl = `${BASE_URL}/register`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ email, username: userName, password })
    };
    const promise = await fetch(apiUrl, requestOptions);

    if (promise.status !== 204) {
      return promise.json();
    }

    throw new Error(`Cannot register ${userName}`);
  },

  login: async ({
    userName,
    password
  }: UserDataTypes): Promise<{
    userData: UserProfileType;
    accessToken: string;
  }> => {
    const apiUrl = `${BASE_URL}/login`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: userName, password }),
      credentials: "include" as RequestCredentials
    };

    const promise = await fetch(apiUrl, requestOptions);
    return handleResponse(promise);
  },

  logout: async () => {
    const apiUrl = `${BASE_URL}/logout`;
    const requestOptions = {
      method: "POST",
      credentials: "include"
    } as RequestInit;

    const promise = await fetch(apiUrl, requestOptions);
    return handleResponse(promise);
  },

  passwordReset: async ({ email }: { email: string }) => {
    const apiUrl = `${BASE_URL}/reset-password`;
    const payload = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    };
    const promise = await fetch(apiUrl, payload);
    return handleResponse(promise);
  }
};

export default api;
