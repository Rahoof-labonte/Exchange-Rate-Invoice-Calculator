import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

export const convertCurrency = createAsyncThunk(
  "conversion/convert",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/convert", data);
      return res.data;
    } catch (err) {
      let message = "Something went wrong";
      if (err.response?.data?.detail) {
        const detail = err.response.data.detail;
        if (Array.isArray(detail)) {
          message = detail[0].msg; 
        } else {
          message = detail; 
        }
      }
      return rejectWithValue({
        status: err.response?.status,
        message: message
      });
    }
  }
);

export const fetchHistory = createAsyncThunk(
  "conversion/history",
  async (date, { rejectWithValue }) => {
    try {
      const url = date ? `/conversions?date=${date}` : "/conversions";
      const res = await API.get(url);
      return res.data;
    } catch (err) {
      if (err.response) {
        return rejectWithValue({
          status: err.response.status,
          message: err.response.data.detail
        });
      }
      return rejectWithValue({
        status: 500,
        message: "Server error"
      });
    }
  }
);

const conversionSlice = createSlice({
  name: "conversion",
  initialState: {
    currentConversion: null,
    history: [],
    loading: false,
    error: null
  },
  reducers: {
    resetConversion: (state) => {
      state.currentConversion = null;
      state.error = null;
    }
  },

  extraReducers: (builder) => {

    builder
      .addCase(convertCurrency.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(convertCurrency.fulfilled, (state, action) => {
        state.loading = false;
        state.currentConversion = action.payload;
      })

      .addCase(convertCurrency.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = "Something went wrong";
        }
      })

      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      })

      .addCase(fetchHistory.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { resetConversion } = conversionSlice.actions;
export default conversionSlice.reducer;
