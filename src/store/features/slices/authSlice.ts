// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  email: string;
  username?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Estado inicial para la autenticación
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Acción para iniciar el proceso de autenticación (por ejemplo, mostrar loading)
    authStart(state) {
      state.loading = true;
    },
    // Acción que se dispara cuando la autenticación (sign in o sign up) es exitosa
    authSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    // Acción para manejar algún fallo en la autenticación (opcional)
    authFailure(state) {
      state.loading = false;
      // Aquí podrías agregar un campo de error en el estado si lo requieres
    },
    // Acción para cerrar sesión
    signOut(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { authStart, authSuccess, authFailure, signOut } = authSlice.actions;
export default authSlice.reducer;
