import styled from "styled-components";

export const UserCard = styled.div`
  background: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: ${({ theme }) => theme.primaryColors["300"]};
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-2px);

    ${/* Animated border effect on hover */ ""}
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(
        90deg,
        ${({ theme }) => theme.primaryColors["500"]} 0%,
        ${({ theme }) => theme.secondaryColors["500"]} 100%
      );
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease;
    }

    &::before {
      transform: scaleX(1);
    }
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.lg};

    &:hover {
      transform: translateY(-1px);
    }
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  position: relative;

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

export const UserAvatar = styled.div<{ $type: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ $type, theme }) =>
    $type === "corporate"
      ? `linear-gradient(135deg, ${theme.secondaryColors["100"]} 0%, ${theme.secondaryColors["200"]} 100%)`
      : `linear-gradient(135deg, ${theme.primaryColors["100"]} 0%, ${theme.primaryColors["200"]} 100%)`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  flex-shrink: 0;
  border: 2px solid
    ${({ $type, theme }) =>
      $type === "corporate"
        ? theme.secondaryColors["200"]
        : theme.primaryColors["200"]};

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }
`;

export const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const UserName = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.text.primary};
  margin: 0;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

export const UserEmail = styled.p`
  color: ${({ theme }) => theme.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  margin: 0;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const PendingBadge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.primaryColors["500"]};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  min-width: 60px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
    min-width: 50px;
  }
`;

export const BadgeNumber = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 1;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  }
`;

export const BadgeLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 2px;
  opacity: 0.9;
  line-height: 1;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;

export const UserType = styled.span<{ $type: string }>`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $type, theme }) =>
    $type === "corporate"
      ? theme.secondaryColors["50"]
      : theme.primaryColors["50"]};
  color: ${({ $type, theme }) =>
    $type === "corporate"
      ? theme.secondaryColors["700"]
      : theme.primaryColors["700"]};
  border: 1px solid
    ${({ $type, theme }) =>
      $type === "corporate"
        ? theme.secondaryColors["200"]
        : theme.primaryColors["200"]};
  flex-shrink: 0;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    padding: ${({ theme }) => theme.spacing.xs};
    ${({ theme }) => theme.spacing.sm};
  }
`;

export const ViewIndicator = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.primaryColors["500"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: color 0.2s ease;

  ${UserCard}:hover & {
    color: ${({ theme }) => theme.primaryColors["600"]};
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
  }
`;
