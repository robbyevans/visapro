import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IDocument, IApplication, IApplicationsState } from "../types";

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
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
      if (action.payload) state.error = null;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setApplications(state, action: PayloadAction<IApplication[]>) {
      state.applications = action.payload;
    },
    addApplication(state, action: PayloadAction<IApplication>) {
      state.applications.push(action.payload);
    },
    updateApplication(state, action: PayloadAction<IApplication>) {
      const idx = state.applications.findIndex(
        (a) => a.id === action.payload.id
      );
      if (idx !== -1) state.applications[idx] = action.payload;
      if (state.currentApplication?.id === action.payload.id) {
        state.currentApplication = action.payload;
      }
    },
    setCurrentApplication(state, action: PayloadAction<IApplication | null>) {
      state.currentApplication = action.payload;
    },
    addDocumentToApplication(
      state,
      action: PayloadAction<{ applicationId: number; document: IDocument }>
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
