import React from "react";
import { useNavigate } from "react-router-dom";
import ApplicationCard from "../../Applications/ApplicationCard/ApplicationCard";
import * as S from "./styles";
import type { IUserWithApplications } from "../../../redux/types";

interface UserApplicationsModalProps {
  user: IUserWithApplications;
  onClose: () => void;
}

const UserApplicationsModal: React.FC<UserApplicationsModalProps> = ({
  user,
  onClose,
}) => {
  const navigate = useNavigate();
  const { applications = [] } = user;
  const hasApplications = applications.length > 0;

  const infoItems = [
    { label: "Email", value: user.email },
    { label: "Total Applications", value: user.application_count },
    { label: "Pending", value: user.pending_applications_count },
    { label: "Invoiced", value: user.invoiced_applications_count },
  ];

  const handleApplicationClick = (applicationId: number) => {
    // Close the modal first
    onClose();
    // Then navigate to the admin application page
    navigate(`/admin/applications/${applicationId}`);
  };

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>
            Applications for {user.name}
            <S.UserType $type={user.role}>({user.role})</S.UserType>
          </S.ModalTitle>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.ModalHeader>

        <S.ModalBody>
          <S.ClientInfo>
            {infoItems.map((item, index) => (
              <S.InfoItem key={index}>
                <strong>{item.label}:</strong> {item.value}
              </S.InfoItem>
            ))}
          </S.ClientInfo>

          <S.ApplicationsSection>
            <S.SectionTitle>
              Applications ({applications.length})
            </S.SectionTitle>

            {hasApplications ? (
              <S.ApplicationsGrid>
                {applications.map((application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                    showActions={false}
                    onClick={() => handleApplicationClick(application.id)}
                  />
                ))}
              </S.ApplicationsGrid>
            ) : (
              <S.NoApplications>
                No applications found for this user.
              </S.NoApplications>
            )}
          </S.ApplicationsSection>
        </S.ModalBody>

        <S.ModalFooter>
          <S.CloseModalButton onClick={onClose}>Close</S.CloseModalButton>
        </S.ModalFooter>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

export default UserApplicationsModal;
