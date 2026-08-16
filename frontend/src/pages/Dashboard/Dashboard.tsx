import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../redux/hooks/useUser";
import { useApplications } from "../../redux/hooks/useApplications";
import { ApplicationsView } from "../../components/Applications/ApplicationsView/ApplicationsView";
import Button from "../../components/Button/Button";
import SuccessModal from "../../components/Modals/SucessModal/SucessModal";
import Spinner from "../../components/Spinner/Spinner";
import api from "../../redux/api";
import * as S from "./styles";

type AdminTab = "current" | "all";

interface CorporateUser {
  id: number;
  name: string;
  email: string;
  status: 0 | 1;
}

const Dashboard: React.FC = () => {
  const { currentUser, theme } = useUser();
  const { applications, groupedApplications, fetchApplications } =
    useApplications();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("current");

  // Corporate Users State
  const [corporateUsers, setCorporateUsers] = useState<CorporateUser[]>([]);
  const [isCorpLoading, setIsCorpLoading] = useState<boolean>(false);
  const [updatingUserId, setUpdatingUserId] = useState<number | null>(null);

  const isAdmin = currentUser?.role === "admin";
  const isRegularUser =
    currentUser?.role === "individual" || currentUser?.role === "corporate";

  console.info("groupedApplications:", groupedApplications);

  useEffect(() => {
    if (location.state?.message) {
      setShowSuccessModal(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Fetch Corporate Users
  const fetchCorporateUsers = useCallback(async () => {
    if (!isAdmin) return;
    try {
      setIsCorpLoading(true);
      const response = await api.get("/admin/corporate_users");
      const data = response.data?.users || response.data || [];
      const formattedData = (Array.isArray(data) ? data : []).map((u: any) => ({
        ...u,
        status: Number(u.status) === 1 ? 1 : 0,
      }));
      setCorporateUsers(formattedData);
    } catch (error) {
      console.error("Failed to fetch corporate users:", error);
    } finally {
      setIsCorpLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      fetchCorporateUsers();
    }
  }, [isAdmin, fetchCorporateUsers]);

  // Update Status handler
  const handleCorporateStatusChange = async (
    userId: number,
    newStatus: 0 | 1
  ) => {
    try {
      setUpdatingUserId(userId);
      await api.patch(`/admin/users/${userId}/status`, {
        status: newStatus,
      });

      setCorporateUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error("Failed to update corporate user status:", error);
      alert("Failed to update user status. Please try again.");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const userApplications = isAdmin
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
      return (
        <ApplicationsView
          showFilters={false}
          theme={theme}
          onApplicationClick={handleApplicationClick}
          viewMode="admin"
          defaultFilter={{
            status: [],
            timeRange: "all_time",
            sortBy: "created_at",
            sortOrder: "desc",
          }}
        />
      );
    }

    return (
      <ApplicationsView
        showFilters={!isAdmin}
        theme={theme}
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
              + New Task
            </Button>
          </S.HeaderActions>
        )}
      </S.DashboardHeader>

      {/* Stats Overview */}
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

      {/* Corporate Users List Section (Admin Only) */}
      {isAdmin && (
        <S.ApplicationsSection style={{ marginTop: "2rem" }}>
          <S.SectionHeader>
            <div>
              <S.SectionTitle>Corporate Users</S.SectionTitle>
              <S.SectionSubtitle>
                Manage corporate accounts and update their status (Active / Inactive)
              </S.SectionSubtitle>
            </div>
          </S.SectionHeader>

          {isCorpLoading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
              <Spinner size="md" />
            </div>
          ) : corporateUsers.length === 0 ? (
            <S.EmptyState>
              <S.EmptyStateIcon>🏢</S.EmptyStateIcon>
              <S.EmptyStateTitle>No Corporate Users</S.EmptyStateTitle>
              <S.EmptyStateDescription>
                There are currently no corporate users registered in the system.
              </S.EmptyStateDescription>
            </S.EmptyState>
          ) : (
            <div
              style={{
                width: "100%",
                overflowX: "auto",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                marginTop: "1rem",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#f9fafb",
                      borderBottom: "1px solid #e5e7eb",
                      color: "#4b5563",
                      fontSize: "13px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    <th style={{ padding: "12px 16px" }}>Name</th>
                    <th style={{ padding: "12px 16px" }}>Email</th>
                    <th style={{ padding: "12px 16px" }}>Status</th>
                    <th style={{ padding: "12px 16px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {corporateUsers.map((user) => (
                    <tr
                      key={user.id}
                      style={{
                        borderBottom: "1px solid #f3f4f6",
                        fontSize: "14px",
                      }}
                    >
                      <td
                        style={{
                          padding: "14px 16px",
                          fontWeight: 500,
                          color: "#111827",
                        }}
                      >
                        {user.name || "N/A"}
                      </td>
                      <td style={{ padding: "14px 16px", color: "#4b5563" }}>
                        {user.email}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 10px",
                            borderRadius: "9999px",
                            fontSize: "12px",
                            fontWeight: 600,
                            backgroundColor:
                              user.status === 1 ? "#dcfce7" : "#fee2e2",
                            color:
                              user.status === 1 ? "#15803d" : "#b91c1c",
                          }}
                        >
                          {user.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <select
                          value={user.status}
                          disabled={updatingUserId === user.id}
                          onChange={(e) =>
                            handleCorporateStatusChange(
                              user.id,
                              Number(e.target.value) as 0 | 1
                            )
                          }
                          style={{
                            padding: "6px 12px",
                            borderRadius: "6px",
                            border: "1px solid #d1d5db",
                            backgroundColor: "#ffffff",
                            color: "#374151",
                            fontSize: "13px",
                            cursor:
                              updatingUserId === user.id
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >
                          <option value={1}>Active</option>
                          <option value={0}>Inactive</option>
                        </select>
                        {updatingUserId === user.id && (
                          <span
                            style={{
                              marginLeft: "8px",
                              fontSize: "12px",
                              color: "#9ca3af",
                            }}
                          >
                            Saving...
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </S.ApplicationsSection>
      )}
    </S.DashboardContainer>
  );
};

export default Dashboard;