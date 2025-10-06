import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../redux/hooks/useAuth";
import { useUser } from "../../redux/hooks/useUser";
import { useApplications } from "../../redux/hooks/useApplications";
import ApplicationList from "../../components/Applications/ApplicationList/ApplicationList";
import Button from "../../components/Button/Button";
import Spinner from "../../components/Spinner/Spinner";
import * as S from "./styles";

const Dashboard: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { currentUser } = useUser();
  const { applications, fetchApplications, isLoading } = useApplications();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
    }
  }, [isAuthenticated, fetchApplications]);

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (isLoading) {
    return (
      <S.DashboardContainer>
        <Spinner size="lg" />
      </S.DashboardContainer>
    );
  }

  // Filter applications based on user role
  const userApplications =
    currentUser?.role === "admin"
      ? applications
      : applications.filter((app) => app.user_id === currentUser?.id);

  const stats = {
    total: userApplications.length,
    pending: userApplications.filter((app) => app.status === "pending").length,
    approved: userApplications.filter((app) => app.status === "approved")
      .length,
    completed: userApplications.filter((app) => app.status === "completed")
      .length,
  };

  const isRegularUser =
    currentUser?.role === "individual" || currentUser?.role === "corporate";
  const isAdmin = currentUser?.role === "admin";

  const handleApplicationClick = (id: number) => {
    if (isAdmin) {
      navigate(`/admin/applications/${id}`);
    } else {
      navigate(`/applications/${id}`);
    }
  };

  return (
    <S.DashboardContainer>
      <S.DashboardHeader>
        <S.WelcomeTitle>Welcome back, {currentUser?.name}!</S.WelcomeTitle>
        <S.WelcomeSubtitle>
          {isAdmin
            ? "Manage all visa applications"
            : "Here's what's happening with your visa applications."}
        </S.WelcomeSubtitle>
      </S.DashboardHeader>

      {/* Statistics Section */}
      <S.DashboardStats>
        <S.StatCard>
          <S.StatTitle>Total Applications</S.StatTitle>
          <S.StatValue>{stats.total}</S.StatValue>
        </S.StatCard>
        <S.StatCard>
          <S.StatTitle>Pending Review</S.StatTitle>
          <S.StatValue>{stats.pending}</S.StatValue>
        </S.StatCard>
        <S.StatCard>
          <S.StatTitle>Approved</S.StatTitle>
          <S.StatValue>{stats.approved}</S.StatValue>
        </S.StatCard>
        <S.StatCard>
          <S.StatTitle>Completed</S.StatTitle>
          <S.StatValue>{stats.completed}</S.StatValue>
        </S.StatCard>
      </S.DashboardStats>

      <S.DashboardContent>
        {/* Applications Section */}
        <S.Section>
          <S.SectionHeader>
            <S.SectionTitle>
              {isAdmin ? "All Applications" : "My Applications"}
            </S.SectionTitle>
            {isRegularUser && (
              <Button
                onClick={() => navigate("/applications/new")}
                variant="primary"
              >
                New Application
              </Button>
            )}
          </S.SectionHeader>

          {userApplications.length === 0 ? (
            <S.EmptyState>
              <S.EmptyStateIcon>📋</S.EmptyStateIcon>
              <S.EmptyStateTitle>
                {isAdmin ? "No Applications Yet" : "No Applications Yet"}
              </S.EmptyStateTitle>
              <S.EmptyStateDescription>
                {isAdmin
                  ? "When users submit visa applications, they will appear here."
                  : "Get started by creating your first visa application."}
              </S.EmptyStateDescription>
              {isRegularUser && (
                <Button
                  onClick={() => navigate("/applications/new")}
                  variant="primary"
                >
                  Create Your First Application
                </Button>
              )}
            </S.EmptyState>
          ) : (
            <ApplicationList
              applications={userApplications}
              onApplicationClick={handleApplicationClick}
              showActions={isAdmin}
            />
          )}
        </S.Section>
      </S.DashboardContent>
    </S.DashboardContainer>
  );
};

export default Dashboard;
