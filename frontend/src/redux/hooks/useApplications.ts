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

import { getErrorMessage } from "../../utils/error";
import { axiosInstance } from "../api";
import type { AxiosProgressEvent } from "axios";
// import the slice Document type so dispatch payload matches reducer expectation
import type { Document as SliceDocument } from "../slices/applicationsSlice";

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
      const api = axiosInstance(token);
      const res = await api.get<IApplication[]>("/applications");
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
        const api = axiosInstance(token);
        const res = await api.get<IApplication>(`/applications/${id}`);
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
        const api = axiosInstance(token);
        const res = await api.post<IApplication>("/applications", payload);
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
        const api = axiosInstance(token);
        const res = await api.patch<IApplication>(
          `/applications/${id}`,
          updates
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
        const api = axiosInstance(token);
        const res = await api.post<IDocument>("/documents", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          // use AxiosProgressEvent (may be undefined)
          onUploadProgress: (progressEvent: AxiosProgressEvent | undefined) => {
            const loaded = progressEvent?.loaded ?? 0;
            const total = progressEvent?.total ?? 0;
            if (total > 0) {
              const percent = Math.round((loaded * 100) / total);
              dispatch(setUploadProgress(percent));
              if (onUploadProgress) onUploadProgress(percent);
            }
          },
        });

        // cast response to the slice Document type so TS is happy
        const document = res.data as unknown as SliceDocument;
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
