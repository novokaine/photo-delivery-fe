import { UserDataTypes } from "../redux/Types/UserDataTypes";

const baseUrl = "http://localhost:8000/api";

const handleResponse = async (response: Response): Promise<any> => {
  if (!response.ok) throw new Error("Cannot fetch data");

  return await response.json();
};

const api = {
  get: async (url: string) => {
    const apiUrl = `${baseUrl}/private${url}`;
    const response = await fetch(apiUrl, {
      mode: "cors",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    });

    return handleResponse(response);
  },

  getRefreshToken: async () => {
    const refreshToken = await fetch(`${baseUrl}/refresh-token`, {
      method: "POST",
      credentials: "include"
    });

    return handleResponse(refreshToken);
  },

  downloadSelection: async (selectedImages: string[]) => {
    if (selectedImages.length === 0) {
      alert("No images selected!");
      return;
    }

    const response = await fetch(`${baseUrl}/private/download`, {
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

  register: async ({
    email,
    userName,
    password
  }: UserDataTypes): Promise<any> => {
    const apiUrl = `${baseUrl}/register`;
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
  }: UserDataTypes): Promise<{ accessToken: string }> => {
    const apiUrl = `${baseUrl}/login`;

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
    const apiUrl = `${baseUrl}/logout`;
    const requestOptions = {
      method: "POST",
      credentials: "include"
    } as RequestInit;

    const promise = await fetch(apiUrl, requestOptions);
    return handleResponse(promise);
  },

  passwordReset: async ({ email }: { email: string }) => {
    const apiUrl = `${baseUrl}/reset-password`;
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
