import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, clearError, loginUser, signUpUser } from "../slices/authSlice";
import { setUser } from "../slices/userSlice";
import {
  selectToken,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from "../selectors/authSelectors";
import type { AppDispatch } from "../store";
import type { IUser, ISignUpRequest } from "../types";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector(selectToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const handleSignUp = useCallback(
    async (userData: ISignUpRequest) => {
      try {
        const result = await dispatch(signUpUser(userData)).unwrap();
        // Set user data in user slice
        dispatch(setUser(result.user as IUser));
        return { success: true };
      } catch (error) {
        return { success: false, error: error as string };
      }
    },
    [dispatch]
  );

  const handleLogIn = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await dispatch(loginUser({ email, password })).unwrap();
        // Set user data in user slice
        dispatch(setUser(result.user as IUser));
        return { success: true };
      } catch (error) {
        return { success: false, error: error as string };
      }
    },
    [dispatch]
  );

  const handleLogOut = useCallback(() => {
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
    handleSignUp,
    handleLogIn,
    handleLogOut,
    clearAuthError,
  };
};
