// frontend/src/redux/hooks/useInvoice.ts
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInvoices,
  fetchInvoice,
  createInvoice,
  updateInvoiceStatus,
  clearCurrentInvoice,
} from "../slices/invoiceSlice";
import {
  selectInvoices,
  selectInvoice,
  selectInvoiceError,
  selectInvoiceLoading,
} from "../selectors/invoiceSelector";
import type { AppDispatch } from "../store";

export const useInvoice = () => {
  const dispatch = useDispatch<AppDispatch>();

  return {
    invoices: useSelector(selectInvoices),
    currentInvoice: useSelector(selectInvoice),
    isLoading: useSelector(selectInvoiceLoading),
    error: useSelector(selectInvoiceError),

    listInvoices: () => dispatch(fetchInvoices()),
    getInvoice: (id: number) => dispatch(fetchInvoice(id)),
    createInvoice: (data: {
      applications: { id: number; unit_price: string }[];
      notes?: string;
    }) => dispatch(createInvoice(data)),
    updateInvoiceStatus: (id: number, status: string) =>
      dispatch(updateInvoiceStatus({ id, status })),
    clearCurrentInvoice: () => dispatch(clearCurrentInvoice()),
  };
};
