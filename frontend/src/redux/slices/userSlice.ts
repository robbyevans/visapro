import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IUser, IUserState, IAthlete } from "../types";
import { axiosInstance } from "../api";
import { getErrorMessage } from "../../utils/error";

// Async thunks
const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      if (!token) throw new Error("Not authenticated");

      const api = axiosInstance(token);
      const res = await api.get<{ user: IUser }>("/me");
      return res.data.user;
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const updateUserTheme = createAsyncThunk(
  "user/updateTheme",
  // ✅ Change parameter name to theme_preference
  async (theme_preference: "light" | "dark", { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      if (!token) throw new Error("Not authenticated");

      const api = axiosInstance(token);
      // ✅ Send theme_preference instead of theme
      const res = await api.patch<{ user: IUser }>("/users/update_theme", {
        theme_preference,
      });
      return res.data.user;
    } catch (err: unknown) {
      console.error("Theme update error:", err);
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const fetchAthletes = createAsyncThunk(
  "user/fetchAthletes",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      if (!token) throw new Error("Not authenticated");

      const api = axiosInstance(token);
      const res = await api.get<IAthlete[]>("/athletes");
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const createAthlete = createAsyncThunk(
  "user/createAthlete",
  async (
    payload: {
      first_name: string;
      last_name: string;
      passport_number: string;
      date_of_birth?: string;
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      if (!token) throw new Error("Not authenticated");

      const api = axiosInstance(token);
      const res = await api.post<IAthlete>("/athletes", payload);
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (updates: Partial<IUser>, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      if (!token) throw new Error("Not authenticated");

      const api = axiosInstance(token);
      const res = await api.patch<IUser>("/users/profile", updates);
      return res.data;
    } catch (err: unknown) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

const initialState: IUserState = {
  currentUser: null,
  athletes: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.currentUser = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    clearAthletes(state) {
      state.athletes = [];
    },
    updateThemeLocal(state, action: PayloadAction<"light" | "dark">) {
      if (state.currentUser) {
        // ✅ Use theme_preference consistently
        state.currentUser.theme_preference = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Athletes
      .addCase(fetchAthletes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAthletes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.athletes = action.payload;
      })
      .addCase(fetchAthletes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Athlete
      .addCase(createAthlete.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createAthlete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.athletes.push(action.payload);
      })
      .addCase(createAthlete.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserTheme.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUserTheme.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(updateUserTheme.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export {
  fetchUser,
  fetchAthletes,
  createAthlete,
  updateUserProfile,
  updateUserTheme,
};

export const { setUser, clearError, clearAthletes, updateThemeLocal } =
  userSlice.actions;

export default userSlice.reducer;
