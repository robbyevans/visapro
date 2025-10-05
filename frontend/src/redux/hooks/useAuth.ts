import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { loginStart, logout, clearError } from "../slices/authSlice";
import {
  selectToken,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from "../selectors/authSelectors";

export const useAuth = () => {
  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const login = useCallback(() => {
    dispatch(loginStart());
    // API call would go here
  }, [dispatch]);

  const signOut = useCallback(() => {
    dispatch(logout());
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
