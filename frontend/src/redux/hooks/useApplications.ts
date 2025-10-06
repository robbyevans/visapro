import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApplications,
  fetchApplication,
  createApplication,
  updateApplication,
  uploadDocument,
  clearError,
  clearCurrentApplication,
} from "../slices/applicationsSlice";
import {
  selectApplications,
  selectCurrentApplication,
  selectApplicationsLoading,
  selectApplicationsError,
  selectPendingApplications,
  selectApprovedApplications,
  selectCanCreateApplication,
  selectUploadProgress,
} from "../selectors/applicationSelectors";
import type { AppDispatch } from "../store";
import type {
  ICreateApplicationPayload,
  TUpdateApplicationPayload,
} from "../types";

export const useApplications = () => {
  const dispatch = useDispatch<AppDispatch>();

  const applications = useSelector(selectApplications);
  const currentApplication = useSelector(selectCurrentApplication);
  const isLoading = useSelector(selectApplicationsLoading);
  const error = useSelector(selectApplicationsError);
  const pendingApplications = useSelector(selectPendingApplications);
  const approvedApplications = useSelector(selectApprovedApplications);
  const canCreateApplication = useSelector(selectCanCreateApplication);
  const uploadProgress = useSelector(selectUploadProgress);

  const handleFetchApplications = useCallback(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  const handleFetchApplication = useCallback(
    (id: number) => {
      dispatch(fetchApplication(id));
    },
    [dispatch]
  );

  const handleCreateApplication = useCallback(
    (payload: ICreateApplicationPayload) => {
      return dispatch(createApplication(payload)).unwrap();
    },
    [dispatch]
  );

  const handleUpdateApplication = useCallback(
    (id: number, updates: TUpdateApplicationPayload) => {
      return dispatch(updateApplication({ id, updates }));
    },
    [dispatch]
  );

  const handleUploadDocument = useCallback(
    (
      applicationId: number,
      formData: FormData,
      onUploadProgress?: (p: number) => void
    ) => {
      return dispatch(
        uploadDocument({ applicationId, formData, onUploadProgress })
      ).unwrap();
    },
    [dispatch]
  );

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleClearCurrent = useCallback(() => {
    dispatch(clearCurrentApplication());
  }, [dispatch]);

  return {
    applications,
    currentApplication,
    isLoading,
    error,
    pendingApplications,
    approvedApplications,
    canCreateApplication,
    uploadProgress,

    fetchApplications: handleFetchApplications,
    fetchApplication: handleFetchApplication,
    createApplication: handleCreateApplication,
    updateApplication: handleUpdateApplication,
    uploadDocument: handleUploadDocument,
    clearApplicationError: handleClearError,
    clearCurrent: handleClearCurrent,
  };
};
