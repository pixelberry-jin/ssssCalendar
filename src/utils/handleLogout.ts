export async function handleLogout() {
  try {
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data.message);
    localStorage.removeItem("me");
    window.location.pathname = "/login";
  } catch (error) {
    console.error("Error:", error);
  }
}
