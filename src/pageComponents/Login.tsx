import React from "react";
import GoogleLoginButton from "@/components/login/components/GoogleLoginButton";

function LoginPageComponent() {
  return (
    <div className="h-screen">
      <div className="w-full h-full flex justify-center items-center">
        <GoogleLoginButton />
      </div>
    </div>
  );
}

export default LoginPageComponent;
