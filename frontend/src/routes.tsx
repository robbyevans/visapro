import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "./redux/store";
import { GlobalStyle } from "./styles/global";
import { ThemeProvider } from "./providers/ThemeProvider";

// Action for logging out
import { logout } from "./redux/slices/authSlice"; 

// Layout Components
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import HocWrapper from "./components/HocWrapper/HocWrapper";

// Page Components
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import ApplicationFormPage from "./pages/ApplicationFormPage/ApplicationFormPage";
import ApplicationDetailsPage from "./pages/ApplicationDetailsPage/ApplicationDetailsPage";
import AdminApplicationPage from "./pages/AdminApplicationPage/AdminApplicationPage";
import InvoiceGenerator from "./components/Invoices/InvoiceGenerator/InvoiceGenerator";
import { checkSystemStatus } from "./redux/system";

// Main App component with routing
const AppContent: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState<boolean | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyStatus = async () => {
      const status = await checkSystemStatus();
      setIsInitialized(status);

      if (status === false) {
        dispatch(logout()); 
        localStorage.removeItem("token");
      }
    };
    verifyStatus();
  }, [dispatch]);

  // Show a loading state while fetching the system status
  if (isInitialized === null) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <Router>
      <ThemeProvider>
        <GlobalStyle />
        
        {!isInitialized ? (
          <div className="app">
            <main style={{ minHeight: "100vh" }}>
              <Routes>
                <Route 
                  path="/initiate" 
                  element={
                    <AuthPage 
                      onSuccess={() => setIsInitialized(true)} 
                    />
                  } 
                />
                {/* Force all other routes to redirect strictly to /initiate */}
                <Route path="*" element={<Navigate to="/initiate" replace />} />
              </Routes>
            </main>
          </div>
        ) : (
          <div className="app">
            <HocWrapper>
              <Navbar />
              <main style={{ minHeight: "calc(100vh - 64px)" }}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<AuthPage />} />
                  <Route path="/signup" element={<AuthPage />} />
                  
                  {/* Block /initiate and redirect to login */}
                  <Route path="/initiate" element={<Navigate to="/login" replace />} />

                  {/* Protected routes */}
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

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
                    element={<ProtectedRoute><ApplicationDetailsPage /></ProtectedRoute>}
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

                  <Route
                    path="/invoices/new"
                    element={
                      <ProtectedRoute allowedRoles={["admin"]}>
                        <InvoiceGenerator />
                      </ProtectedRoute>
                    }
                  />

                  {/* Catch all route - redirect to home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </HocWrapper>
          </div>
        )}
      </ThemeProvider>
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