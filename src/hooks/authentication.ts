import { useEffect, useState } from "react";

export const AUTH_VALUES = {
  AUTH_TOKEN: "picAuthToken",
  TOKEN_EXPIRES: "tokenExpire"
};

export const useIsAuthenticated = (): { isUserAuthenticathed: boolean } => {
  const [isUserAuthenticathed, setIsUserAuthenticathed] =
    useState<boolean>(false);
  const picAuthToken = localStorage.getItem(AUTH_VALUES.AUTH_TOKEN);
  const tokenExpires = localStorage.getItem(AUTH_VALUES.TOKEN_EXPIRES);

  useEffect(() => {
    if (!picAuthToken || !tokenExpires) {
      setIsUserAuthenticathed(false);
      return;
    }

    const expirationTime = new Date(tokenExpires).getTime();
    const currentTime = new Date().getTime();
    setIsUserAuthenticathed(currentTime < expirationTime);
  }, [picAuthToken, tokenExpires]);

  return { isUserAuthenticathed };
};
