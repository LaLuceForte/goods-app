const AUTH_URl: string = "https://dummyjson.com/auth/login";

export const loginUser = async (
  username: string,
  password: string,
  remember: boolean,
): Promise<boolean> => {
  try {
    const res = await fetch(AUTH_URl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    if (remember) localStorage.setItem("authToken", data.accessToken);
    else sessionStorage.setItem("authToken", data.accessToken);

    return true;
  } catch {
    return false;
  }
};
