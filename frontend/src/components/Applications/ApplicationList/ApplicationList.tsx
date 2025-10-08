import React from "react";
import ApplicationCard from "../ApplicationCard/ApplicationCard";
import type { IApplication } from "../../../redux/types";
import Spinner from "../../Spinner/Spinner";
import EmptyState from "../../Common/EmptyState";
import * as S from "./styles";

interface ApplicationListProps {
  applications: IApplication[];
  onApplicationClick?: (applicationId: number) => void;
  showActions?: boolean;
  isLoading?: boolean;
  isFiltering?: boolean;
  error?: string | null;
  viewMode?: "admin" | "user";
  activeFilterCount?: number;
  totalCount?: number;
}

const ApplicationList: React.FC<ApplicationListProps> = ({
  applications,
  onApplicationClick,
  showActions = false,
  isLoading = false,
  isFiltering = false,
  error = null,
  viewMode = "user",
  activeFilterCount = 0,
  totalCount,
}) => {
  // Combined loading state
  const showLoading = isLoading || isFiltering;

  if (showLoading) {
    return (
      <S.ApplicationListLoading>
        <Spinner size="lg" />
        <p>{isFiltering ? "Applying filters..." : "Loading applications..."}</p>
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
    applications.length === 0
      ? {
          title:
            activeFilterCount > 0
              ? "No matching applications"
              : "No applications yet",
          description:
            activeFilterCount > 0
              ? "Try adjusting your filters to see more results."
              : viewMode === "admin"
              ? "When users submit visa applications, they will appear here for review."
              : "Get started by creating your first application.",
        }
      : null;

  if (applications.length === 0 && emptyStateProps) {
    return <EmptyState {...emptyStateProps} />;
  }

  return (
    <S.ApplicationListContainer>
      <S.ApplicationListHeader>
        <S.ApplicationListHeaderTitle>
          Applications
          {activeFilterCount > 0 && (
            <S.FilterBadge>{activeFilterCount} active</S.FilterBadge>
          )}
        </S.ApplicationListHeaderTitle>

        <S.HeaderActions>
          <S.ApplicationCount>
            {applications.length} application
            {applications.length !== 1 ? "s" : ""}
            {totalCount && totalCount > applications.length && (
              <span> of {totalCount}</span>
            )}
          </S.ApplicationCount>
        </S.HeaderActions>
      </S.ApplicationListHeader>

      <S.ApplicationGrid>
        {applications.map((application) => (
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
