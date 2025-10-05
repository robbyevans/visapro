import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import applicationsReducer from "./slices/applicationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    applications: applicationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
