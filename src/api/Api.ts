import { AUTH_VALUES } from "../hooks/authentication";
import { UserDataTypes } from "../redux/Types/UserDataTypes";

const baseUrl = "http://localhost:8000/api";

const username = "durau";
const password = "partyTime2025";
const credentials = btoa(`${username}:${password}`); // Encode credentials in Base64

const picAuthToken = localStorage.getItem(AUTH_VALUES.AUTH_TOKEN);
const tokenExpires = localStorage.getItem(AUTH_VALUES.TOKEN_EXPIRES);

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  Authorization: `Basic ${credentials}`
};

const handleResponse = async (response: Response) => {
  if (response.status !== 204) {
    return response.json();
  }
  throw new Error("Cannot fetch data");
};

const api = {
  get: async (url: string) => {
    const apiUrl = `${baseUrl}/private${url}`;
    const response = await fetch(apiUrl, {
      mode: "cors",
      credentials: "same-origin",
      headers
    });

    handleResponse(response);
  },

  downloadSelection: async (selectedImages: string[]) => {
    if (selectedImages.length === 0) {
      alert("No images selected!");
      return;
    }

    const response = await fetch(`${baseUrl}/private/download`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`
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
    const apiUrl = `${baseUrl}/private${url}`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    };

    const response = await fetch(apiUrl, requestOptions);
    handleResponse(response);
  },

  login: async ({
    userName,
    password
  }: {
    userName: string;
    password: string;
  }) => {
    const apiUrl = `${baseUrl}/login`;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userName, password })
    };

    const promise = await fetch(apiUrl, requestOptions);
    handleResponse(promise);
  },

  register: async ({ userName, password }: UserDataTypes): Promise<any> => {
    const apiUrl = `${baseUrl}/register`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ userName, password })
    };
    const promise = await fetch(apiUrl, requestOptions);
    if (promise.status !== 204) {
      return promise.json();
    }
    throw new Error(`Cannot register ${userName}`);
  }
};

export default api;
