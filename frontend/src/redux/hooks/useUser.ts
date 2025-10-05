import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setUser,
  setAthletes,
  addAthlete,
  setError,
  clearError,
} from "../slices/userSlice";
import {
  selectCurrentUser,
  selectAthletes,
  selectUserLoading,
  selectUserError,
} from "../selectors/userSelectors";
import { selectToken } from "../selectors/authSelectors";
import type { AppDispatch } from "../store";
import type { IUser, IAthlete } from "../types";

import { getErrorMessage } from "../../utils/error"; // << shared helper
import { axiosInstance } from "../api";

export const useUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentUser = useSelector(selectCurrentUser);
  const athletes = useSelector(selectAthletes);
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const token = useSelector(selectToken);

  const fetchUser = useCallback(async () => {
    if (!token) return;
    dispatch(setLoading(true));
    try {
      const api = axiosInstance(token);
      const res = await api.get<{ user: IUser }>("/me");
      dispatch(setUser(res.data.user));
    } catch (err: unknown) {
      dispatch(setError(getErrorMessage(err)));
    }
  }, [dispatch, token]);

  const fetchAthletes = useCallback(async () => {
    if (!token) return;
    dispatch(setLoading(true));
    try {
      const api = axiosInstance(token);
      const res = await api.get<IAthlete[]>("/athletes");
      dispatch(setAthletes(res.data));
    } catch (err: unknown) {
      dispatch(setError(getErrorMessage(err)));
    }
  }, [dispatch, token]);

  const createAthlete = useCallback(
    async (payload: {
      first_name: string;
      last_name: string;
      passport_number: string;
      date_of_birth?: string;
    }) => {
      if (!token) throw new Error("Not authenticated");
      dispatch(setLoading(true));
      try {
        const api = axiosInstance(token);
        const res = await api.post<IAthlete>("/athletes", payload);
        dispatch(addAthlete(res.data));
      } catch (err: unknown) {
        dispatch(setError(getErrorMessage(err)));
      }
    },
    [dispatch, token]
  );

  const clearUserError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    currentUser,
    athletes,
    isLoading,
    error,
    fetchUser,
    fetchAthletes,
    createAthlete,
    clearUserError,
  };
};
