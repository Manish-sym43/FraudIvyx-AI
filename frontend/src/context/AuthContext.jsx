import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

/* ================= API INSTANCE ================= */
const API = axios.create({
  baseURL: "https://fraudivyx-backend.onrender.com/api",
});

/* ⭐ AUTO TOKEN ATTACH (no need to manually send headers anywhere) */
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const AuthProvider = ({ children }) => {
  /* ================= AUTH STATE ================= */

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  /* =================================================
     ⭐ MOST IMPORTANT FIX
     Restore login on refresh / reload
  ================================================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setIsAuth(true);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  /* ================= SIGNUP ================= */
  const signup = async (data) => {
    const res = await API.post("/auth/signup", data);
    return res.data;
  };

  /* ================= LOGIN ================= */
  const login = async (data) => {
    const res = await API.post("/auth/login", data);

    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setIsAuth(true);
    setUser(user);

    return res.data;
  };

  /* ================= UPDATE PROFILE ================= */
  const updateProfile = async (updatedData) => {
    const res = await API.put("/user/profile", {
      name: updatedData.name,
      email: updatedData.email,
    });

    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data;
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsAuth(false);
    setUser(null);
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
