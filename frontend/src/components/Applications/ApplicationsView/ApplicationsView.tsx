import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useApplications } from "../../../redux/hooks/useApplications";
import { useUser } from "../../../redux/hooks/useUser";
import ApplicationList from "../ApplicationList/ApplicationList";
import UserCard from "../UserCard/UserCard";
import UserApplicationsModal from "../../Modals/UserApplicationsModal/UserApplicationsModal";
import { ApplicationFilter } from "../ApplicationFilter/ApplicationFilter";
import type { FilterState } from "../types";
import type { IApplication, IUserWithApplications } from "../../../redux/types";
import * as S from "./styles";

interface ApplicationsViewProps {
  onApplicationClick?: (applicationId: number) => void;
  showActions?: boolean;
  viewMode?: "admin" | "user";
  showFilters?: boolean;
  defaultFilter?: Partial<FilterState>;
}

// Helper functions
const getCutoffDate = (timeRange: string): Date => {
  const now = new Date();
  switch (timeRange) {
    case "last_week":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case "last_month":
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    case "last_3_months":
      return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
    case "last_6_months":
      return new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
    case "all_time":
    default:
      return new Date(0);
  }
};

const getSortValue = (
  application: IApplication,
  sortBy: FilterState["sortBy"]
): Date | string => {
  if (sortBy === "status") {
    return application.status;
  }

  const value = application[sortBy];
  if (
    typeof value === "string" &&
    (sortBy === "created_at" || sortBy === "updated_at")
  ) {
    return new Date(value);
  }

  return value as Date | string;
};

