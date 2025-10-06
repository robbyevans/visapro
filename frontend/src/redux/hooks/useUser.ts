import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  fetchAthletes,
  createAthlete,
  updateUserProfile,
  clearError,
} from "../slices/userSlice";
import {
  selectCurrentUser,
  selectAthletes,
  selectUserLoading,
  selectUserError,
} from "../selectors/userSelectors";
import type { AppDispatch } from "../store";

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentUser = useSelector(selectCurrentUser);
  const athletes = useSelector(selectAthletes);
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

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

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    currentUser,
    athletes,
    isLoading,
    error,
    fetchUser: handleFetchUser,
    fetchAthletes: handleFetchAthletes,
    createAthlete: handleCreateAthlete,
    updateUser: handleUpdateUser,
    clearUserError: handleClearError,
  };
};
