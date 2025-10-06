import React from "react";
import { useApplications } from "../../../redux/hooks/useApplications";
import ApplicationCard from "../ApplicationCard/ApplicationCard";
import type { IApplication } from "../../../redux/types";
import Spinner from "../../Spinner/Spinner";
import EmptyState from "../../Common/EmptyState";
import * as S from "./styles";

interface ApplicationListProps {
  applications?: IApplication[];
  onApplicationClick?: (applicationId: number) => void;
  showActions?: boolean;
  filterStatus?: string;
  isLoading?: boolean;
}

const ApplicationList: React.FC<ApplicationListProps> = ({
  applications: propApplications,
  onApplicationClick,
  showActions = false,
  filterStatus,
  isLoading: propIsLoading,
}) => {
  const {
    applications: hookApplications,
    isLoading: hookIsLoading,
    error,
  } = useApplications();

  // Use provided applications or fall back to hook
  const applications = propApplications || hookApplications;
  const isLoading = propIsLoading !== undefined ? propIsLoading : hookIsLoading;

  const filteredApplications = filterStatus
    ? applications.filter((app) => app.status === filterStatus)
    : applications;

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
        <button
          onClick={() => window.location.reload()}
          className="btn btn-secondary"
        >
          Try Again
        </button>
      </S.ApplicationListError>
    );
  }

  if (filteredApplications.length === 0) {
    const emptyStateProps = filterStatus
      ? {
          title: `No ${filterStatus} applications`,
          description: `There are no ${filterStatus} applications at the moment.`,
        }
      : {
          title: "No applications yet",
          description: "Get started by creating your first application.",
        };

    return <EmptyState {...emptyStateProps} />;
  }

  return (
    <S.ApplicationListContainer>
      <S.ApplicationListHeader>
        <h2>
          Applications
          {filterStatus && <S.FilterBadge>({filterStatus})</S.FilterBadge>}
        </h2>
        <S.ApplicationCount>
          {filteredApplications.length} application
          {filteredApplications.length !== 1 ? "s" : ""}
        </S.ApplicationCount>
      </S.ApplicationListHeader>

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
