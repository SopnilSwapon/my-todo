export const TokenService = {
  getAccess() {
    return localStorage.getItem("access_token");
  },

  setAccess(access: string) {
    localStorage.setItem("access_token", access);
  },

  getRefresh() {
    return localStorage.getItem("refresh_token");
  },

  setRefresh(refresh: string) {
    localStorage.setItem("refresh_token", refresh);
  },

  clear() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};
