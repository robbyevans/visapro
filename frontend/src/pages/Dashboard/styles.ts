import styled from "styled-components";

export const DashboardContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.background.secondary};
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
    ${({ theme }) => theme.spacing.sm};
  }
`;

export const DashboardHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.background.primary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.border.light};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const WelcomeSection = styled.div`
  flex: 1;
`;

export const WelcomeTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primaryColors["500"]} 0%,
    ${({ theme }) => theme.secondaryColors["500"]} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  }
`;

export const WelcomeSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.text.secondary};
  line-height: 1.5;
  max-width: 500px;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: 768px) {
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

export const StatsOverview = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

// Unified Stats Card for both mobile and desktop
export const StatsCard = styled.div`
  background: ${({ theme }) => theme.background.primary};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.border.light};
`;

export const StatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.border.light};
`;

export const StatsTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
  margin: 0;
`;

export const StatsTotal = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.primaryColors["500"]};
  background: ${({ theme }) => theme.primaryColors["50"]};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const StatsGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: background-color 0.2s ease;
  min-width: 120px;

  &:hover {
    background: ${({ theme }) => theme.background.secondary};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
    min-width: auto;
  }
`;

export const StatIndicator = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ color }) => color};
  flex-shrink: 0;
`;

export const StatInfo = styled.div`
  flex: 1;
`;

export const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.text.primary};
  line-height: 1;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 2px;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

// Quick Actions Section
export const QuickActionsSection = styled.section`
  background: ${({ theme }) => theme.background.primary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const QuickActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const QuickActionCard = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    border-color: ${({ theme }) => theme.primaryColors["500"]};
    background: ${({ theme }) => theme.primaryColors["50"]};
    transform: translateY(-2px);
  }
`;

export const QuickActionIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const QuickActionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
`;

export const QuickActionDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.text.secondary};
  margin: 0;
  line-height: 1.4;
`;

export const ApplicationsSection = styled.section`
  background: ${({ theme }) => theme.background.primary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  box-shadow: ${({ theme }) => theme.shadows.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.text.primary};
  margin: 0;
`;

export const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.text.secondary};
  margin: 0;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing["3xl"]};
  ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.text.secondary};
`;

export const EmptyStateIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize["5xl"]};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  opacity: 0.5;
`;

export const EmptyStateTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

export const EmptyStateDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  margin: 0 0 ${({ theme }) => theme.spacing.xl} 0;
  line-height: 1.5;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;
