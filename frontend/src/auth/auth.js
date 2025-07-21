import Cookies from "js-cookie";

// 🍪 Set both tokens (on login)
export const setTokens = ({ access, refresh }) => {
  Cookies.set("access", access, { expires: 1 });
  Cookies.set("refresh", refresh, { expires: 7 });
};

export const setAccessToken = (access) => {
  Cookies.set("access", access, { expires: 1 });
};

export const getToken = () => Cookies.get("access");
export const getRefreshToken = () => Cookies.get("refresh");

export const removeTokens = () => {
  Cookies.remove("access");
  Cookies.remove("refresh");
};
