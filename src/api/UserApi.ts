import { UserDataTypes, UserProfileType } from "../redux/Types/UserDataTypes";
import { BASE_URL, handleResponse } from "./Const";

const userApi = {
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
  },

  checkAuthStatus: async (): Promise<{
    userData: UserProfileType;
    accessToken: string;
  }> => {
    const apiUrl = `${BASE_URL}/check-auth`;
    const response = await fetch(apiUrl, {
      method: "GET",
      mode: "cors",
      credentials: "include"
    });

    return handleResponse(response);
  }
};

export default userApi;
