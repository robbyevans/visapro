import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useApplications } from "../../../redux/hooks/useApplications";
import { useInvoice } from "../../../redux/hooks/useInvoice";

import InvoicePDF from "../InvoicePDF/InvoicePDF";
import SendInvoiceModal from "../SendInvoiceModal/SendInvoiceModal";

import type {
  IApplication,
  IInvoice,
  IUserWithApplications,
} from "../../../redux/types";
import * as S from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const InvoiceGenerator: React.FC = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const userId = Number(query.get("user_id"));

  /** -------------------------------------
   * Redux
   ------------------------------------- */
  const {
    groupedApplications,
    fetchGroupedApplications,
    isLoading: appsLoading,
  } = useApplications();

  const { createInvoice } = useInvoice();

  /** -------------------------------------
   * Local UI State
   ------------------------------------- */
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [perAppPrice, setPerAppPrice] = useState("0.00");
  const [notes, setNotes] = useState("");
  const [showSendModal, setShowSendModal] = useState(false);
  const [createdInvoice, setCreatedInvoice] = useState<IInvoice | null>(null);
  const [generating, setGenerating] = useState(false);

  const [localPrices, setLocalPrices] = useState<Record<number, string>>({});

  /** -------------------------------------
   * Fetch user + grouped apps
   ------------------------------------- */
  useEffect(() => {
    fetchGroupedApplications();
  }, []);

  /** -------------------------------------
   * Find the user
   ------------------------------------- */
  const userGroup: IUserWithApplications | undefined = useMemo(() => {
    return groupedApplications.find((u) => u.id === userId);
  }, [groupedApplications, userId]);

  /** -------------------------------------
   * Uninvoiced applications
   ------------------------------------- */
  const uninvoicedApps: IApplication[] = useMemo(() => {
    return userGroup?.applications.filter((a) => !a.invoice_id) ?? [];
  }, [userGroup]);

  /** -------------------------------------
   * Selected apps
   ------------------------------------- */
  const selectedApps = useMemo(
    () => uninvoicedApps.filter((a) => selectedIds.includes(a.id)),
    [uninvoicedApps, selectedIds]
  );

  /** -------------------------------------
   * Selection toggle
   ------------------------------------- */
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  /** -------------------------------------
   * Bulk price
   ------------------------------------- */
  const applyBulkPrice = () => {
    setLocalPrices((prev) => {
      const updated = { ...prev };
      selectedIds.forEach((id) => (updated[id] = perAppPrice));
      return updated;
    });
  };

  /** -------------------------------------
   * Per-app price
   ------------------------------------- */
  const setPriceForApp = (id: number, price: string) => {
    setLocalPrices((prev) => ({
      ...prev,
      [id]: price,
    }));
  };

  /** -------------------------------------
   * Generate invoice
   ------------------------------------- */
  const handleGenerate = async () => {
    if (selectedApps.length === 0) {
      alert("Please select at least one application.");
      return;
    }

    const payloadApps = selectedApps.map((app) => ({
      id: app.id,
      unit_price: localPrices[app.id] ?? perAppPrice,
    }));

    setGenerating(true);

    try {
      const action: any = await createInvoice({
        applications: payloadApps,
        notes,
      });

      if (action?.payload) {
        const invoice = action.payload as IInvoice;
        setCreatedInvoice(invoice);
        openInvoicePrintWindow(invoice, userGroup!);
      }
    } finally {
      setGenerating(false);
    }
  };

  /** -------------------------------------
   * Print window
   ------------------------------------- */
  const openInvoicePrintWindow = (
    invoice: IInvoice,
    user: IUserWithApplications
  ) => {
    const html = `
    <html>
      <head><title>Invoice ${invoice.invoice_number}</title></head>
      <body>
        ${document.getElementById("invoice-print-area")?.innerHTML || ""}
        <button onclick="window.print()">Print / Save PDF</button>
      </body>
    </html>
  `;
    const w = window.open("", "_blank");
    if (w) {
      w.document.write(html);
      w.document.close();
    }
  };

  if (!userGroup && !appsLoading) {
    return (
      <S.Container>
        <S.Title>User not found</S.Title>
        <S.SecondaryButton onClick={() => navigate(-1)}>Back</S.SecondaryButton>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <div>
          <S.Title>
            Generate Invoice for {userGroup?.name} (#{userId})
          </S.Title>
          <S.Subtitle>Email: {userGroup?.email}</S.Subtitle>
        </div>

        <S.Actions>
          <S.SecondaryButton onClick={() => navigate(-1)}>
            Back
          </S.SecondaryButton>

          <S.PrimaryButton disabled={generating} onClick={handleGenerate}>
            {generating ? "Generating..." : "Generate Invoice"}
          </S.PrimaryButton>
        </S.Actions>
      </S.Header>

      {/* Bulk price */}
      <S.Section>
        <label>Bulk Price</label>
        <S.Input
          value={perAppPrice}
          onChange={(e) => setPerAppPrice(e.target.value)}
        />
        <S.SecondaryButton onClick={applyBulkPrice}>Apply</S.SecondaryButton>
      </S.Section>

      {/* Notes */}
      <S.Section>
        <label>Notes</label>
        <S.TextArea value={notes} onChange={(e) => setNotes(e.target.value)} />
      </S.Section>

      {/* Table */}
      <S.Table>
        <thead>
          <tr>
            <S.Th />
            <S.Th>ID</S.Th>
            <S.Th>Athlete</S.Th>
            <S.Th>Country</S.Th>
            <S.Th>Unit Price</S.Th>
            <S.Th>Created</S.Th>
          </tr>
        </thead>

        <tbody>
          {appsLoading && (
            <tr>
              <S.Td colSpan={6}>Loading...</S.Td>
            </tr>
          )}

          {!appsLoading && uninvoicedApps.length === 0 && (
            <tr>
              <S.Td colSpan={6}>No uninvoiced applications.</S.Td>
            </tr>
          )}

          {uninvoicedApps.map((app) => (
            <tr key={app.id}>
              <S.Td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(app.id)}
                  onChange={() => toggleSelect(app.id)}
                />
              </S.Td>

              <S.Td>#{app.id}</S.Td>
              <S.Td>
                {app.athlete?.first_name} {app.athlete?.last_name}
              </S.Td>
              <S.Td>{app.country}</S.Td>

              <S.Td>
                <S.Input
                  value={localPrices[app.id] ?? ""}
                  onChange={(e) => setPriceForApp(app.id, e.target.value)}
                />
              </S.Td>

              <S.Td>{new Date(app.created_at).toLocaleDateString()}</S.Td>
            </tr>
          ))}
        </tbody>
      </S.Table>

      {/* Hidden preview */}
      <div id="invoice-print-area" style={{ display: "none" }}>
        {createdInvoice && userGroup ? (
          <InvoicePDF invoice={createdInvoice} user={userGroup} />
        ) : null}
      </div>

      {/* Buttons */}
      <S.Actions style={{ marginTop: 16 }}>
        <S.PrimaryButton
          disabled={!createdInvoice}
          onClick={() => setShowSendModal(true)}
        >
          Send Invoice
        </S.PrimaryButton>

        <S.SecondaryButton
          onClick={() =>
            createdInvoice && userGroup
              ? openInvoicePrintWindow(createdInvoice, userGroup)
              : alert("Generate invoice first")
          }
        >
          Download / Print PDF
        </S.SecondaryButton>
      </S.Actions>

      {/* Modal */}
      {showSendModal && createdInvoice && userGroup && (
        <SendInvoiceModal
          invoice={createdInvoice}
          user={userGroup}
          onClose={() => setShowSendModal(false)}
        />
      )}
    </S.Container>
  );
};

export default InvoiceGenerator;
