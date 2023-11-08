export function handleLoginSuccess(event: MessageEvent) {
  if (event.origin !== process.env.NEXT_PUBLIC_DOMAIN) {
    return;
  }

  if (event.data.type === "login-success") {
    localStorage.setItem(
      "me",
      JSON.stringify({
        email: event.data.userInfo.emailAddresses[0].value,
        name: event.data.userInfo.names[0].displayName,
        loginType: event.data.loginType,
      })
    );
    window.location.pathname = "/";
  }
}
