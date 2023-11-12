import React from "react";
import KakaoLoginButton from "@/components/login/components/KakaoLoginButton";
import GoogleLoginButton from "@/components/login/components/GoogleLoginButton";

function LoginPageComponent() {
  return (
    <div className="h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <GoogleLoginButton />
        <KakaoLoginButton />
      </div>
    </div>
  );
}

export default LoginPageComponent;
