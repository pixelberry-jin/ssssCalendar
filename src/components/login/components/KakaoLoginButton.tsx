export default function KakaoLoginButton() {
  const handleLogin = () => {
    const client_id = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirect_uri = "http://localhost:3000/api/auth/kakao";
    const response_type = "code";
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`;

    window.open(url, "_blank", "width=500,height=600,top=100,left=100");
  };

  return <button onClick={handleLogin}>카카오로 로그인하기</button>;
}
