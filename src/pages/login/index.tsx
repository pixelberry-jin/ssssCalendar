import { useEffect } from "react";
import { handleLoginSuccess } from "@/utils/handleLoginSuccess";
import LoginPageComponent from "@/pageComponents/Login";

export default function LoginPage() {
  useEffect(() => {
    window.addEventListener("message", handleLoginSuccess);

    return () => {
      window.removeEventListener("message", handleLoginSuccess);
    };
  }, []);

  return <LoginPageComponent />;
}
