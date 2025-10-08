import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  IDocument,
  IApplication,
  IApplicationsState,
  ICreateApplicationPayload,
  TUpdateApplicationPayload,
} from "../types";
import { axiosInstance } from "../api";
import { getErrorMessage } from "../../utils/error";

// Async thunks
const fetchApplications = createAsyncThunk(
  "applications/fetchAll",
  async (_, { rejectWithValue, getState }) => {
    // Remove filters parameter
    try {
      const state = getState() as any;
      const token = state.auth.token;
      if (!token) throw new Error("Not authenticated");

      const api = axiosInstance(token);

      // Remove all filter parameter building - just fetch all applications
      const res = await api.get<IApplication[]>("/applications");
      return { applications: res.data }; // Return as object to match expected structure
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const fetchApplication = createAsyncThunk(
  "applications/fetchOne",
  async (id: number, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      if (!token) throw new Error("Not authenticated");

      const api = axiosInstance(token);
      const res = await api.get<IApplication>(`/applications/${id}`);
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const createApplication = createAsyncThunk(
  "applications/create",
  async (payload: ICreateApplicationPayload, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      if (!token) throw new Error("Not authenticated");

      const api = axiosInstance(token);
      const res = await api.post<IApplication>("/applications", payload);
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const updateApplication = createAsyncThunk(
  "applications/update",
  async (
    { id, updates }: { id: number; updates: TUpdateApplicationPayload },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      if (!token) throw new Error("Not authenticated");

      const api = axiosInstance(token);
      const res = await api.patch<IApplication>(`/applications/${id}`, updates);
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const uploadDocument = createAsyncThunk(
  "applications/uploadDocument",
  async (
    {
      applicationId,
      formData,
      onUploadProgress,
    }: {
      applicationId: number;
      formData: FormData;
      onUploadProgress?: (p: number) => void;
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      if (!token) throw new Error("Not authenticated");

      const api = axiosInstance(token);
      const res = await api.post<IDocument>("/documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const loaded = progressEvent?.loaded ?? 0;
          const total = progressEvent?.total ?? 0;
          if (total > 0 && onUploadProgress) {
            const percent = Math.round((loaded * 100) / total);
            onUploadProgress(percent);
          }
        },
      });
      return { applicationId, document: res.data };
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const initialState: IApplicationsState = {
  applications: [],
  currentApplication: null,
  isLoading: false,
  error: null,
  uploadProgress: 0,
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    setUploadProgress(state, action: PayloadAction<number>) {
      state.uploadProgress = action.payload;
    },
    clearUploadProgress(state) {
      state.uploadProgress = 0;
    },
    clearError(state) {
      state.error = null;
    },
    clearCurrentApplication(state) {
      state.currentApplication = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Applications
      .addCase(fetchApplications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        // Handle both array and object responses
        const applicationsArray = Array.isArray(action.payload)
          ? action.payload
          : action.payload.applications;

        state.applications = applicationsArray.map((app) => ({
          ...app,
          documents: app.documents || [],
        }));
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Single Application
      .addCase(fetchApplication.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentApplication = {
          ...action.payload,
          documents: action.payload.documents || [],
        };
      })
      .addCase(fetchApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Application
      .addCase(createApplication.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        const applicationWithDocs = {
          ...action.payload,
          documents: action.payload.documents || [],
        };
        state.applications.push(applicationWithDocs);
        state.currentApplication = applicationWithDocs;
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Application
      .addCase(updateApplication.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.applications.findIndex(
          (app) => app.id === action.payload.id
        );
        if (index !== -1) {
          state.applications[index] = action.payload;
        }
        if (state.currentApplication?.id === action.payload.id) {
          state.currentApplication = action.payload;
        }
      })
      .addCase(updateApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Upload Document
      .addCase(uploadDocument.pending, (state) => {
        state.uploadProgress = 0;
        state.error = null;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        const { applicationId, document } = action.payload;
        const app = state.applications.find((a) => a.id === applicationId);
        if (app) {
          app.documents.push(document);
        }
        if (state.currentApplication?.id === applicationId) {
          state.currentApplication.documents.push(document);
        }
        state.uploadProgress = 100;
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.error = action.payload as string;
        state.uploadProgress = 0;
      });
  },
});

export {
  fetchApplications,
  fetchApplication,
  createApplication,
  updateApplication,
  uploadDocument,
};

export const {
  setUploadProgress,
  clearUploadProgress,
  clearError,
  clearCurrentApplication,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;
