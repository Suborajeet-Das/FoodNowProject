import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "../../api/auth";
import * as SecureStore from "expo-secure-store";

// SecureStore helper wrapper to avoid crashes on non-supported platforms
const saveToken = async (token) => {
  try {
    await SecureStore.setItemAsync("user_token", token);
  } catch (error) {
    console.warn("SecureStore failed to write token:", error.message);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync("user_token");
  } catch (error) {
    console.warn("SecureStore failed to delete token:", error.message);
  }
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await loginApi(email, password);
      if (data.token) {
        await saveToken(data.token);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ fullName, email, phone, password }, { rejectWithValue }) => {
    try {
      const data = await registerApi(fullName, email, phone, password);
      if (data.token) {
        await saveToken(data.token);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const restoreToken = createAsyncThunk(
  "auth/restoreToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = await SecureStore.getItemAsync("user_token");
      if (token) {
        // Automatically restore user state if token is found
        return {
          token,
          user: {
            id: 1,
            email: "test@foodnow.com",
            fullName: "Test User",
            phone: "1234567890",
            role: "CUSTOMER",
          },
        };
      }
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isLoggedIn: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
      removeToken();
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Restore Token
      .addCase(restoreToken.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoggedIn = true;
        }
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
