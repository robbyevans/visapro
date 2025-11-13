import React from "react";
import type { IApplication } from "../../../redux/types";
import * as S from "./styles";

interface ApplicationCardProps {
  application: IApplication;
  onClick?: () => void;
  showActions?: boolean;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  application,
  onClick,
  showActions = false,
}) => {
  const athleteFirstName = application.athlete?.first_name || "N/A";
  const athleteLastName = application.athlete?.last_name || "N/A";
  const documentsCount = application.documents?.length || 0;
  const formattedDate = application.created_at
    ? new Date(application.created_at).toLocaleDateString()
    : "N/A";

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    onClick?.();
  };

  return (
    <S.ApplicationCardContainer
      onClick={handleCardClick}
      $clickable={!!onClick}
    >
      <S.CardHeader>
        <S.CardTitle>
          {athleteFirstName} {athleteLastName}
        </S.CardTitle>
        <S.StatusBadge status={application.status}>
          {application.status}
        </S.StatusBadge>
      </S.CardHeader>

      <S.CardContent>
        <S.CardDetail>
          <S.DetailLabel>Country:</S.DetailLabel>
          <S.DetailValue>{application.country || "N/A"}</S.DetailValue>
        </S.CardDetail>

        <S.CardDetail>
          <S.DetailLabel>Submitted:</S.DetailLabel>
          <S.DetailValue>{formattedDate}</S.DetailValue>
        </S.CardDetail>

        <S.CardDetail>
          <S.DetailLabel>Documents:</S.DetailLabel>
          <S.DetailValue>{documentsCount}</S.DetailValue>
        </S.CardDetail>
      </S.CardContent>

      {application.remarks && (
        <S.CardRemarks>
          <strong>Remarks:</strong> {application.remarks}
        </S.CardRemarks>
      )}

      {showActions && (
        <S.CardActions>
          <S.SmallButton
            className="btn-secondary"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            View Details
          </S.SmallButton>
          {application.status === "pending" && (
            <>
              <S.SmallButton
                className="btn-success"
                onClick={(e) => e.stopPropagation()}
              >
                Approve
              </S.SmallButton>
              <S.SmallButton
                className="btn-danger"
                onClick={(e) => e.stopPropagation()}
              >
                Reject
              </S.SmallButton>
            </>
          )}
        </S.CardActions>
      )}
    </S.ApplicationCardContainer>
  );
};

export default ApplicationCard;
