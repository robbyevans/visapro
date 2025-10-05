import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  fetchUserStart,
  fetchUserFailure,
  fetchAthletesStart,
  fetchAthletesFailure,
  createAthleteStart,
  createAthleteFailure,
  updateUser,
  clearError,
} from "../slices/userSlice";
import {
  selectCurrentUser,
  selectAthletes,
  selectUserLoading,
  selectUserError,
  selectUserRole,
  selectIsAdmin,
  selectIsIndividual,
  selectIsCorporate,
  selectAthleteById,
} from "../selectors/userSelectors";
import type { RootState } from "../store";
import type { User } from "../slices/userSlice";

export const useUser = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const athletes = useSelector(selectAthletes);
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const role = useSelector(selectUserRole);
  const isAdmin = useSelector(selectIsAdmin);
  const isIndividual = useSelector(selectIsIndividual);
  const isCorporate = useSelector(selectIsCorporate);

  // Fixed: Remove useSelector from callback - components should use selectAthleteById directly
  const getAthleteById = useCallback(
    (id: number) => {
      return athletes.find((athlete) => athlete.id === id);
    },
    [athletes]
  );

  const fetchUser = useCallback(async () => {
    dispatch(fetchUserStart());
    try {
      // API call would go here
    } catch (err) {
      dispatch(
        fetchUserFailure(
          err instanceof Error ? err.message : "Failed to fetch user"
        )
      );
    }
  }, [dispatch]);

  const fetchAthletes = useCallback(async () => {
    dispatch(fetchAthletesStart());
    try {
      // API call would go here
    } catch (err) {
      dispatch(
        fetchAthletesFailure(
          err instanceof Error ? err.message : "Failed to fetch athletes"
        )
      );
    }
  }, [dispatch]);

  const createAthlete = useCallback(async () => {
    dispatch(createAthleteStart());
    try {
      // API call would go here
    } catch (err) {
      dispatch(
        createAthleteFailure(
          err instanceof Error ? err.message : "Failed to create athlete"
        )
      );
    }
  }, [dispatch]);

  const updateUserProfile = useCallback(
    (userData: Partial<User>) => {
      dispatch(updateUser(userData));
    },
    [dispatch]
  );

  const clearUserError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    currentUser,
    athletes,
    isLoading,
    error,
    role,
    isAdmin,
    isIndividual,
    isCorporate,

    // Helper functions
    getAthleteById,

    // Actions
    fetchUser,
    fetchAthletes,
    createAthlete,
    updateUserProfile,
    clearUserError,
  };
};
