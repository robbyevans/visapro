import React from "react";
import * as S from "./styles";
import type { IUserWithApplications } from "../../../redux/types";
import type { TUserThemePreference } from "../../../redux/types";
interface UserCardProps {
  theme?: TUserThemePreference;
  user: IUserWithApplications;
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick, theme }) => {
  // Calculate pending applications count
  const pendingApplicationsCount =
    user.applications?.filter((app) => app.status === "pending").length || 0;

  // Check if there are any pending applications to show the badge
  const hasPendingApplications = pendingApplicationsCount > 0;

  return (
    <S.UserCard onClick={onClick} $themeMode={theme}>
      <S.CardHeader>
        <S.UserAvatar $type={user.role}>
          {user.role === "corporate" ? "🏢" : "👤"}
        </S.UserAvatar>

        <S.UserInfo>
          <S.UserName>{user.name}</S.UserName>
          <S.UserEmail>{user.email}</S.UserEmail>
        </S.UserInfo>

        {/* Only show badge if there are pending applications */}
        {hasPendingApplications && (
          <S.PendingBadge>
            <S.BadgeNumber>{pendingApplicationsCount}</S.BadgeNumber>
            <S.BadgeLabel>Pending</S.BadgeLabel>
          </S.PendingBadge>
        )}
      </S.CardHeader>
    </S.UserCard>
  );
};

export default UserCard;
