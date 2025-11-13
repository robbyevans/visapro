import React, { useEffect, useState } from "react";
import { useAuth } from "../../redux/hooks/useAuth";
import { useUser } from "../../redux/hooks/useUser";
import { useTheme } from "../../hooks/useTheme";
import { useApplications } from "../../redux/hooks/useApplications";
import Spinner from "../Spinner/Spinner";

interface HocWrapperProps {
  children: React.ReactNode;
}

const HocWrapper: React.FC<HocWrapperProps> = ({ children }) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { currentUser, fetchUser, isLoading: userLoading } = useUser();
  const { fetchApplications, isLoading: isApplicationsLoading } =
    useApplications();
  const { setThemeMode } = useTheme();

  // Track if we've already loaded data to prevent multiple loads
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Only run once when the component mounts and we have authentication state
    if (!hasLoaded && !authLoading) {
      if (isAuthenticated) {
        // If authenticated, load user data first, then applications
        const loadData = async () => {
          try {
            await fetchUser();
            // Applications will be loaded automatically when currentUser becomes available
          } catch (error) {
            console.error("Failed to load user data:", error);
          }
        };
        loadData();
      }
      setHasLoaded(true);
    }
  }, [isAuthenticated, authLoading, hasLoaded, fetchUser]);

  // Load applications when user data is available
  useEffect(() => {
    if (isAuthenticated && currentUser && !isApplicationsLoading) {
      fetchApplications();
    }
  }, []);

  // ✅ Sync theme with backend when user data loads - use theme_preference
  useEffect(() => {
    if (currentUser && currentUser.theme_preference) {
      setThemeMode(currentUser.theme_preference);
    }
  }, []);

  // Show loading spinner while initializing app
  const isAppLoading = authLoading || (isAuthenticated && userLoading);

  if (isAppLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Spinner size="lg" />
        <p style={{ color: "#6b7280", fontSize: "16px" }}>
          Loading your application...
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default HocWrapper;
