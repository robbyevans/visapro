import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../redux/hooks/useUser";
import { useApplications } from "../../redux/hooks/useApplications";
import ApplicationList from "../../components/Applications/ApplicationList/ApplicationList";
import Button from "../../components/Button/Button";
import * as S from "./styles";

const Dashboard: React.FC = () => {
  const { currentUser } = useUser();
  const { applications, fetchApplications } = useApplications();
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

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
      in_review: "#3B82F6",
      completed: "#8B5CF6",
    };
    return colors[status as keyof typeof colors] || "#6B7280";
  };

  return (
    <S.DashboardContainer>
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

      {/* Statistics Overview */}
      <S.StatsOverview>
        <S.StatCard variant="total">
          <S.StatIcon>📊</S.StatIcon>
          <S.StatContent>
            <S.StatValue>{stats.total}</S.StatValue>
            <S.StatLabel>Total Applications</S.StatLabel>
          </S.StatContent>
          <S.StatTrend>All submissions</S.StatTrend>
        </S.StatCard>

        <S.StatCard variant="pending">
          <S.StatIcon>⏳</S.StatIcon>
          <S.StatContent>
            <S.StatValue>{stats.pending}</S.StatValue>
            <S.StatLabel>Pending</S.StatLabel>
          </S.StatContent>
          <S.StatTrend>Awaiting action</S.StatTrend>
        </S.StatCard>

        <S.StatCard variant="inReview">
          <S.StatIcon>🔍</S.StatIcon>
          <S.StatContent>
            <S.StatValue>{stats.invoiced}</S.StatValue>
            <S.StatLabel>In Review</S.StatLabel>
          </S.StatContent>
          <S.StatTrend>Under examination</S.StatTrend>
        </S.StatCard>

        <S.StatCard variant="approved">
          <S.StatIcon>✅</S.StatIcon>
          <S.StatContent>
            <S.StatValue>{stats.approved}</S.StatValue>
            <S.StatLabel>Approved</S.StatLabel>
          </S.StatContent>
          <S.StatTrend>Successful applications</S.StatTrend>
        </S.StatCard>

        <S.StatCard variant="rejected">
          <S.StatIcon>❌</S.StatIcon>
          <S.StatContent>
            <S.StatValue>{stats.rejected}</S.StatValue>
            <S.StatLabel>Rejected</S.StatLabel>
          </S.StatContent>
          <S.StatTrend>Requires attention</S.StatTrend>
        </S.StatCard>

        <S.StatCard variant="completed">
          <S.StatIcon>🎉</S.StatIcon>
          <S.StatContent>
            <S.StatValue>{stats.completed}</S.StatValue>
            <S.StatLabel>Completed</S.StatLabel>
          </S.StatContent>
          <S.StatTrend>Process finished</S.StatTrend>
        </S.StatCard>
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

      {/* Status Distribution Chart */}
      {userApplications.length > 0 && (
        <S.StatusDistribution>
          <S.SectionTitle>Application Status Distribution</S.SectionTitle>
          <S.DistributionGrid>
            {Object.entries(stats).map(
              ([status, count]) =>
                status !== "total" &&
                count > 0 && (
                  <S.StatusItem key={status}>
                    <S.StatusIndicator color={getStatusColor(status)} />
                    <S.StatusInfo>
                      <S.StatusName>
                        {status
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </S.StatusName>
                      <S.StatusCount>{count} applications</S.StatusCount>
                    </S.StatusInfo>
                    <S.StatusPercentage>
                      {Math.round((count / stats.total) * 100)}%
                    </S.StatusPercentage>
                  </S.StatusItem>
                )
            )}
          </S.DistributionGrid>
        </S.StatusDistribution>
      )}

      {/* Applications List Section */}
      <S.ApplicationsSection>
        <S.SectionHeader>
          <S.SectionTitle>
            {isAdmin ? "All Applications" : "Your Applications"}
          </S.SectionTitle>
          <S.SectionSubtitle>
            {userApplications.length}{" "}
            {userApplications.length === 1 ? "application" : "applications"}{" "}
            total
          </S.SectionSubtitle>
        </S.SectionHeader>

        {userApplications.length === 0 ? (
          <S.EmptyState>
            <S.EmptyStateIcon>📝</S.EmptyStateIcon>
            <S.EmptyStateTitle>
              {isAdmin ? "No Applications Yet" : "No Applications Yet"}
            </S.EmptyStateTitle>
            <S.EmptyStateDescription>
              {isAdmin
                ? "When users submit visa applications, they will appear here for review."
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
        ) : (
          <ApplicationList
            applications={userApplications}
            onApplicationClick={handleApplicationClick}
            showActions={isAdmin}
          />
        )}
      </S.ApplicationsSection>

      {/* Admin Quick Stats */}
      {isAdmin && (
        <S.AdminInsights>
          <S.SectionTitle>System Overview</S.SectionTitle>
          <S.InsightsGrid>
            <S.InsightCard>
              <S.InsightValue>{applications.length}</S.InsightValue>
              <S.InsightLabel>Total Applications</S.InsightLabel>
              <S.InsightTrend>Across all users</S.InsightTrend>
            </S.InsightCard>
            <S.InsightCard>
              <S.InsightValue>{stats.pending}</S.InsightValue>
              <S.InsightLabel>Require Attention</S.InsightLabel>
              <S.InsightTrend>Pending review</S.InsightTrend>
            </S.InsightCard>
            <S.InsightCard>
              <S.InsightValue>
                {Math.round((stats.approved / applications.length) * 100) || 0}%
              </S.InsightValue>
              <S.InsightLabel>Approval Rate</S.InsightLabel>
              <S.InsightTrend>Overall success rate</S.InsightTrend>
            </S.InsightCard>
          </S.InsightsGrid>
        </S.AdminInsights>
      )}
    </S.DashboardContainer>
  );
};

export default Dashboard;
