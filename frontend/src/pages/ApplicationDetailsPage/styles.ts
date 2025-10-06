import styled from "styled-components";

export const ApplicationDetailsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 24px;
`;

export const Header = styled.header`
  margin-bottom: 40px;
`;

export const BackButton = styled.button`
  background: none;
  border: 1px solid #d1d5db;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #374151;
  margin-bottom: 20px;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
`;

export const Section = styled.section`
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 24px;
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DetailLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
`;

export const DetailValue = styled.span`
  font-size: 16px;
  color: #111827;
  font-weight: 500;
`;

export const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;

  ${(props) => {
    switch (props.status) {
      case "approved":
        return `
          background-color: #d1fae5;
          color: #065f46;
        `;
      case "rejected":
        return `
          background-color: #fee2e2;
          color: #991b1b;
        `;
      case "completed":
        return `
          background-color: #dbeafe;
          color: #1e40af;
        `;
      case "invoiced":
        return `
          background-color: #f3e8ff;
          color: #7e22ce;
        `;
      default:
        return `
          background-color: #fef3c7;
          color: #92400e;
        `;
    }
  }}
`;

export const Remarks = styled.div`
  background-color: #f8fafc;
  border-left: 3px solid #3b82f6;
  padding: 16px;
  border-radius: 4px;
  font-size: 14px;
  color: #4b5563;

  strong {
    color: #374151;
  }
`;

export const DocumentSection = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const DocumentSectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 16px;
`;

export const DocumentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DocumentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f8fafc;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
`;

export const DocumentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const DocumentType = styled.span`
  background-color: #3b82f6;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
`;

export const DocumentName = styled.span`
  font-weight: 500;
  color: #374151;
`;

export const NoDocuments = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #6b7280;
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
  gap: 16px;
  padding: 20px 0;
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    left: 11px;
    top: 40px;
    bottom: -20px;
    width: 2px;
    background-color: #e5e7eb;
  }

  ${(props) => {
    if (props.status === "completed") {
      return `
        &::after {
          background-color: #10b981 !important;
        }
      `;
    } else if (props.status === "rejected") {
      return `
        &::after {
          background-color: #ef4444 !important;
        }
      `;
    }
  }}
`;

export const TimelineDot = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #d1d5db;
  flex-shrink: 0;
  position: relative;
  z-index: 1;

  ${TimelineItem}[status="completed"] & {
    background-color: #10b981;
  }

  ${TimelineItem}[status="rejected"] & {
    background-color: #ef4444;
  }
`;

export const TimelineContent = styled.div`
  flex: 1;
`;

export const TimelineTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
`;

export const TimelineDate = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 8px 0;
`;

export const TimelineRemarks = styled.p`
  font-size: 14px;
  color: #ef4444;
  margin: 0;
  font-style: italic;
`;
