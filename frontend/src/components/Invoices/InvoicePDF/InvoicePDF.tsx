import React from "react";
import type { IInvoice, IUserWithApplications } from "../../../redux/types";
import * as S from "./styles";

interface Props {
  invoice: IInvoice;
  user: IUserWithApplications; // <-- user info comes from parent
}

const InvoicePDF: React.FC<Props> = ({ invoice, user }) => {
  const totalAmount = Number(invoice.total_amount ?? 0);

  return (
    <S.Container>
      <S.HeaderSection>
        <S.Title>INVOICE</S.Title>

        <div>
          <S.Label>Invoice Number:</S.Label> {invoice.invoice_number}
          <br />
          <S.Label>Issue Date:</S.Label> {invoice.issue_date}
          <br />
          <S.Label>Due Date:</S.Label> {invoice.due_date ?? "N/A"}
        </div>
      </S.HeaderSection>

      {/* BILLING INFO */}
      <S.Section>
        <S.Subtitle>Billed To</S.Subtitle>
        <div>{user.name}</div>
        <div>{user.email}</div>
      </S.Section>

      {/* TABLE OF APPLICATIONS */}
      <S.Table>
        <thead>
          <tr>
            <S.Th>Application ID</S.Th>
            <S.Th>Athlete</S.Th>
            <S.Th>Country</S.Th>
            <S.Th className="right">Unit Price</S.Th>
          </tr>
        </thead>

        <tbody>
          {invoice.applications.map((app) => (
            <tr key={app.id}>
              <S.Td>#{app.id}</S.Td>

              <S.Td>
                {app.athlete?.first_name} {app.athlete?.last_name}
              </S.Td>

              <S.Td>{app.country}</S.Td>

              <S.Td className="right">
                KES{" "}
                {app.unit_price ? Number(app.unit_price).toFixed(2) : "0.00"}
              </S.Td>
            </tr>
          ))}
        </tbody>
      </S.Table>

      {/* TOTAL */}
      <S.TotalRow>
        Total Amount: <strong>KES {totalAmount.toFixed(2)}</strong>
      </S.TotalRow>

      {/* PAYMENT DETAILS */}
      <S.Section>
        <S.Subtitle>Payment Details</S.Subtitle>
        <div>
          MPESA PAYBILL: <strong>123456</strong>
        </div>
        <div>
          Account Number: <strong>{invoice.invoice_number}</strong>
        </div>
      </S.Section>
    </S.Container>
  );
};

export default InvoicePDF;
