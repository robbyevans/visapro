import styled from "styled-components";

export const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
`;

export const DashboardHeader = styled.header`
  margin-bottom: 40px;
`;

export const WelcomeTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
`;

export const WelcomeSubtitle = styled.p`
  font-size: 18px;
  color: #6b7280;
`;

export const DashboardStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
`;

export const StatCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #3b82f6;
`;

export const StatTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #111827;
`;

export const DashboardContent = styled.div`
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

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

export const ActionCard = styled.div`
  background: #f8fafc;
  padding: 24px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;

  &:hover {
    border-color: #3b82f6;
    background: #eff6ff;
  }
`;

export const ActionIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
`;

export const ActionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 8px 0;
`;

export const ActionDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
`;

export const EmptyStateIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

export const EmptyStateTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px 0;
`;

export const EmptyStateDescription = styled.p`
  font-size: 16px;
  margin: 0 0 24px 0;
  line-height: 1.5;
`;

export const AdminOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
`;

export const OverviewItem = styled.div`
  text-align: center;
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
`;

export const OverviewLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 8px;
`;

export const OverviewValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
`;

export const OverviewDescription = styled.div`
  font-size: 12px;
  color: #9ca3af;
`;
