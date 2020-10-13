import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "api";
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from "../../constants";

function persistAccessToken(token) {
  window.localStorage.setItem(
    LOCAL_STORAGE_ACCESS_TOKEN_KEY,
    JSON.stringify(token)
  );
}

export const signUp = createAsyncThunk(
  "auth/signup",
  async (creds, thunkAPI) => {
    const response = await API.request({
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

    persistAccessToken(response.data.token);

    return response.data;
  }
);

export const signIn = createAsyncThunk(
  "auth/signin",
  async (creds, thunkAPI) => {
    const response = await API.request({
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

    persistAccessToken(response.data.token);

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
  reducers: {},
  extraReducers: (builder) => {
    // Sign UP
    builder.addCase(signUp.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.data = {
        ...state.data,
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
