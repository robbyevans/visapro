import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface User {
  id: number;
  name: string;
  email: string;
  role: "individual" | "corporate" | "admin";
}

export interface Athlete {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  passport_number: string;
  user_id: number;
}

interface UserState {
  currentUser: User | null;
  athletes: Athlete[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  athletes: [],
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
      if (action.payload) state.error = null;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    setAthletes(state, action: PayloadAction<Athlete[]>) {
      state.athletes = action.payload;
      state.isLoading = false;
    },
    addAthlete(state, action: PayloadAction<Athlete>) {
      state.athletes.push(action.payload);
    },
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.currentUser)
        state.currentUser = { ...state.currentUser, ...action.payload };
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setUser,
  setAthletes,
  addAthlete,
  updateUser,
  setError,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
