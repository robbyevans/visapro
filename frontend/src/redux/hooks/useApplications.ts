import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  fetchApplicationsStart,
  fetchApplicationsFailure,
  fetchApplicationStart,
  fetchApplicationFailure,
  createApplicationStart,
  createApplicationFailure,
  updateApplicationStart,
  updateApplicationFailure,
  uploadDocumentStart,
  uploadDocumentFailure,
  clearCurrentApplication,
  clearError,
} from "../slices/applicationsSlice";
import {
  selectApplications,
  selectCurrentApplication,
  selectApplicationsLoading,
  selectApplicationsError,
  selectHasActiveApplication,
  selectPendingApplications,
  selectApprovedApplications,
  selectApplicationById,
  selectCanCreateApplication,
  selectUploadProgress,
} from "../selectors/applicationSelectors";
import type { RootState } from "../store";
import type { Application } from "../slices/applicationsSlice";
import type { Athlete } from "../slices/userSlice";

export const useApplications = () => {
  const dispatch = useDispatch();

  const applications = useSelector(selectApplications);
  const currentApplication = useSelector(selectCurrentApplication);
  const isLoading = useSelector(selectApplicationsLoading);
  const error = useSelector(selectApplicationsError);
  const hasActiveApplication = useSelector(selectHasActiveApplication);
  const pendingApplications = useSelector(selectPendingApplications);
  const approvedApplications = useSelector(selectApprovedApplications);
  const canCreateApplication = useSelector(selectCanCreateApplication);
  const uploadProgress = useSelector(selectUploadProgress);

  // Fixed: Remove useSelector from callback
  const getApplicationById = useCallback(
    (id: number) => {
      return applications.find((app) => app.id === id);
    },
    [applications]
  );

  const fetchApplications = useCallback(async () => {
    dispatch(fetchApplicationsStart());
    try {
      // API call would go here
    } catch (err) {
      dispatch(
        fetchApplicationsFailure(
          err instanceof Error ? err.message : "Failed to fetch applications"
        )
      );
    }
  }, [dispatch]);

  const fetchApplication = useCallback(async () => {
    dispatch(fetchApplicationStart());
    try {
      // API call would go here
    } catch (err) {
      dispatch(
        fetchApplicationFailure(
          err instanceof Error ? err.message : "Failed to fetch application"
        )
      );
    }
  }, [dispatch]);

  const createApplication = useCallback(async () => {
    dispatch(createApplicationStart());
    try {
      // API call would go here
    } catch (err) {
      dispatch(
        createApplicationFailure(
          err instanceof Error ? err.message : "Failed to create application"
        )
      );
    }
  }, [dispatch]);

  const updateApplication = useCallback(async () => {
    dispatch(updateApplicationStart());
    try {
      // API call would go here
    } catch (err) {
      dispatch(
        updateApplicationFailure(
          err instanceof Error ? err.message : "Failed to update application"
        )
      );
    }
  }, [dispatch]);

  const uploadDocument = useCallback(async () => {
    dispatch(uploadDocumentStart());
    try {
      // API call would go here
    } catch (err) {
      dispatch(
        uploadDocumentFailure(
          err instanceof Error ? err.message : "Failed to upload document"
        )
      );
    }
  }, [dispatch]);

  const clearApplicationError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const clearCurrent = useCallback(() => {
    dispatch(clearCurrentApplication());
  }, [dispatch]);

  return {
    // State
    applications,
    currentApplication,
    isLoading,
    error,
    hasActiveApplication,
    pendingApplications,
    approvedApplications,
    canCreateApplication,
    uploadProgress,

    // Helper functions
    getApplicationById,

    // Actions
    fetchApplications,
    fetchApplication,
    createApplication,
    updateApplication,
    uploadDocument,
    clearApplicationError,
    clearCurrent,
  };
};
