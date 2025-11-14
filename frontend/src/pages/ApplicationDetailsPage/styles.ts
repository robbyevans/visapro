import styled, { css } from "styled-components";

export const ApplicationDetailsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
    ${({ theme }) => theme.spacing.sm};
    max-width: 100%;
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-height: 400px;
  width: 100%;

  @media (max-width: 768px) {
    min-height: 300px;
  }

  @media (max-width: 480px) {
    min-height: 200px;
  }
`;

export const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
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

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.xs};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    width: 100%;
    justify-content: center;
  }
`;

export const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.text.primary};
  margin: 0;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    line-height: 1.3;
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    text-align: center;
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.lg};
  }

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const Section = styled.section`
  background: ${({ theme }) => theme.background.primary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.border.light};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    text-align: center;
  }
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const TravelDateItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: fit-content;
  padding: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.errorColors["50"]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.errorColors["700"]};
`;

export const DetailLabel = styled.span<{ $noColor?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme, $noColor }) =>
    $noColor ? "inherit" : theme.text.secondary};

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const DetailValue = styled.span<{ $noColor?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme, $noColor }) =>
    $noColor ? "inherit" : theme.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

export const StatusBadge = styled.span<{ status: string }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: capitalize;
  display: inline-block;
  width: fit-content;

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

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
  }
`;

export const Remarks = styled.div`
  background-color: ${({ theme }) => theme.background.secondary};
  border-left: 3px solid ${({ theme }) => theme.primaryColors["500"]};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.text.secondary};
  word-break: break-word;

  strong {
    color: ${({ theme }) => theme.text.primary};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const DocumentSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export const DocumentSectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    text-align: center;
  }
`;

export const DocumentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const DocumentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.border.light};
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const DocumentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
  min-width: 0; /* Allow text truncation */

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const DocumentType = styled.span`
  background-color: ${({ theme }) => theme.primaryColors["500"]};
  color: ${({ theme }) => theme.text.inverse};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: capitalize;
  flex-shrink: 0;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.xs};
    align-self: flex-start;
  }
`;

export const DocumentName = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.text.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0; /* FIXED: Allow proper text truncation */
  max-width: 150px; /* FIXED: Set a fixed max width for consistent truncation */

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    max-width: 120px; /* Smaller max width for mobile */
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    max-width: 100px; /* Even smaller for very small screens */
  }
`;

export const NoDocuments = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.text.secondary};
  font-style: italic;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg};
    ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const StatusTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.md};
  }
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

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.md} 0;

    &:not(:last-child)::after {
      left: 9px;
      top: 32px;
    }
  }

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.xs};
    padding: ${({ theme }) => theme.spacing.sm} 0;

    &:not(:last-child)::after {
      left: 7px;
      top: 28px;
    }
  }
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

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 480px) {
    width: 16px;
    height: 16px;
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
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const TimelineDate = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.text.secondary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  }
`;

export const TimelineRemarks = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.errorColors["500"]};
  margin: 0;
  font-style: italic;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const DocumentActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    gap: ${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const PreviewButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.primaryColors["500"]};
  color: ${({ theme }) => theme.primaryColors["500"]};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex: 1;

  &:hover {
    background-color: ${({ theme }) => theme.primaryColors["50"]};
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.xs};
  }
`;

export const DownloadButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.successColors["500"]};
  color: ${({ theme }) => theme.successColors["500"]};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex: 1;

  &:hover {
    background-color: ${({ theme }) => theme.successColors["50"]};
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.xs};
  }
`;
