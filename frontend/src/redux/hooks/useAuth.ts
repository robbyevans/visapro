import axios from "axios";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setToken,
  setError,
  logout,
  clearError,
} from "../slices/authSlice";
import { setUser } from "../slices/userSlice";
import {
  selectToken,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from "../selectors/authSelectors";
import type { AppDispatch } from "../store";
import type { ILoginResponse, IUser } from "../types";

function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as { error?: string } | undefined;
    if (data?.error) return data.error;
    return err.message || "Request error";
  }
  if (err instanceof Error) return err.message;
  return String(err);
}

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const login = useCallback(
    async (email: string, password: string) => {
      dispatch(setLoading(true));
      try {
        const res = await axios.post<ILoginResponse>("/login", {
          email,
          password,
        });
        const { token: tkn, user } = res.data;
        dispatch(setToken(tkn));
        dispatch(setUser(user as IUser));
        dispatch(setLoading(false));
      } catch (err: unknown) {
        dispatch(setError(getErrorMessage(err)));
      }
    },
    [dispatch]
  );

  const signOut = useCallback(() => {
    dispatch(logout());
    dispatch(setUser(null));
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    signOut,
    clearAuthError,
  };
};
