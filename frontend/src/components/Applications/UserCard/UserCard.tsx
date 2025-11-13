import React from "react";
import * as S from "./styles";
import type { IUserWithApplications } from "../../../redux/types";

interface UserCardProps {
  user: IUserWithApplications;
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
  const userTypeDisplay =
    user.role === "corporate" ? "🏢 Corporate" : "👤 Individual";

  return (
    <S.UserCard onClick={onClick}>
      <S.UserHeader>
        <S.UserName>{user.name}</S.UserName>
        <S.UserType $type={user.role}>{userTypeDisplay}</S.UserType>
      </S.UserHeader>

      <S.UserEmail>{user.email}</S.UserEmail>

      <S.ApplicationStats>
        <S.Stat>
          <S.StatNumber>{user.application_count}</S.StatNumber>
          <S.StatLabel>Total</S.StatLabel>
        </S.Stat>
        {/* <S.Stat>
          <S.StatNumber>{user.pending_applications_count}</S.StatNumber>
          <S.StatLabel>Pending</S.StatLabel>
        </S.Stat>
        <S.Stat>
          <S.StatNumber>{user.invoiced_applications_count}</S.StatNumber>
          <S.StatLabel>Invoiced</S.StatLabel>
        </S.Stat> */}
      </S.ApplicationStats>

      <S.ViewApplicationsButton>View Applications →</S.ViewApplicationsButton>
    </S.UserCard>
  );
};

export default UserCard;
