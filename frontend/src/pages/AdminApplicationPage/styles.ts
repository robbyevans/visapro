import styled from "styled-components";

export const AdminApplicationContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 24px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
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
`;

export const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 12px;
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
`;

export const DocumentsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const DocumentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  padding: 12px;
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

export const UploadControls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const AdminActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const RemarksInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
  min-height: 80px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const StatusButtons = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const StatusButton = styled.button<{ variant: string }>`
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) => {
    switch (props.variant) {
      case "approve":
        return `
          background-color: #10b981;
          color: white;

          &:hover {
            background-color: #059669;
          }

          &:disabled {
            background-color: #9ca3af;
            cursor: not-allowed;
          }
        `;
      case "reject":
        return `
          background-color: #ef4444;
          color: white;

          &:hover {
            background-color: #dc2626;
          }
        `;
      case "complete":
        return `
          background-color: #3b82f6;
          color: white;

          &:hover {
            background-color: #2563eb;
          }

          &:disabled {
            background-color: #9ca3af;
            cursor: not-allowed;
          }
        `;
      default:
        return `
          background-color: #6b7280;
          color: white;

          &:hover {
            background-color: #4b5563;
          }
        `;
    }
  }}
`;
