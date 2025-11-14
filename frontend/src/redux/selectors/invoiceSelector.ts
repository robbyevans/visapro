import type { RootState } from "../store";

export const selectInvoices = (state: RootState) => state.invoices.invoices;
export const selectInvoice = (state: RootState) =>
  state.invoices.currentInvoice;
export const selectInvoiceLoading = (state: RootState) =>
  state.invoices.isLoading;
export const selectInvoiceError = (state: RootState) => state.invoices.error;
