import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Export interfaces
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
  athlete: {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    passport_number: string;
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
  hasActiveApplication: boolean;
  uploadProgress: number;
}

const initialState: ApplicationsState = {
  applications: [],
  currentApplication: null,
  isLoading: false,
  error: null,
  hasActiveApplication: false,
  uploadProgress: 0,
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    fetchApplicationsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchApplicationsSuccess: (state, action: PayloadAction<Application[]>) => {
      state.isLoading = false;
      state.applications = action.payload;
      state.hasActiveApplication = action.payload.some((app) =>
        ["pending", "approved", "invoiced"].includes(app.status)
      );
    },
    fetchApplicationsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    fetchApplicationStart: (state) => {
      state.isLoading = true;
    },
    fetchApplicationSuccess: (state, action: PayloadAction<Application>) => {
      state.isLoading = false;
      state.currentApplication = action.payload;
    },
    fetchApplicationFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    createApplicationStart: (state) => {
      state.isLoading = true;
    },
    createApplicationSuccess: (state, action: PayloadAction<Application>) => {
      state.isLoading = false;
      state.applications.push(action.payload);
      state.hasActiveApplication = true;
    },
    createApplicationFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    updateApplicationStart: (state) => {
      state.isLoading = true;
    },
    updateApplicationSuccess: (state, action: PayloadAction<Application>) => {
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
    },
    updateApplicationFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    uploadDocumentStart: (state) => {
      state.isLoading = true;
      state.uploadProgress = 0;
    },
    uploadDocumentProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
    uploadDocumentSuccess: (
      state,
      action: PayloadAction<{ applicationId: number; document: Document }>
    ) => {
      state.isLoading = false;
      state.uploadProgress = 100;

      if (state.currentApplication?.id === action.payload.applicationId) {
        state.currentApplication.documents.push(action.payload.document);
      }

      const appIndex = state.applications.findIndex(
        (app) => app.id === action.payload.applicationId
      );
      if (appIndex !== -1) {
        state.applications[appIndex].documents.push(action.payload.document);
      }
    },
    uploadDocumentFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.uploadProgress = 0;
      state.error = action.payload;
    },

    clearCurrentApplication: (state) => {
      state.currentApplication = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearUploadProgress: (state) => {
      state.uploadProgress = 0;
    },
  },
});

export const {
  fetchApplicationsStart,
  fetchApplicationsSuccess,
  fetchApplicationsFailure,
  fetchApplicationStart,
  fetchApplicationSuccess,
  fetchApplicationFailure,
  createApplicationStart,
  createApplicationSuccess,
  createApplicationFailure,
  updateApplicationStart,
  updateApplicationSuccess,
  updateApplicationFailure,
  uploadDocumentStart,
  uploadDocumentProgress,
  uploadDocumentSuccess,
  uploadDocumentFailure,
  clearCurrentApplication,
  clearError,
  clearUploadProgress,
} = applicationsSlice.actions;
export default applicationsSlice.reducer;
