import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const AuthProvider = ({ children }) => {
  /*AUTH STATE*/
  const [isAuth, setIsAuth] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  /*SIGNUP*/
  const signup = async (data) => {
    const res = await API.post("/auth/signup", data);
    return res.data;
  };

  /*LOGIN*/
  const login = async (data) => {
    const res = await API.post("/auth/login", data);

    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setIsAuth(true);
    setUser(user);

    return res.data;
  };

  /*UPDATE PROFILE*/
  const updateProfile = async (updatedData) => {
    const token = localStorage.getItem("token");

    const res = await API.put(
      "/user/profile",
      {
        name: updatedData.name,
        email: updatedData.email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    //update context + localStorage
    setUser(res.data.user);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data;
  };

  /*LOGOUT*/
  const logout = () => {
    setIsAuth(false);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        signup,
        login,
        updateProfile, //NOW REAL
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
