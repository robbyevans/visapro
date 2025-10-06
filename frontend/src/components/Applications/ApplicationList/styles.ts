import styled from "styled-components";

export const ApplicationListContainer = styled.div`
  width: 100%;
`;

export const ApplicationListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
`;

export const ApplicationListHeaderTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const FilterBadge = styled.span`
  background-color: #3b82f6;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
`;

export const ApplicationCount = styled.span`
  color: #6b7280;
  font-size: 14px;
`;

export const ApplicationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
`;

export const ApplicationListLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #6b7280;
  gap: 16px;
`;

export const ApplicationListError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  gap: 16px;
`;

export const RetryButton = styled.button`
  background-color: #6b7280;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #4b5563;
  }
`;

// @media (max-width: 768px) {
//   .application-grid {
//     grid-template-columns: 1fr;
//   }

//   .application-list-header {
//     flex-direction: column;
//     align-items: flex-start;
//     gap: 8px;
//   }
// }
