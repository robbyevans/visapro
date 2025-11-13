import type { RootState } from "../store";

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectAthletes = (state: RootState) => state.user.athletes;
export const selectUserLoading = (state: RootState) => state.user.isLoading;
export const selectUserError = (state: RootState) => state.user.error;

export const selectUserRole = (state: RootState) =>
  state.user.currentUser?.role;
export const selectIsAdmin = (state: RootState) =>
  state.user.currentUser?.role === "admin";
export const selectIsIndividual = (state: RootState) =>
  state.user.currentUser?.role === "individual";
export const selectIsCorporate = (state: RootState) =>
  state.user.currentUser?.role === "corporate";

export const selectAthleteById = (athleteId: number) => (state: RootState) =>
  state.user.athletes.find((athlete) => athlete.id === athleteId);

// ✅ ADD THESE NEW THEME-RELATED SELECTORS
export const selectUserTheme = (state: RootState) =>
  state.user.currentUser?.theme_preference || "light";

export const selectIsDarkMode = (state: RootState) =>
  state.user.currentUser?.theme_preference === "dark";

export const selectIsLightMode = (state: RootState) =>
  state.user.currentUser?.theme_preference === "light";
