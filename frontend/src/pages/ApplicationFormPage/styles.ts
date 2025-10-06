import styled from "styled-components";

export const ApplicationFormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 24px;
`;

export const FormHeader = styled.header`
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

export const FormTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
`;

export const FormSubtitle = styled.p`
  font-size: 18px;
  color: #6b7280;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const FormSection = styled.section`
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

export const ToggleGroup = styled.div`
  display: flex;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 24px;
`;

export const ToggleButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px 16px;
  border: none;
  background: ${(props) => (props.active ? "#3b82f6" : "white")};
  color: ${(props) => (props.active ? "white" : "#374151")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.active ? "#2563eb" : "#f9fafb")};
  }
`;

export const NewAthleteForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const DocumentsInfo = styled.div`
  background: #f8fafc;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #4b5563;

  ul {
    margin: 8px 0 0 20px;
  }
`;

export const UploadedFiles = styled.div`
  margin-top: 20px;
  padding: 16px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;

  h4 {
    margin: 0 0 12px 0;
    color: #166534;
  }
`;

export const FileItem = styled.div`
  padding: 8px 12px;
  background: white;
  border: 1px solid #d1fae5;
  border-radius: 4px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #065f46;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
`;
