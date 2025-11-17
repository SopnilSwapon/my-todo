export function globalLogout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // force redirect
    window.location.href = "/sign-in";
  }
}
