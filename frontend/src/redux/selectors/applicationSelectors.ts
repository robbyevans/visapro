import type { RootState } from "../store";

export const selectApplications = (state: RootState) =>
  state.applications.applications;
export const selectCurrentApplication = (state: RootState) =>
  state.applications.currentApplication;
export const selectApplicationsLoading = (state: RootState) =>
  state.applications.isLoading;
export const selectApplicationsError = (state: RootState) =>
  state.applications.error;
export const selectUploadProgress = (state: RootState) =>
  state.applications.uploadProgress;

export const selectPendingApplications = (state: RootState) =>
  state.applications.applications.filter((app) => app.status === "pending");

export const selectApprovedApplications = (state: RootState) =>
  state.applications.applications.filter((app) => app.status === "approved");

export const selectApplicationById =
  (applicationId: number) => (state: RootState) =>
    state.applications.applications.find((app) => app.id === applicationId);

export const selectCanCreateApplication = (state: RootState) => {
  const user = state.user.currentUser;
  const hasActive = state.applications.applications.some((app) =>
    ["pending", "approved", "invoiced"].includes(app.status)
  );

  if (user?.role === "individual") {
    return !hasActive;
  }

  return user?.role === "corporate" || user?.role === "admin";
};
