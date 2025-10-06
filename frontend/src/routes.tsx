import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GlobalStyle } from "./styles/global";

// Layout Components
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

// Page Components
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import ApplicationFormPage from "./pages/ApplicationFormPage/ApplicationFormPage";
import ApplicationDetailsPage from "./pages/ApplicationDetailsPage/ApplicationDetailsPage";
import AdminApplicationPage from "./pages/AdminApplicationPage/AdminApplicationPage";

// Main App component with routing
const AppContent: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <div className="app">
        <Navbar />
        <main style={{ minHeight: "calc(100vh - 64px)" }}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Application routes */}
            <Route
              path="/applications/new"
              element={
                <ProtectedRoute allowedRoles={["individual", "corporate"]}>
                  <ApplicationFormPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/applications/:id"
              element={
                <ProtectedRoute>
                  <ApplicationDetailsPage />
                </ProtectedRoute>
              }
            />

            {/* Admin specific routes */}
            <Route
              path="/admin/applications/:id"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminApplicationPage />
                </ProtectedRoute>
              }
            />

            {/* Catch all route - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

// Main App wrapper with Redux provider
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
