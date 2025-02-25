export const AUTH_VALUES = {
  AUTH_TOKEN: "picAuthToken",
  TOKEN_EXPIRES: "tokenExpire",
};

const picAuthToken = localStorage.getItem(AUTH_VALUES.AUTH_TOKEN);
const tokenExpires = localStorage.getItem(AUTH_VALUES.TOKEN_EXPIRES);

export const isUserAuthenticathed =
  picAuthToken &&
  tokenExpires &&
  (Date.now() as unknown as string) < tokenExpires;
