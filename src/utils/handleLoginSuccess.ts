export function handleLoginSuccess(event: MessageEvent) {
  if (event.origin !== process.env.NEXT_PUBLIC_DOMAIN) {
    return;
  }

  if (event.data.type === "login-success") {
    if (event.data.loginType === "google") {
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
    if (event.data.loginType === "kakao") {
      localStorage.setItem(
        "me",
        JSON.stringify({
          email: event.data.userInfo.kakao_account.email,
          name: event.data.userInfo.kakao_account.profile.nickname,
          loginType: event.data.loginType,
        })
      );
      window.location.pathname = "/";
    }
  }
}