export const ApplicationsView: React.FC<ApplicationsViewProps> = ({
  onApplicationClick,
  showActions = false,
  viewMode = "user",
  showFilters = true,
  defaultFilter,
}) => {
  const {
    applications,
    groupedApplications,
    isLoading,
    error,
    fetchApplications,
    fetchGroupedApplications,
  } = useApplications();
  const { currentUser } = useUser();
  const [selectedUser, setSelectedUser] =
    useState<IUserWithApplications | null>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterState>(() => {
    const baseFilter: FilterState = {
      status: [],
      timeRange: "all_time",
      sortBy: "created_at",
      sortOrder: "desc",
    };

    if (defaultFilter) {
      return { ...baseFilter, ...defaultFilter };
    }

    if (viewMode === "admin") {
      return {
        ...baseFilter,
        status: ["pending"],
        sortBy: "created_at",
      };
    }

    // User default filter: show all statuses, last 3 months
    return {
      ...baseFilter,
      status: [],
      timeRange: "last_3_months",
      sortBy: "updated_at",
    };
  });
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const isAdmin = currentUser?.role === "admin";

  // Load filters from URL on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlFilters: Partial<FilterState> = {};

    const status = searchParams.get("status");
    if (status) {
      urlFilters.status = status.split(",");
    }

    const timeRange = searchParams.get("time_range");
    if (timeRange) {
      urlFilters.timeRange = timeRange as FilterState["timeRange"];
    }

    const sortBy = searchParams.get("sort_by");
    if (sortBy) {
      urlFilters.sortBy = sortBy as FilterState["sortBy"];
    }

    const sortOrder = searchParams.get("sort_order");
    if (sortOrder) {
      urlFilters.sortOrder = sortOrder as FilterState["sortOrder"];
    }

    if (Object.keys(urlFilters).length > 0) {
      setCurrentFilter((prev) => ({ ...prev, ...urlFilters }));
    }
  }, []);

  // Save filters to URL whenever they change
  useEffect(() => {
    const searchParams = new URLSearchParams();

    if (currentFilter.status.length > 0) {
      searchParams.set("status", currentFilter.status.join(","));
    }

    if (currentFilter.timeRange !== "all_time") {
      searchParams.set("time_range", currentFilter.timeRange);
    }

    searchParams.set("sort_by", currentFilter.sortBy);
    searchParams.set("sort_order", currentFilter.sortOrder);

    // Update URL without page reload
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [currentFilter]);

  // Initial fetch when component mounts
  useEffect(() => {
    if (isAdmin && viewMode === "admin") {
      fetchGroupedApplications();
    } else {
      fetchApplications();
    }
  }, [fetchApplications, fetchGroupedApplications, isAdmin, viewMode]);

  // Reset filter when viewMode changes
  useEffect(() => {
    setCurrentFilter({
      status: [],
      timeRange: "all_time",
      sortBy: "created_at",
      sortOrder: "desc",
      ...defaultFilter,
    });
  }, [viewMode, defaultFilter]);

  const filteredGroupedApplications = useMemo(() => {
    if (!isAdmin || viewMode !== "admin") {
      return [];
    }

    return groupedApplications
      .map((user) => ({
        ...user,
        applications:
          user.applications?.filter((app) => app.status === "pending") || [],
      }))
      .filter((user) => user.applications.length > 0);
  }, [groupedApplications, isAdmin, viewMode]);

  // Client-side filtering and sorting for regular view
  const filteredApplications = useMemo(() => {
    if (isAdmin && viewMode === "admin") {
      return []; // Don't filter for admin grouped view
    }

    let filtered = [...applications];

    // Apply status filter
    if (currentFilter.status.length > 0) {
      filtered = filtered.filter((app) =>
        currentFilter.status.includes(app.status)
      );
    }

    // Apply time range filter
    if (currentFilter.timeRange !== "all_time") {
      const cutoffDate = getCutoffDate(currentFilter.timeRange);
      filtered = filtered.filter(
        (app) => new Date(app.updated_at) >= cutoffDate
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = getSortValue(a, currentFilter.sortBy);
      const bValue = getSortValue(b, currentFilter.sortBy);

      if (currentFilter.sortOrder === "desc") {
        if (aValue instanceof Date && bValue instanceof Date) {
          return bValue.getTime() - aValue.getTime();
        }
        return String(bValue).localeCompare(String(aValue));
      } else {
        if (aValue instanceof Date && bValue instanceof Date) {
          return aValue.getTime() - bValue.getTime();
        }
        return String(aValue).localeCompare(String(bValue));
      }
    });

    return filtered;
  }, [applications, currentFilter, isAdmin, viewMode]);

  // Get active filter count for badge
  const getActiveFilterCount = useCallback(() => {
    let count = 0;
    if (currentFilter.status.length > 0) {
      count += currentFilter.status.length;
    }
    if (currentFilter.timeRange !== "all_time") {
      count += 1;
    }
    return count;
  }, [currentFilter]);

  const handleFilterChange = (filter: FilterState) => {
    setCurrentFilter(filter);
  };

  const handleApplyFilters = () => {
    setShowFilterPanel(false);
  };

  const handleUserClick = (user: IUserWithApplications) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const activeFilterCount = getActiveFilterCount();

  // For admin view with grouped applications
  if (isAdmin && viewMode === "admin") {
    if (isLoading) {
      return (
        <S.AdminViewContainer>
          <S.LoadingContainer>
            <p>Loading pending client applications...</p>
          </S.LoadingContainer>
        </S.AdminViewContainer>
      );
    }

    if (error) {
      return (
        <S.AdminViewContainer>
          <S.ErrorContainer>
            <p>Error loading applications: {error}</p>
            <S.RetryButton onClick={fetchGroupedApplications}>
              Try Again
            </S.RetryButton>
          </S.ErrorContainer>
        </S.AdminViewContainer>
      );
    }

    if (filteredGroupedApplications.length === 0) {
      return (
        <S.AdminViewContainer>
          <S.EmptyState>
            <S.EmptyStateIcon>✅</S.EmptyStateIcon>
            <S.EmptyStateTitle>No Pending Applications</S.EmptyStateTitle>
            <S.EmptyStateDescription>
              All applications have been processed. When new applications are
              submitted, they will appear here.
            </S.EmptyStateDescription>
          </S.EmptyState>
        </S.AdminViewContainer>
      );
    }

    const corporateClients = filteredGroupedApplications.filter(
      (user) => user.role === "corporate"
    );
    const individualClients = filteredGroupedApplications.filter(
      (user) => user.role === "individual"
    );

    return (
      <>
        <S.AdminViewContainer>
          <S.AdminHeader>
            <S.AdminTitle>Pending Applications</S.AdminTitle>
          </S.AdminHeader>

          {/* Corporate Clients Section */}
          {corporateClients.length > 0 && (
            <S.ClientSection>
              <S.SectionTitle>
                Corporate Clients ({corporateClients.length})
              </S.SectionTitle>
              <S.ClientsGrid>
                {corporateClients.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onClick={() => handleUserClick(user)}
                  />
                ))}
              </S.ClientsGrid>
            </S.ClientSection>
          )}

          {/* Individual Clients Section */}
          {individualClients.length > 0 && (
            <S.ClientSection>
              <S.SectionTitle>
                Individual Clients ({individualClients.length})
              </S.SectionTitle>
              <S.ClientsGrid>
                {individualClients.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onClick={() => handleUserClick(user)}
                  />
                ))}
              </S.ClientsGrid>
            </S.ClientSection>
          )}
        </S.AdminViewContainer>

        {/* Modal for viewing user applications */}
        {selectedUser && (
          <UserApplicationsModal
            user={selectedUser}
            onClose={handleCloseModal}
          />
        )}
      </>
    );
  }

  // Original logic for regular users and admin viewing individual applications
  return (
    <S.ApplicationsViewContainer>
      <S.ViewHeader>
        <S.HeaderActions>
          {showFilters && (
            <S.FilterToggle
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              active={showFilterPanel || activeFilterCount > 0}
            >
              <S.FilterIcon>🔍</S.FilterIcon>
              Filters
              {activeFilterCount > 0 && (
                <S.FilterCount>{activeFilterCount}</S.FilterCount>
              )}
            </S.FilterToggle>
          )}
        </S.HeaderActions>
      </S.ViewHeader>

      {showFilters && showFilterPanel && (
        <S.FilterPanel>
          <ApplicationFilter
            currentFilter={currentFilter}
            onFilterChange={handleFilterChange}
            viewMode={viewMode}
            isFiltering={false}
          />
          <S.FilterActions>
            <S.CloseFiltersButton onClick={handleApplyFilters}>
              Apply Filters
            </S.CloseFiltersButton>
          </S.FilterActions>
        </S.FilterPanel>
      )}

      <ApplicationList
        applications={filteredApplications}
        onApplicationClick={onApplicationClick}
        showActions={showActions}
        isLoading={isLoading}
        isFiltering={false}
        error={error}
        viewMode={viewMode}
        activeFilterCount={activeFilterCount}
      />
    </S.ApplicationsViewContainer>
  );
};
