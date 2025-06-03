// src/features/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id:    string;
  email: string;
  name?: string;
  role: "ADMIN" | "EMPLOYEE" | "USER";
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart(state) {
      state.loading = true;
    },
    // payload: { user, accessToken, refreshToken }
    loginSuccess(
      state,
      action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>
    ) {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.loading = false;
    },
    authFailure(state) {
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    // Si quieres actualizar solo el nombre del usuario:
    updateUserName(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.name = action.payload;
      }
    },
    // Acción para actualizar solo el accessToken y refreshToken (p. ej. tras hacer refresh)
    refreshTokens(
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const {
  authStart,
  loginSuccess,
  authFailure,
  logout,
  updateUserName,
  refreshTokens,
} = authSlice.actions;

export default authSlice.reducer;
