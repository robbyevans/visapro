import axios from "axios";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setLoading,
  setError,
  setApplications,
  addApplication,
  updateApplication as updateAppAction,
  setCurrentApplication,
  addDocumentToApplication,
  setUploadProgress,
  clearUploadProgress,
  clearError,
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

import { selectToken } from "../selectors/authSelectors";

import type { AppDispatch } from "../store";
import type {
  IApplication,
  ICreateApplicationPayload,
  TUpdateApplicationPayload,
  IDocument,
} from "../types";

import { getErrorMessage } from "../../utils/error"; // << shared helper

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
  const token = useSelector(selectToken);

  const fetchApplications = useCallback(async () => {
    if (!token) return;
    dispatch(setLoading(true));
    try {
      const res = await axios.get<IApplication[]>("/applications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setApplications(res.data));
    } catch (err: unknown) {
      dispatch(setError(getErrorMessage(err)));
    }
  }, [dispatch, token]);

  const fetchApplication = useCallback(
    async (id: number) => {
      if (!token) return;
      dispatch(setLoading(true));
      try {
        const res = await axios.get<IApplication>(`/applications/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setCurrentApplication(res.data));
      } catch (err: unknown) {
        dispatch(setError(getErrorMessage(err)));
      }
    },
    [dispatch, token]
  );

  const createApplication = useCallback(
    async (payload: ICreateApplicationPayload) => {
      if (!token) throw new Error("Not authenticated");
      dispatch(setLoading(true));
      try {
        const res = await axios.post<IApplication>("/applications", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(addApplication(res.data));
        dispatch(setCurrentApplication(res.data));
      } catch (err: unknown) {
        dispatch(setError(getErrorMessage(err)));
      }
    },
    [dispatch, token]
  );

  const updateApplication = useCallback(
    async (id: number, updates: TUpdateApplicationPayload) => {
      if (!token) throw new Error("Not authenticated");
      dispatch(setLoading(true));
      try {
        const res = await axios.patch<IApplication>(
          `/applications/${id}`,
          updates,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(updateAppAction(res.data));
      } catch (err: unknown) {
        dispatch(setError(getErrorMessage(err)));
      }
    },
    [dispatch, token]
  );

  const uploadDocument = useCallback(
    async (
      applicationId: number,
      formData: FormData,
      onUploadProgress?: (p: number) => void
    ) => {
      if (!token) throw new Error("Not authenticated");
      dispatch(setUploadProgress(0));
      try {
        const res = await axios.post<IDocument>("/documents", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              dispatch(setUploadProgress(percent));
              if (onUploadProgress) onUploadProgress(percent);
            }
          },
        });

        const document = res.data;
        dispatch(addDocumentToApplication({ applicationId, document }));
        dispatch(setUploadProgress(100));
        setTimeout(() => dispatch(clearUploadProgress()), 500);
      } catch (err: unknown) {
        dispatch(setError(getErrorMessage(err)));
        dispatch(clearUploadProgress());
      }
    },
    [dispatch, token]
  );

  const clearApplicationError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const clearCurrent = useCallback(() => {
    dispatch(setCurrentApplication(null));
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

    fetchApplications,
    fetchApplication,
    createApplication,
    updateApplication,
    uploadDocument,
    clearApplicationError,
    clearCurrent,
  };
};
