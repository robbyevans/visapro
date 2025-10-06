import styled from "styled-components";

export const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 24px;
`;

export const ProfileHeader = styled.header`
  margin-bottom: 40px;
`;

export const ProfileTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
`;

export const ProfileSubtitle = styled.p`
  font-size: 18px;
  color: #6b7280;
`;

export const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
`;

export const ProfileSection = styled.section`
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export const SectionDescription = styled.p`
  color: #6b7280;
  margin-bottom: 24px;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InfoLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
`;

export const InfoValue = styled.span`
  font-size: 16px;
  color: #111827;
`;

export const RoleBadge = styled.span<{ role: string }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;

  ${(props) => {
    switch (props.role) {
      case "admin":
        return `
          background-color: #fef3c7;
          color: #92400e;
        `;
      case "corporate":
        return `
          background-color: #dbeafe;
          color: #1e40af;
        `;
      default:
        return `
          background-color: #d1fae5;
          color: #065f46;
        `;
    }
  }}
`;
