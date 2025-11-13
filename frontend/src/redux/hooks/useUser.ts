import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  fetchAthletes,
  createAthlete,
  updateUserProfile,
  updateUserTheme,
  clearError,
  updateThemeLocal,
} from "../slices/userSlice";
import {
  selectCurrentUser,
  selectAthletes,
  selectUserLoading,
  selectUserError,
  selectUserTheme,
  selectIsDarkMode,
  selectIsLightMode,
} from "../selectors/userSelectors";
import type { AppDispatch } from "../store";

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentUser = useSelector(selectCurrentUser);
  const athletes = useSelector(selectAthletes);
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  const theme = useSelector(selectUserTheme);
  const isDarkMode = useSelector(selectIsDarkMode);
  const isLightMode = useSelector(selectIsLightMode);

  const handleFetchUser = useCallback(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleFetchAthletes = useCallback(() => {
    dispatch(fetchAthletes());
  }, [dispatch]);

  const handleCreateAthlete = useCallback(
    (payload: {
      first_name: string;
      last_name: string;
      passport_number: string;
      date_of_birth?: string;
    }) => {
      return dispatch(createAthlete(payload));
    },
    [dispatch]
  );

  const handleUpdateUser = useCallback(
    (updates: Partial<any>) => {
      return dispatch(updateUserProfile(updates));
    },
    [dispatch]
  );

  const handleUpdateTheme = useCallback(
    (theme_preference: "light" | "dark") => {
      return dispatch(updateUserTheme(theme_preference));
    },
    [dispatch]
  );

  const handleUpdateThemeLocal = useCallback(
    (theme_preference: "light" | "dark") => {
      dispatch(updateThemeLocal(theme_preference));
    },
    [dispatch]
  );

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // User data
    currentUser,
    athletes,
    isLoading,
    error,
    theme,
    isDarkMode,
    isLightMode,

    // Actions
    fetchUser: handleFetchUser,
    fetchAthletes: handleFetchAthletes,
    createAthlete: handleCreateAthlete,
    updateUser: handleUpdateUser,
    updateTheme: handleUpdateTheme,
    updateThemeLocal: handleUpdateThemeLocal,
    clearUserError: handleClearError,
  };
};
