import React from "react";
import * as S from "./styles";
import type { IUserWithApplications } from "../../../redux/types";

interface UserCardProps {
  user: IUserWithApplications;
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  const pendingApplicationsCount = user.applications?.length || 0;

  return (
    <S.UserCard onClick={onClick}>
      <S.CardHeader>
        <S.UserAvatar $type={user.role}>
          {user.role === "corporate" ? "🏢" : "👤"}
        </S.UserAvatar>

        <S.UserInfo>
          <S.UserName>{user.name}</S.UserName>
          <S.UserEmail>{user.email}</S.UserEmail>
        </S.UserInfo>

        <S.PendingBadge>
          <S.BadgeNumber>{pendingApplicationsCount}</S.BadgeNumber>
          <S.BadgeLabel>Pending</S.BadgeLabel>
        </S.PendingBadge>
      </S.CardHeader>
    </S.UserCard>
  );
};

export default UserCard;
