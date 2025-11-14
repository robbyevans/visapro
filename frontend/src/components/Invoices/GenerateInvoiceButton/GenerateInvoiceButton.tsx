import React from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";

import type { IUserWithApplications } from "../../../redux/types";

interface Props {
  user: IUserWithApplications;
}

const GenerateInvoiceButton: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // IMPORTANT FIX
    navigate(`/invoices/new?user_id=${user.id}`);
  };

  return <S.Button onClick={handleClick}>Generate Invoice</S.Button>;
};

export default GenerateInvoiceButton;
