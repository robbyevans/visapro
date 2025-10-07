import React, { useState, useMemo, useEffect } from "react";
import { useApplications } from "../../../redux/hooks/useApplications";
import ApplicationCard from "../ApplicationCard/ApplicationCard";
import { ApplicationFilter } from "../ApplicationFilter/ApplicationFilter";
import type { IApplication } from "../../../redux/types";
import type { FilterState } from "../types";
import Spinner from "../../Spinner/Spinner";
import EmptyState from "../../Common/EmptyState";
import * as S from "./styles";

interface ApplicationListProps {
  applications?: IApplication[];
  onApplicationClick?: (applicationId: number) => void;
  showActions?: boolean;
  isLoading?: boolean;
  viewMode?: "admin" | "user";
  showFilters?: boolean;
  defaultFilter?: Partial<FilterState>;
}

const ApplicationList: React.FC<ApplicationListProps> = ({
  applications: propApplications,
  onApplicationClick,
  showActions = false,
  isLoading: propIsLoading,
  viewMode = "user",
  showFilters = true,
  defaultFilter,
}) => {
  const {
    applications: hookApplications,
    isLoading: hookIsLoading,
    error,
  } = useApplications();

  const applications = propApplications || hookApplications;
  const isLoading = propIsLoading !== undefined ? propIsLoading : hookIsLoading;

  const getDefaultFilter = (): FilterState => {
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
        status: ["pending", "invoiced"],
        sortBy: "created_at",
      };
    }

    return {
      ...baseFilter,
      status: ["pending", "invoiced", "approved", "rejected"],
      timeRange: "last_3_months",
      sortBy: "updated_at",
    };
  };

  const [currentFilter, setCurrentFilter] = useState<FilterState>(
    getDefaultFilter()
  );
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Reset filter when viewMode changes
  useEffect(() => {
    setCurrentFilter(getDefaultFilter());
  }, [viewMode]);

  // Helper function to calculate cutoff date
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

  // Safe value getter for sorting
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

  // Filter and sort applications
  const filteredApplications = useMemo(() => {
    let filtered = applications;

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
    filtered = [...filtered].sort((a, b) => {
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
  }, [applications, currentFilter]);

  // Get active filter count for badge
  const getActiveFilterCount = () => {
    let count = 0;
    if (currentFilter.status.length > 0) {
      count += currentFilter.status.length;
    }
    if (currentFilter.timeRange !== "all_time") {
      count += 1;
    }
    return count;
  };

  const handleClearFilters = () => {
    setCurrentFilter(getDefaultFilter());
  };

  // Create a wrapper function for the filter change
  const handleFilterChange = (filter: FilterState) => {
    setCurrentFilter(filter);
  };

  if (isLoading) {
    return (
      <S.ApplicationListLoading>
        <Spinner size="lg" />
        <p>Loading applications...</p>
      </S.ApplicationListLoading>
    );
  }

  if (error) {
    return (
      <S.ApplicationListError>
        <p>Error loading applications: {error}</p>
        <S.RetryButton onClick={() => window.location.reload()}>
          Try Again
        </S.RetryButton>
      </S.ApplicationListError>
    );
  }

  const emptyStateProps =
    filteredApplications.length === 0
      ? {
          title:
            getActiveFilterCount() > 0
              ? "No matching applications"
              : "No applications yet",
          description:
            getActiveFilterCount() > 0
              ? "Try adjusting your filters to see more results."
              : viewMode === "admin"
              ? "When users submit visa applications, they will appear here for review."
              : "Get started by creating your first application.",
        }
      : null;

  if (filteredApplications.length === 0 && emptyStateProps) {
    return <EmptyState {...emptyStateProps} />;
  }

  return (
    <S.ApplicationListContainer>
      <S.ApplicationListHeader>
        <S.ApplicationListHeaderTitle>
          Applications
          {getActiveFilterCount() > 0 && (
            <S.FilterBadge>{getActiveFilterCount()} active</S.FilterBadge>
          )}
        </S.ApplicationListHeaderTitle>

        <S.HeaderActions>
          <S.ApplicationCount>
            {filteredApplications.length} application
            {filteredApplications.length !== 1 ? "s" : ""}
          </S.ApplicationCount>

          {showFilters && (
            <S.FilterToggle
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              active={showFilterPanel || getActiveFilterCount() > 0}
            >
              <S.FilterIcon>🔍</S.FilterIcon>
              Filters
              {getActiveFilterCount() > 0 && (
                <S.FilterCount>{getActiveFilterCount()}</S.FilterCount>
              )}
            </S.FilterToggle>
          )}
        </S.HeaderActions>
      </S.ApplicationListHeader>

      {showFilters && showFilterPanel && (
        <S.FilterPanel>
          <ApplicationFilter
            currentFilter={currentFilter}
            onFilterChange={handleFilterChange}
            viewMode={viewMode}
          />
          <S.FilterActions>
            <S.ClearFiltersButton onClick={handleClearFilters}>
              Clear All
            </S.ClearFiltersButton>
            <S.CloseFiltersButton onClick={() => setShowFilterPanel(false)}>
              Apply Filters
            </S.CloseFiltersButton>
          </S.FilterActions>
        </S.FilterPanel>
      )}

      <S.ApplicationGrid>
        {filteredApplications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onClick={() => onApplicationClick?.(application.id)}
            showActions={showActions}
          />
        ))}
      </S.ApplicationGrid>
    </S.ApplicationListContainer>
  );
};

export default ApplicationList;
