import { useCallback, useEffect, useState } from "react";
import api from "../api/Api";

export const useIsAuthenticated = (): { isUserAuthenticathed: boolean } => {
  const [isUserAuthenticathed, setIsUserAuthenticathed] = useState<boolean>(
    !!localStorage.getItem("accessToken")
  );

  // const getAccessToken = useCallback(async (): Promise<any> => {
  //   try {
  //     const result: any = await api.getAccessToken();
  //     if (!result) return;
  //     localStorage.setItem("accessToken", result.accessToken);
  //     setIsUserAuthenticathed(true);
  //   } catch (err) {
  //     setIsUserAuthenticathed(false);
  //   }
  // }, []);

  useEffect(() => {
    if (isUserAuthenticathed) return;
    // getAccessToken();
  }, [isUserAuthenticathed]);

  return { isUserAuthenticathed };
};
