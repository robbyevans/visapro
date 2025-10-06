import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IUser, IUserState, IAthlete } from "../types";

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
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
      if (action.payload) state.error = null;
    },
    setUser(state, action: PayloadAction<IUser | null>) {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    setAthletes(state, action: PayloadAction<IAthlete[]>) {
      state.athletes = action.payload;
      state.isLoading = false;
    },
    addAthlete(state, action: PayloadAction<IAthlete>) {
      state.athletes.push(action.payload);
    },
    updateUser(state, action: PayloadAction<Partial<IUser>>) {
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
