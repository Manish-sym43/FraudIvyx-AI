import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  /* ================= AUTH STATE ================= */
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("isAuth") === "true"
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  /* ================= LOGIN ================= */
  const login = (userData) => {
    const finalUser = {
      name: userData.name,
      email: userData.email,
      role: userData.role || "user", // ✅ default role
    };

    setIsAuth(true);
    setUser(finalUser);

    localStorage.setItem("isAuth", "true");
    localStorage.setItem("user", JSON.stringify(finalUser));
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    setIsAuth(false);
    setUser(null);

    localStorage.removeItem("isAuth");
    localStorage.removeItem("user");
    localStorage.removeItem("password");
  };

  /* ================= PROFILE UPDATE ================= */
  const updateProfile = (updatedUser) => {
    const updated = {
      ...user,
      name: updatedUser.name,
      email: updatedUser.email,
    };

    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  /* ================= PASSWORD ================= */
  const defaultPassword = "123456";
  const [password, setPassword] = useState(
    localStorage.getItem("password") || defaultPassword
  );

  const changePassword = (current, newPass) => {
    if (current !== password) {
      return { success: false, message: "Current password is incorrect" };
    }

    setPassword(newPass);
    localStorage.setItem("password", newPass);

    return { success: true, message: "Password updated successfully" };
  };

  /* ================= PROVIDER ================= */
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        login,
        logout,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
