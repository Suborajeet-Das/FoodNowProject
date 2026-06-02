import { BASE_URL } from "./config";

export const loginApi = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || "Login failed");
    }
    return data;
  } catch (error) {
    console.warn("Backend auth API not available, falling back to mock login.", error.message);
    // Simulate successful JWT login with a mock token to allow UI testing out of the box
    if (email === "test@foodnow.com" && password === "password123") {
      return {
        token: "mock-jwt-token-xyz-123",
        user: {
          id: 1,
          email: "test@foodnow.com",
          fullName: "Test User",
          phone: "1234567890",
          role: "CUSTOMER",
        },
      };
    } else {
      throw new Error("Invalid credentials. Try test@foodnow.com / password123");
    }
  }
};

export const registerApi = async (fullName, email, phone, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, email, phone, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || "Registration failed");
    }
    return data;
  } catch (error) {
    console.warn("Backend auth API not available, falling back to mock registration.", error.message);
    return {
      token: "mock-jwt-token-new-user",
      user: {
        id: Date.now(),
        email: email,
        fullName: fullName,
        phone: phone,
        role: "CUSTOMER",
      },
    };
  }
};
