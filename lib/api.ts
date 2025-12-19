const BASE_URL = "https://iot-stuff-production.up.railway.app";

export const authAPI = {
  async login(payload: { email: string; password: string }) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return { success: false, message: "Invalid credentials" };
    }

    const data = await res.json();

    return {
      success: true,
      token: data.access_token,
      user: data.user,
    };
  },

  async signup(payload: { email: string; password: string }) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      return { success: false, message: err.detail };
    }

    return { success: true };
  },

  async me(token: string) {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  },
};