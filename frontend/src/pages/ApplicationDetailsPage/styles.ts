import styled, { css } from "styled-components";

export const ApplicationDetailsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
`;

export const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const BackButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.border.default};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-family: inherit;

  &:hover {
    background-color: ${({ theme }) => theme.background.secondary};
  }
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.text.primary};
  margin: 0;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const Section = styled.section`
  background: ${({ theme }) => theme.background.primary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.border.light};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const DetailLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.text.secondary};
`;

export const DetailValue = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const StatusBadge = styled.span<{ status: string }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: capitalize;

  ${({ status, theme }) => {
    switch (status) {
      case "approved":
        return css`
          background-color: ${theme.successColors["100"]};
          color: ${theme.successColors["700"]};
        `;
      case "rejected":
        return css`
          background-color: ${theme.errorColors["100"]};
          color: ${theme.errorColors["700"]};
        `;
      case "completed":
        return css`
          background-color: ${theme.primaryColors["100"]};
          color: ${theme.primaryColors["700"]};
        `;
      case "invoiced":
        return css`
          background-color: ${theme.secondaryColors["100"]};
          color: ${theme.secondaryColors["700"]};
        `;
      default:
        return css`
          background-color: ${theme.warningColors["100"]};
          color: ${theme.warningColors["700"]};
        `;
    }
  }}
`;

export const Remarks = styled.div`
  background-color: ${({ theme }) => theme.background.secondary};
  border-left: 3px solid ${({ theme }) => theme.primaryColors["500"]};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.text.secondary};

  strong {
    color: ${({ theme }) => theme.text.primary};
  }
`;

export const DocumentSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const DocumentSectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const DocumentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const DocumentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.border.light};
`;

export const DocumentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const DocumentType = styled.span`
  background-color: ${({ theme }) => theme.primaryColors["500"]};
  color: ${({ theme }) => theme.text.inverse};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: capitalize;
`;

export const DocumentName = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.text.primary};
`;

export const NoDocuments = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.text.secondary};
  font-style: italic;
`;

export const StatusTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const TimelineItem = styled.div<{
  status: "completed" | "pending" | "rejected";
}>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg} 0;
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 11px;
    top: 40px;
    bottom: -20px;
    width: 2px;
    background-color: ${({ theme }) => theme.border.light};
  }

  ${({ status, theme }) => {
    if (status === "completed") {
      return css`
        &::after {
          background-color: ${theme.successColors["500"]} !important;
        }
      `;
    } else if (status === "rejected") {
      return css`
        &::after {
          background-color: ${theme.errorColors["500"]} !important;
        }
      `;
    }
  }}
`;

export const TimelineDot = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.neutralColors["300"]};
  flex-shrink: 0;
  position: relative;
  z-index: 1;

  ${TimelineItem}[status="completed"] & {
    background-color: ${({ theme }) => theme.successColors["500"]};
  }

  ${TimelineItem}[status="rejected"] & {
    background-color: ${({ theme }) => theme.errorColors["500"]};
  }
`;

export const TimelineContent = styled.div`
  flex: 1;
`;

export const TimelineTitle = styled.h4`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`;

export const TimelineDate = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

export const TimelineRemarks = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.errorColors["500"]};
  margin: 0;
  font-style: italic;
`;
