import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IAuthState, ILoginResponse, ISignUpRequest } from "../types";
import { axiosInstance } from "../api";
import { getErrorMessage } from "../../utils/error";

// Async thunks
const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const api = axiosInstance();
      const res = await api.post<ILoginResponse>("/login", { email, password });
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const signUpUser = createAsyncThunk(
  "auth/signup",
  async (userData: ISignUpRequest, { rejectWithValue }) => {
    try {
      const api = axiosInstance();
      const requestData = {
        user: {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          password_confirmation: userData.password,
          role: userData.role,
        },
      };
      const res = await api.post<ILoginResponse>("/signup", requestData);
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const initialState: IAuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
      if (action.payload) state.error = null;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) localStorage.setItem("token", action.payload);
      else localStorage.removeItem("token");
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("token");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Signup cases
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export { loginUser, signUpUser };

export const { setLoading, setToken, setError, logout, clearError } =
  authSlice.actions;

export default authSlice.reducer;
