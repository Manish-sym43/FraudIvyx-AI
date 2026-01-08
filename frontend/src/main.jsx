import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { ScanProvider } from "./context/ScanContext";
import Admin from "./dashboard/Admin";
import Report from "./dashboard/Report";

// Admin
import AdminRoute from "./routes/AdminRoute";
import AdminDashboard  from "./dashboard/Admin";

/* Landing */
import Navbar from "./landing_page/firstContent/Navbar";
import FirstContent_Page from "./landing_page/firstContent/FirstContent_Page";
import AboutPage from "./landing_page/about/AboutPage";
import Contact_Page from "./landing_page/contact/Contact_Page";
import Login_Page from "./landing_page/login/Login_Page";
import Signup_Page from "./landing_page/get_started/Signup_Page";

/* Dashboard */
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./dashboard/Dashboard";
import Scan from "./dashboard/Scan";
import History from "./dashboard/History";
import Profile from "./dashboard/Profile";
import Settings from "./dashboard/Settings";

/* Auth */
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ScanProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<FirstContent_Page />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<Contact_Page />} />
            <Route path="/login" element={<Login_Page />} />
            <Route path="/get_started" element={<Signup_Page />} />

            {/* Protected Dashboard Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/scan" element={<Scan />} />
              <Route path="/history" element={<History />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/admin" element={<AdminDashboard  />} />
              <Route path="/report" element={<Report />} />
            </Route>

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ScanProvider>
    </AuthProvider>
  </StrictMode>
);
