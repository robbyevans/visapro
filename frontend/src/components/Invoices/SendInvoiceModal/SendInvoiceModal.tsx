import React, { useState } from "react";
import type { IInvoice, IUserWithApplications } from "../../../redux/types";
import InvoicePDF from "../InvoicePDF/InvoicePDF";
import * as S from "./styles";

interface Props {
  invoice: IInvoice;
  user: IUserWithApplications;
  onClose: () => void;
}

const SendInvoiceModal: React.FC<Props> = ({ invoice, user, onClose }) => {
  const [email, setEmail] = useState(user.email || "");
  const [sendWhatsapp, setSendWhatsapp] = useState(false);
  const [phone, setPhone] = useState("");

  const handleSend = () => {
    // TODO: backend integration for email + WhatsApp
    alert("Invoice sent successfully!");
    onClose();
  };

  return (
    <S.Overlay>
      <S.Modal>
        <S.Header>
          <h2>Send Invoice</h2>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.Header>

        <S.Body>
          {/* LEFT SIDE: Email / WhatsApp inputs */}
          <S.LeftPanel>
            <S.Label>Email</S.Label>
            <S.Input value={email} onChange={(e) => setEmail(e.target.value)} />

            <S.CheckRow>
              <input
                type="checkbox"
                checked={sendWhatsapp}
                onChange={() => setSendWhatsapp(!sendWhatsapp)}
              />
              <span>Send via WhatsApp</span>
            </S.CheckRow>

            {sendWhatsapp && (
              <>
                <S.Label>Phone Number</S.Label>
                <S.Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </>
            )}

            <S.PrimaryButton onClick={handleSend}>Send Invoice</S.PrimaryButton>
          </S.LeftPanel>

          {/* RIGHT SIDE: Invoice PDF Preview */}
          <S.RightPanel>
            <S.PreviewTitle>Invoice Preview</S.PreviewTitle>

            <S.PreviewBox>
              <InvoicePDF invoice={invoice} user={user} /> {/* <-- FIXED */}
            </S.PreviewBox>
          </S.RightPanel>
        </S.Body>
      </S.Modal>
    </S.Overlay>
  );
};

export default SendInvoiceModal;
