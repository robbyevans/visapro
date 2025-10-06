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
  return (
    <S.ApplicationCardContainer onClick={onClick}>
      <S.CardHeader>
        <S.CardTitle>
          {application.athlete?.first_name} {application.athlete?.last_name}
        </S.CardTitle>
        <S.StatusBadge status={application.status}>
          {application.status}
        </S.StatusBadge>
      </S.CardHeader>

      <S.CardContent>
        <S.CardDetail>
          <S.DetailLabel>Country:</S.DetailLabel>
          <S.DetailValue>{application.country}</S.DetailValue>
        </S.CardDetail>

        <S.CardDetail>
          <S.DetailLabel>Submitted:</S.DetailLabel>
          <S.DetailValue>
            {new Date(application.created_at).toLocaleDateString()}
          </S.DetailValue>
        </S.CardDetail>

        <S.CardDetail>
          <S.DetailLabel>Documents:</S.DetailLabel>
          <S.DetailValue>{application.documents.length}</S.DetailValue>
        </S.CardDetail>
      </S.CardContent>

      {application.remarks && (
        <S.CardRemarks>
          <strong>Remarks:</strong> {application.remarks}
        </S.CardRemarks>
      )}

      {showActions && (
        <S.CardActions>
          <S.SmallButton className="btn-secondary">View Details</S.SmallButton>
          {application.status === "pending" && (
            <>
              <S.SmallButton className="btn-success">Approve</S.SmallButton>
              <S.SmallButton className="btn-danger">Reject</S.SmallButton>
            </>
          )}
        </S.CardActions>
      )}
    </S.ApplicationCardContainer>
  );
};

export default ApplicationCard;
