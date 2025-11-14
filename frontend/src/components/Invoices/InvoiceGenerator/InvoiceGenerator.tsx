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

/** helper to read query */
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

/**
 * 3-step wizard
 * Step 1: Select applications
 * Step 2: Set prices (bulk / per-app) and generate invoice
 * Step 3: Preview (InvoicePDF) + Send / Print
 */
const InvoiceGenerator: React.FC = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const userId = Number(query.get("user_id"));

  const {
    groupedApplications,
    fetchGroupedApplications,
    isLoading: appsLoading,
  } = useApplications();
  const { createInvoice } = useInvoice();

  // wizard step state: 1,2,3
  const [step, setStep] = useState<number>(1);

  // selection + prices
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [perAppPrice, setPerAppPrice] = useState("0.00");
  const [localPrices, setLocalPrices] = useState<Record<number, string>>({});

  // created invoice
  const [createdInvoice, setCreatedInvoice] = useState<IInvoice | null>(null);
  const [generating, setGenerating] = useState(false);

  // send modal
  const [showSendModal, setShowSendModal] = useState(false);

  useEffect(() => {
    fetchGroupedApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userGroup: IUserWithApplications | undefined = useMemo(() => {
    return groupedApplications.find((u) => u.id === userId);
  }, [groupedApplications, userId]);

  const uninvoicedApps: IApplication[] = useMemo(() => {
    return userGroup?.applications.filter((a) => !a.invoice_id) ?? [];
  }, [userGroup]);

  const selectedApps = useMemo(
    () => uninvoicedApps.filter((a) => selectedIds.includes(a.id)),
    [uninvoicedApps, selectedIds]
  );

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const applyBulkPrice = () => {
    setLocalPrices((prev) => {
      const updated = { ...prev };
      selectedIds.forEach((id) => (updated[id] = perAppPrice));
      return updated;
    });
  };

  const setPriceForApp = (id: number, price: string) => {
    setLocalPrices((prev) => ({
      ...prev,
      [id]: price,
    }));
  };

  const validateStep1 = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one application to invoice.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    // ensure each selected app has a price (either localPrices or perAppPrice)
    for (const id of selectedIds) {
      const price = localPrices[id] ?? perAppPrice;
      if (!price || isNaN(Number(price))) {
        alert("Please provide valid prices for all selected applications.");
        return false;
      }
      if (Number(price) < 0) {
        alert("Prices must be >= 0");
        return false;
      }
    }
    return true;
  };

  const handleGenerate = async () => {
    if (!validateStep2()) return;

    const payloadApps = selectedApps.map((app) => ({
      id: app.id,
      unit_price: localPrices[app.id] ?? perAppPrice,
    }));

    setGenerating(true);
    try {
      const action: any = await createInvoice({ applications: payloadApps });
      if (action?.payload) {
        const invoice = action.payload as IInvoice;
        setCreatedInvoice(invoice);
        setStep(3); // go to preview step
      }
    } finally {
      setGenerating(false);
    }
  };

  /**
   * Build a simple printable HTML (inline styles) so the new window has content & styling.
   * Avoid relying on styled-components classes which don't exist in the new window.
   */
  const openInvoicePrintWindow = (
    invoice: IInvoice,
    user: IUserWithApplications
  ) => {
    const totalAmount = Number(invoice.total_amount ?? 0).toFixed(2);
    const rowsHtml = invoice.applications
      .map((app) => {
        const name = `${app.athlete?.first_name ?? ""} ${
          app.athlete?.last_name ?? ""
        }`;
        const unit = Number(app.unit_price ?? 0).toFixed(2);
        return `<tr>
          <td style="padding:8px;border:1px solid #ddd">#${app.id}</td>
          <td style="padding:8px;border:1px solid #ddd">${name}</td>
          <td style="padding:8px;border:1px solid #ddd">${app.country}</td>
          <td style="padding:8px;border:1px solid #ddd;text-align:right">KES ${unit}</td>
        </tr>`;
      })
      .join("");

    const html = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>Invoice ${invoice.invoice_number}</title>
          <style>
            body { font-family: Arial, Helvetica, sans-serif; padding: 24px; color: #111; }
            .header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px; }
            h1 { margin:0; font-size:28px; }
            .meta { text-align:right; font-size:14px; color:#333; }
            table { width:100%; border-collapse:collapse; margin-top: 12px; }
            th { padding:8px; border:1px solid #ddd; background:#f7f7f7; text-align:left; }
            td { padding:8px; border:1px solid #ddd; vertical-align:top; }
            .total { text-align:right; margin-top:12px; font-weight:700; font-size:16px; }
            .footer { margin-top:28px; font-size:13px; color:#444; }
            .btn { display:inline-block; margin-top:16px; padding:10px 14px; background:#0b74de; color:#fff; text-decoration:none; border-radius:6px; }
            @media print { .btn { display:none; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>INVOICE</h1>
              <div>Billed To: <strong>${user.name}</strong></div>
              <div>${user.email ?? ""}</div>
            </div>
            <div class="meta">
              <div>Invoice #: <strong>${invoice.invoice_number}</strong></div>
              <div>Issue Date: ${invoice.issue_date}</div>
              <div>Due Date: ${invoice.due_date ?? "N/A"}</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Athlete</th>
                <th>Country</th>
                <th style="text-align:right">Unit Price</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <div class="total">Total: KES ${totalAmount}</div>

          <div class="footer">
            <div>Payment Details: MPESA PAYBILL <strong>123456</strong></div>
            <div>Account / Reference: <strong>${
              invoice.invoice_number
            }</strong></div>
          </div>

          <a href="#" class="btn" onclick="window.print();return false;">Print / Save PDF</a>
        </body>
      </html>
    `;

    const w = window.open("", "_blank");
    if (w) {
      w.document.open();
      w.document.write(html);
      w.document.close();
      // let the window fully render then call print if the user wants — we won't auto-print
    } else {
      alert("Unable to open print window (popup blocked?)");
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

        <div style={{ display: "flex", gap: 8 }}>
          <S.SecondaryButton onClick={() => navigate(-1)}>
            Back
          </S.SecondaryButton>
          {/* progress indicator */}
          <S.StepPill>Step {step} of 3</S.StepPill>
        </div>
      </S.Header>

      {/* === STEP 1: Select Applications === */}
      {step === 1 && (
        <>
          <S.Section>
            <S.SectionTitle>Select Applications</S.SectionTitle>
            <S.HelpText>
              Choose which applications to include on this invoice.
            </S.HelpText>

            <S.Table>
              <thead>
                <tr>
                  <S.Th />
                  <S.Th>ID</S.Th>
                  <S.Th>Athlete</S.Th>
                  <S.Th>Country</S.Th>
                  <S.Th>Created</S.Th>
                </tr>
              </thead>
              <tbody>
                {appsLoading && (
                  <tr>
                    <S.Td colSpan={5}>Loading...</S.Td>
                  </tr>
                )}
                {!appsLoading && uninvoicedApps.length === 0 && (
                  <tr>
                    <S.Td colSpan={5}>No uninvoiced applications.</S.Td>
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
                    <S.Td>{new Date(app.created_at).toLocaleDateString()}</S.Td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </S.Section>

          <S.Actions style={{ marginTop: 16 }}>
            <S.SecondaryButton onClick={() => navigate(-1)}>
              Cancel
            </S.SecondaryButton>
            <S.PrimaryButton
              onClick={() => {
                if (!validateStep1()) return;
                setStep(2);
              }}
              disabled={selectedIds.length === 0}
            >
              Next: Pricing
            </S.PrimaryButton>
          </S.Actions>
        </>
      )}

      {/* === STEP 2: Pricing === */}
      {step === 2 && (
        <>
          <S.Section>
            <S.SectionTitle>Set Prices</S.SectionTitle>
            <S.HelpText>
              Set a bulk price for all selected apps or set per-application
              prices.
            </S.HelpText>

            <S.Row>
              <S.BulkPriceWrapper style={{ flex: 1 }}>
                <label>Bulk Price (applied to selected)</label>
                <S.Input
                  value={perAppPrice}
                  onChange={(e) => setPerAppPrice(e.target.value)}
                />
              </S.BulkPriceWrapper>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                <S.SecondaryButton onClick={applyBulkPrice}>
                  Apply
                </S.SecondaryButton>
              </div>
            </S.Row>

            <S.Table style={{ marginTop: 12 }}>
              <thead>
                <tr>
                  <S.Th>ID</S.Th>
                  <S.Th>Athlete</S.Th>
                  <S.Th>Country</S.Th>
                  <S.Th>Unit Price</S.Th>
                </tr>
              </thead>
              <tbody>
                {selectedApps.map((app) => (
                  <tr key={app.id}>
                    <S.Td>#{app.id}</S.Td>
                    <S.Td>
                      {app.athlete?.first_name} {app.athlete?.last_name}
                    </S.Td>
                    <S.Td>{app.country}</S.Td>
                    <S.Td>
                      <S.Input
                        value={localPrices[app.id] ?? ""}
                        onChange={(e) => setPriceForApp(app.id, e.target.value)}
                        placeholder={
                          perAppPrice ? `fallback ${perAppPrice}` : ""
                        }
                      />
                    </S.Td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </S.Section>

          <S.Actions style={{ marginTop: 16 }}>
            <S.SecondaryButton
              onClick={() => {
                setStep(1);
              }}
            >
              Back
            </S.SecondaryButton>

            <S.PrimaryButton onClick={handleGenerate} disabled={generating}>
              {generating ? "Generating..." : "Generate Invoice"}
            </S.PrimaryButton>
          </S.Actions>
        </>
      )}

      {/* === STEP 3: Preview + Send / Print === */}
      {step === 3 && createdInvoice && userGroup && (
        <>
          <S.Section>
            <S.SectionTitle>Invoice Preview</S.SectionTitle>
            <S.PreviewBox>
              <InvoicePDF invoice={createdInvoice} user={userGroup} />
            </S.PreviewBox>
          </S.Section>

          <S.Actions style={{ marginTop: 16 }}>
            <S.SecondaryButton onClick={() => setStep(2)}>
              Edit Prices
            </S.SecondaryButton>

            <S.PrimaryButton onClick={() => setShowSendModal(true)}>
              Send Invoice
            </S.PrimaryButton>

            <S.SecondaryButton
              onClick={() => openInvoicePrintWindow(createdInvoice, userGroup)}
            >
              Print / Download PDF
            </S.SecondaryButton>
          </S.Actions>
        </>
      )}

      {/* Send modal */}
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
