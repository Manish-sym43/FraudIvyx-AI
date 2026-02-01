import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

/* ================= API INSTANCE ================= */
const API = axios.create({
  baseURL: "https://fraudivyx-backend.onrender.com/api",
});

/* ⭐ AUTO TOKEN ATTACH */
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const AuthProvider = ({ children }) => {
  /* =================================================
     ⭐ FIX: Lazy initialize from localStorage
     This runs BEFORE first render (no logout flicker)
  ================================================= */
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [isAuth, setIsAuth] = useState(() =>
    Boolean(localStorage.getItem("token")),
  );

  /* ================= SIGNUP ================= */
  const signup = async (data) => {
    const res = await API.post("/auth/signup", data);
    // ⭐ small delay for smooth transition
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return res.data;
  };

  /* ================= LOGIN ================= */
  const login = async (data) => {
    const res = await API.post("/auth/login", data);

    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
    setIsAuth(true);

    // ⭐ small delay for smooth transition
    await new Promise((resolve) => setTimeout(resolve, 1200));

    return res.data;
  };

  /* ================= UPDATE PROFILE ================= */
  const updateProfile = async (updatedData) => {
    const res = await API.put("/user/profile", updatedData);

    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data;
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        signup,
        login,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
