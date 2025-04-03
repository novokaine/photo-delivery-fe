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
