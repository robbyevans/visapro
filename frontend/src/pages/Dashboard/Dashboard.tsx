import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../redux/hooks/useUser";
import { useApplications } from "../../redux/hooks/useApplications";
import { ApplicationsView } from "../../components/Applications/ApplicationsView/ApplicationsView";
import Button from "../../components/Button/Button";
import SuccessModal from "../../components/Modals/SucessModal/SucessModal";
import * as S from "./styles";

type AdminTab = "current" | "all";

const Dashboard: React.FC = () => {
  const { currentUser } = useUser();
  const { applications, fetchApplications } = useApplications();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("current");

  console.log("activeTab", activeTab);

  // Check for success message in location state
  useEffect(() => {
    if (location.state?.message) {
      setShowSuccessModal(true);
      // Clear the location state to prevent showing modal on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const userApplications =
    currentUser?.role === "admin"
      ? applications
      : applications.filter((app) => app.user_id === currentUser?.id);

  const stats = {
    total: userApplications.length,
    pending: userApplications.filter((app) => app.status === "pending").length,
    approved: userApplications.filter((app) => app.status === "approved")
      .length,
    rejected: userApplications.filter((app) => app.status === "rejected")
      .length,
    invoiced: userApplications.filter((app) => app.status === "invoiced")
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

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "#F59E0B",
      approved: "#10B981",
      rejected: "#EF4444",
      invoiced: "#3B82F6",
      completed: "#8B5CF6",
    };
    return colors[status as keyof typeof colors] || "#6B7280";
  };

  const renderApplicationsContent = () => {
    if (userApplications.length === 0) {
      return (
        <S.EmptyState>
          <S.EmptyStateIcon>📝</S.EmptyStateIcon>
          <S.EmptyStateTitle>
            {isAdmin ? "No Client Applications" : "No Applications Yet"}
          </S.EmptyStateTitle>
          <S.EmptyStateDescription>
            {isAdmin
              ? "When users submit visa applications, they will appear here grouped by client."
              : "Start your visa journey by creating your first application."}
          </S.EmptyStateDescription>
          {isRegularUser && (
            <Button
              onClick={() => navigate("/applications/new")}
              variant="primary"
              size="lg"
            >
              Start Your First Application
            </Button>
          )}
        </S.EmptyState>
      );
    }

    if (isAdmin && activeTab === "all") {
      // All Applications view - show all applications grouped by user without filtering
      return (
        <ApplicationsView
          showFilters={false}
          onApplicationClick={handleApplicationClick}
          viewMode="admin"
          defaultFilter={{
            status: [], // Show all statuses
            timeRange: "all_time", // Show all time
            sortBy: "created_at",
            sortOrder: "desc",
          }}
        />
      );
    }

    return (
      <ApplicationsView
        showFilters={!isAdmin}
        onApplicationClick={handleApplicationClick}
        viewMode={isAdmin ? "admin" : "user"}
      />
    );
  };

  return (
    <S.DashboardContainer>
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Application Submitted!"
        message="Your visa application has been submitted successfully and is now under review. You can track its progress below."
        autoCloseDelay={4000}
      />

      {/* Header Section */}
      <S.DashboardHeader>
        <S.WelcomeSection>
          <S.WelcomeTitle>Welcome back, {currentUser?.name}! 👋</S.WelcomeTitle>
          <S.WelcomeSubtitle>
            {isAdmin
              ? "Manage and monitor all visa applications in the system"
              : "Track your visa application progress and manage your submissions"}
          </S.WelcomeSubtitle>
        </S.WelcomeSection>
        {isRegularUser && (
          <S.HeaderActions>
            <Button
              onClick={() => navigate("/applications/new")}
              variant="primary"
              size="lg"
            >
              + New Application
            </Button>
          </S.HeaderActions>
        )}
      </S.DashboardHeader>

      <S.StatsOverview>
        <S.StatsCard>
          <S.StatsHeader>
            <S.StatsTitle>Application Overview</S.StatsTitle>
            <S.StatsTotal>{stats.total} Total</S.StatsTotal>
          </S.StatsHeader>

          <S.StatsGrid>
            <S.StatItem>
              <S.StatIndicator color={getStatusColor("pending")} />
              <S.StatInfo>
                <S.StatValue>{stats.pending}</S.StatValue>
                <S.StatLabel>Pending</S.StatLabel>
              </S.StatInfo>
            </S.StatItem>

            <S.StatItem>
              <S.StatIndicator color={getStatusColor("approved")} />
              <S.StatInfo>
                <S.StatValue>{stats.approved}</S.StatValue>
                <S.StatLabel>Approved</S.StatLabel>
              </S.StatInfo>
            </S.StatItem>

            <S.StatItem>
              <S.StatIndicator color={getStatusColor("invoiced")} />
              <S.StatInfo>
                <S.StatValue>{stats.invoiced}</S.StatValue>
                <S.StatLabel>In Review</S.StatLabel>
              </S.StatInfo>
            </S.StatItem>

            <S.StatItem>
              <S.StatIndicator color={getStatusColor("completed")} />
              <S.StatInfo>
                <S.StatValue>{stats.completed}</S.StatValue>
                <S.StatLabel>Completed</S.StatLabel>
              </S.StatInfo>
            </S.StatItem>

            {stats.rejected > 0 && (
              <S.StatItem>
                <S.StatIndicator color={getStatusColor("rejected")} />
                <S.StatInfo>
                  <S.StatValue>{stats.rejected}</S.StatValue>
                  <S.StatLabel>Rejected</S.StatLabel>
                </S.StatInfo>
              </S.StatItem>
            )}
          </S.StatsGrid>
        </S.StatsCard>
      </S.StatsOverview>

      {/* Quick Actions for Regular Users */}
      {isRegularUser && userApplications.length > 0 && (
        <S.QuickActionsSection>
          <S.SectionTitle>Quick Actions</S.SectionTitle>
          <S.QuickActionsGrid>
            <S.QuickActionCard onClick={() => navigate("/applications/new")}>
              <S.QuickActionIcon>➕</S.QuickActionIcon>
              <S.QuickActionTitle>New Application</S.QuickActionTitle>
              <S.QuickActionDescription>
                Start a new visa application process
              </S.QuickActionDescription>
            </S.QuickActionCard>

            <S.QuickActionCard onClick={() => navigate("/dashboard")}>
              <S.QuickActionIcon>📋</S.QuickActionIcon>
              <S.QuickActionTitle>View All</S.QuickActionTitle>
              <S.QuickActionDescription>
                See all your applications in one place
              </S.QuickActionDescription>
            </S.QuickActionCard>

            <S.QuickActionCard
              onClick={() =>
                navigate("/applications/" + userApplications[0]?.id)
              }
            >
              <S.QuickActionIcon>👁️</S.QuickActionIcon>
              <S.QuickActionTitle>Latest Application</S.QuickActionTitle>
              <S.QuickActionDescription>
                Check your most recent submission
              </S.QuickActionDescription>
            </S.QuickActionCard>
          </S.QuickActionsGrid>
        </S.QuickActionsSection>
      )}

      {/* Applications List Section */}
      <S.ApplicationsSection>
        <S.SectionHeader>
          <div>
            <S.SectionTitle>
              {isAdmin ? "Client Applications" : "Your Applications"}
            </S.SectionTitle>
            <S.SectionSubtitle>
              {isAdmin
                ? activeTab === "current"
                  ? "Pending applications grouped by client for easy management"
                  : "Complete application history grouped by client"
                : "Your recent and active applications"}
            </S.SectionSubtitle>
          </div>

          {isAdmin && (
            <S.AdminTabs>
              <S.TabButton
                active={activeTab === "current"}
                onClick={() => setActiveTab("current")}
              >
                Current Applications
              </S.TabButton>
              <S.TabButton
                active={activeTab === "all"}
                onClick={() => setActiveTab("all")}
              >
                All Applications
              </S.TabButton>
            </S.AdminTabs>
          )}
        </S.SectionHeader>

        {renderApplicationsContent()}
      </S.ApplicationsSection>
    </S.DashboardContainer>
  );
};

export default Dashboard;
