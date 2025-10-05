import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
/* Domain types */
export interface Document {
  id: number;
  application_id: number;
  doc_type: "passport" | "invitation_letter";
  file_url: string;
  created_at: string;
}

export interface Application {
  id: number;
  user_id: number;
  athlete_id: number;
  athlete?: {
    first_name: string;
    last_name: string;
    date_of_birth?: string;
    passport_number?: string;
  };
  country: string;
  status: "pending" | "approved" | "rejected" | "invoiced";
  remarks?: string;
  documents: Document[];
  created_at: string;
  updated_at: string;
}

interface ApplicationsState {
  applications: Application[];
  currentApplication: Application | null;
  isLoading: boolean;
  error: string | null;
  uploadProgress: number;
}

const initialState: ApplicationsState = {
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
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
      if (action.payload) state.error = null;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setApplications(state, action: PayloadAction<Application[]>) {
      state.applications = action.payload;
    },
    addApplication(state, action: PayloadAction<Application>) {
      state.applications.push(action.payload);
    },
    updateApplication(state, action: PayloadAction<Application>) {
      const idx = state.applications.findIndex(
        (a) => a.id === action.payload.id
      );
      if (idx !== -1) state.applications[idx] = action.payload;
      if (state.currentApplication?.id === action.payload.id) {
        state.currentApplication = action.payload;
      }
    },
    setCurrentApplication(state, action: PayloadAction<Application | null>) {
      state.currentApplication = action.payload;
    },
    addDocumentToApplication(
      state,
      action: PayloadAction<{ applicationId: number; document: Document }>
    ) {
      const { applicationId, document } = action.payload;
      const app = state.applications.find((a) => a.id === applicationId);
      if (app) app.documents.push(document);
      if (state.currentApplication?.id === applicationId) {
        state.currentApplication.documents.push(document);
      }
    },
    setUploadProgress(state, action: PayloadAction<number>) {
      state.uploadProgress = action.payload;
    },
    clearUploadProgress(state) {
      state.uploadProgress = 0;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setApplications,
  addApplication,
  updateApplication,
  setCurrentApplication,
  addDocumentToApplication,
  setUploadProgress,
  clearUploadProgress,
  clearError,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;
