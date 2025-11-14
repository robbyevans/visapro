import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../api";
import type { IInvoice } from "../types";

export interface IInvoiceState {
  invoices: IInvoice[];
  currentInvoice: IInvoice | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IInvoiceState = {
  invoices: [],
  currentInvoice: null,
  isLoading: false,
  error: null,
};

const api = (token?: string | null) => axiosInstance(token);

/* -------------------------
   Thunks
------------------------- */

// GET /invoices
export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async (_, thunkAPI) => {
    try {
      const res = await api().get("/invoices");
      return res.data as IInvoice[];
    } catch (err: any) {
      const message =
        err.response?.data?.error ??
        err.response?.data?.message ??
        "Failed to fetch invoices";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// GET /invoices/:id
export const fetchInvoice = createAsyncThunk(
  "invoices/fetchInvoice",
  async (id: number, thunkAPI) => {
    try {
      const res = await api().get(`/invoices/${id}`);
      return res.data as IInvoice;
    } catch (err: any) {
      const message =
        err.response?.data?.error ??
        err.response?.data?.message ??
        "Failed to fetch invoice";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// POST /invoices
// payload: { applications: [{ id, unit_price }], notes?: string }
export const createInvoice = createAsyncThunk(
  "invoices/createInvoice",
  async (
    payload: {
      applications: { id: number; unit_price: string }[];
      notes?: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await api().post("/invoices", { invoice: payload });
      return res.data as IInvoice;
    } catch (err: any) {
      const message =
        err.response?.data?.error ??
        err.response?.data?.message ??
        "Failed to create invoice";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// PATCH /invoices/:id/update_status
export const updateInvoiceStatus = createAsyncThunk(
  "invoices/updateInvoiceStatus",
  async ({ id, status }: { id: number; status: string }, thunkAPI) => {
    try {
      const res = await api().patch(`/invoices/${id}/update_status`, {
        status,
      });
      return res.data as IInvoice;
    } catch (err: any) {
      const message =
        err.response?.data?.error ??
        err.response?.data?.message ??
        "Failed to update invoice status";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    clearCurrentInvoice(state) {
      state.currentInvoice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* Fetch many */
      .addCase(fetchInvoices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchInvoices.fulfilled,
        (state, action: PayloadAction<IInvoice[]>) => {
          state.isLoading = false;
          state.invoices = action.payload;
        }
      )
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      /* Fetch one */
      .addCase(fetchInvoice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchInvoice.fulfilled,
        (state, action: PayloadAction<IInvoice>) => {
          state.isLoading = false;
          state.currentInvoice = action.payload;
        }
      )
      .addCase(fetchInvoice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      /* Create invoice */
      .addCase(
        createInvoice.fulfilled,
        (state, action: PayloadAction<IInvoice>) => {
          // Prepend new invoice
          state.invoices.unshift(action.payload);
          state.currentInvoice = action.payload;
        }
      )
      .addCase(createInvoice.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      /* Update status */
      .addCase(
        updateInvoiceStatus.fulfilled,
        (state, action: PayloadAction<IInvoice>) => {
          const index = state.invoices.findIndex(
            (i) => i.id === action.payload.id
          );

          if (index !== -1) state.invoices[index] = action.payload;
          if (state.currentInvoice?.id === action.payload.id) {
            state.currentInvoice = action.payload;
          }
        }
      );
  },
});

export const { clearCurrentInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
