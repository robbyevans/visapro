import styled from "styled-components";

export const DashboardContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px;
  background: #f8fafc;
  min-height: 100vh;
`;

export const DashboardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

export const WelcomeSection = styled.div`
  flex: 1;
`;

export const WelcomeTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const WelcomeSubtitle = styled.p`
  font-size: 16px;
  color: #6b7280;
  line-height: 1.5;
  max-width: 500px;
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

export const StatsOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

interface StatCardProps {
  variant:
    | "total"
    | "pending"
    | "approved"
    | "rejected"
    | "inReview"
    | "completed";
}

export const StatCard = styled.div<StatCardProps>`
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-left: 4px solid
    ${(props) => {
      switch (props.variant) {
        case "total":
          return "#6366f1";
        case "pending":
          return "#f59e0b";
        case "approved":
          return "#10b981";
        case "rejected":
          return "#ef4444";
        case "inReview":
          return "#3b82f6";
        case "completed":
          return "#8b5cf6";
        default:
          return "#6b7280";
      }
    }};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

export const StatIcon = styled.div`
  font-size: 32px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 12px;
`;

export const StatContent = styled.div`
  flex: 1;
`;

export const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1;
  margin-bottom: 4px;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const StatTrend = styled.div`
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;
`;

export const QuickActionsSection = styled.section`
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-bottom: 32px;
`;

export const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

export const QuickActionCard = styled.div`
  background: #f8fafc;
  padding: 24px;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    border-color: #6366f1;
    background: #eff6ff;
    transform: translateY(-2px);
  }
`;

export const QuickActionIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
`;

export const QuickActionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
`;

export const QuickActionDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
`;

export const StatusDistribution = styled.section`
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-bottom: 32px;
`;

export const DistributionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

export const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  transition: background 0.2s ease;

  &:hover {
    background: #f1f5f9;
  }
`;

interface StatusIndicatorProps {
  color: string;
}

export const StatusIndicator = styled.div<StatusIndicatorProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => props.color};
`;

export const StatusInfo = styled.div`
  flex: 1;
`;

export const StatusName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  text-transform: capitalize;
`;

export const StatusCount = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

export const StatusPercentage = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
`;

export const ApplicationsSection = styled.section`
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-bottom: 32px;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

export const SectionSubtitle = styled.p`
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
  margin-bottom: 20px;
  opacity: 0.5;
`;

export const EmptyStateTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 12px 0;
`;

export const EmptyStateDescription = styled.p`
  font-size: 16px;
  margin: 0 0 32px 0;
  line-height: 1.5;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

export const AdminInsights = styled.section`
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

export const InsightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

export const InsightCard = styled.div`
  text-align: center;
  padding: 24px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
`;

export const InsightValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 8px;
`;

export const InsightLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
`;

export const InsightTrend = styled.div`
  font-size: 12px;
  color: #9ca3af;
`;
