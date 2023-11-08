import { useEffect } from "react";

export default function AuthSuccess() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userInfo = params.get("userInfo")
      ? JSON.parse(params.get("userInfo")!)
      : null;
    const loginType = params.get("loginType") ? params.get("loginType") : null;

    if (window.opener && userInfo) {
      window.opener.postMessage(
        {
          type: "login-success",
          userInfo: userInfo,
          loginType: loginType,
        },
        `${process.env.NEXT_PUBLIC_DOMAIN}/login`
      );

      window.close();
    }
  }, []);

  return <></>;
}
