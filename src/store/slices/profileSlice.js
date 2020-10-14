import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signUp = createAsyncThunk(
  "auth/signup",
  async (creds, thunkAPI) => {
    const response = await thunkAPI.extra.api.request({
      method: "POST",
      path: "/auth/register",
      payload: {
        email: creds.email,
        password: creds.password,
        name: creds.name,
      },
    });

    if (response.error) {
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
  }
);

export const signIn = createAsyncThunk(
  "auth/signin",
  async (creds, thunkAPI) => {
    const response = await thunkAPI.extra.api.request({
      method: "POST",
      path: "/auth/login",
      payload: {
        email: creds.email,
        password: creds.password,
      },
    });

    if (response.error) {
      return thunkAPI.rejectWithValue(response.error);
    }

    return response.data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: {},
    error: null,
    loading: false,
  },
  reducers: {
    logout(state, payload) {
      state.data = {};
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Sign UP
    builder.addCase(signUp.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
        ...action.payload.user,
      };
      state.loading = false;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.data = {};
      state.error = action.payload;
      state.loading = false;
    });

    // Sign IN
    builder.addCase(signIn.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload,
        ...action.payload.user,
      };
      state.loading = false;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.data = {};
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { reducer, actions } = profileSlice;

export const { logout } = actions;

export const getToken = (state) => state.profile.data.token;
