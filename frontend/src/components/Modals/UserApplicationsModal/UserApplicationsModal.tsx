import React, { useEffect } from "react";
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

  const pendingApplications =
    user.applications?.filter((app) => app.status === "pending") || [];
  const hasPendingApplications = pendingApplications.length > 0;

  const infoItems = [
    { label: "Email", value: user.email },
    { label: "Total Applications", value: user.application_count },
    { label: "Pending Applications", value: user.pending_applications_count },
    { label: "Invoiced", value: user.invoiced_applications_count },
  ];

  useEffect(() => {
    const scrollY = window.scrollY;
    const body = document.body;

    const originalStyle = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      body.style.overflow = originalStyle.overflow || "";
      body.style.position = originalStyle.position || "";
      body.style.top = originalStyle.top || "";
      body.style.width = originalStyle.width || "";

      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handleApplicationClick = (applicationId: number) => {
    onClose();
    navigate(`/admin/applications/${applicationId}`);
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>
            Pending Applications for {user.name}
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
              Pending Applications ({pendingApplications.length})
            </S.SectionTitle>

            {hasPendingApplications ? (
              <S.ApplicationsWrapper>
                {pendingApplications.map((application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                    showActions={false}
                    onClick={() => handleApplicationClick(application.id)}
                  />
                ))}
              </S.ApplicationsWrapper>
            ) : (
              <S.NoApplications>
                No pending applications found for this user.
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
