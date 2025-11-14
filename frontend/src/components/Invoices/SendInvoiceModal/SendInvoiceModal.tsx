// /frontend/src/components/Invoices/SendInvoiceModal/SendInvoiceModal.tsx
import React, { useMemo, useState } from "react";
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
  const [phone, setPhone] = useState(user.application_count ? "" : "");
  const [sending, setSending] = useState(false);

  const isEmailValid = useMemo(() => {
    return !!email && /\S+@\S+\.\S+/.test(email);
  }, [email]);

  const isPhoneValid = useMemo(() => {
    if (!sendWhatsapp) return true;
    return !!phone && /^[0-9+ ]{6,20}$/.test(phone);
  }, [phone, sendWhatsapp]);

  const handleSend = async () => {
    if (!isEmailValid) {
      alert("Please provide a valid email address.");
      return;
    }
    if (!isPhoneValid) {
      alert("Please provide a valid phone number for WhatsApp.");
      return;
    }

    setSending(true);
    try {
      // TODO: wire up to backend endpoint that sends invoice (email/whatsapp)
      // For now, simulate:
      await new Promise((r) => setTimeout(r, 700));
      alert("Invoice sent successfully!");
      onClose();
    } catch (e) {
      console.error(e);
      alert("Failed to send invoice.");
    } finally {
      setSending(false);
    }
  };

  return (
    <S.Overlay onMouseDown={onClose}>
      <S.Modal onMouseDown={(e) => e.stopPropagation()}>
        <S.Header>
          <h3>Send Invoice</h3>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.Header>

        <S.Body>
          <S.LeftPanel>
            <S.Label>Send to Email</S.Label>
            <S.Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="recipient@email.com"
            />
            <S.HelpText small>
              Recipient email. By default we use the client's email.
            </S.HelpText>

            <S.CheckRow>
              <input
                type="checkbox"
                checked={sendWhatsapp}
                onChange={() => setSendWhatsapp((s) => !s)}
              />
              <span>Also send via WhatsApp</span>
            </S.CheckRow>

            {sendWhatsapp && (
              <>
                <S.Label>Phone Number</S.Label>
                <S.Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+2547..."
                />
              </>
            )}

            <S.ButtonRow>
              <S.SecondaryButton onClick={onClose} disabled={sending}>
                Cancel
              </S.SecondaryButton>
              <S.PrimaryButton
                onClick={handleSend}
                disabled={!isEmailValid || !isPhoneValid || sending}
              >
                {sending ? "Sending..." : "Send Invoice"}
              </S.PrimaryButton>
            </S.ButtonRow>
          </S.LeftPanel>

          <S.RightPanel>
            <S.PreviewTitle>Invoice Preview</S.PreviewTitle>
            <S.PreviewBox>
              <InvoicePDF invoice={invoice} user={user} />
            </S.PreviewBox>
          </S.RightPanel>
        </S.Body>
      </S.Modal>
    </S.Overlay>
  );
};

export default SendInvoiceModal;
