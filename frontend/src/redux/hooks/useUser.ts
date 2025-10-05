import axios from "axios";
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
      const res = await axios.get<{ user: IUser }>("/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setUser(res.data.user));
    } catch (err: unknown) {
      dispatch(setError(getErrorMessage(err)));
    }
  }, [dispatch, token]);

  const fetchAthletes = useCallback(async () => {
    if (!token) return;
    dispatch(setLoading(true));
    try {
      const res = await axios.get<IAthlete[]>("/athletes", {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        const res = await axios.post<IAthlete>("/athletes", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
