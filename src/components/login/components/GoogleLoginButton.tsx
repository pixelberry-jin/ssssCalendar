export default function GoogleLoginButton() {
  const handleLogin = () => {
    const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirect_uri = "http://localhost:3000/api/auth";
    const response_type = "code";
    const scope = "email profile openid";
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`;

    window.open(url, "_blank", "width=500,height=600,top=100,left=100");
  };

  return <button onClick={handleLogin}>Google로 로그인하기</button>;
}
