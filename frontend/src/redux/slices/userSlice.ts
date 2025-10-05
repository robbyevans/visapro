import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Export interfaces so they can be used in other files
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
  date_of_birth: string;
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
    fetchUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    },
    fetchUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    fetchAthletesStart: (state) => {
      state.isLoading = true;
    },
    fetchAthletesSuccess: (state, action: PayloadAction<Athlete[]>) => {
      state.isLoading = false;
      state.athletes = action.payload;
    },
    fetchAthletesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    createAthleteStart: (state) => {
      state.isLoading = true;
    },
    createAthleteSuccess: (state, action: PayloadAction<Athlete>) => {
      state.isLoading = false;
      state.athletes.push(action.payload);
    },
    createAthleteFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchUserStart,
  fetchUserSuccess,
  fetchUserFailure,
  fetchAthletesStart,
  fetchAthletesSuccess,
  fetchAthletesFailure,
  createAthleteStart,
  createAthleteSuccess,
  createAthleteFailure,
  updateUser,
  clearError,
} = userSlice.actions;
export default userSlice.reducer;
