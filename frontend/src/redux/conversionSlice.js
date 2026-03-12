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
  async ({ limit = 10, offset = 0, date = null }, { rejectWithValue }) => {
    try {
      let url = `/conversions?limit=${limit}&offset=${offset}`;
      if (date) {
        url += `&date=${date}`;
      }
      const res = await API.get(url);
      return res.data;
    } catch (err) {
      // console.log(err.response.data.detail);
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
    listError: null,
    formError: null
  },
  reducers: {
    resetConversion: (state) => {
      state.currentConversion = null;
      state.formError = null;
      state.listError = null;
    },
    clearCurrentConversion: (state) => {
       state.currentConversion = null;
    }
  },

  extraReducers: (builder) => {

    builder
      .addCase(convertCurrency.pending, (state) => {
        state.loading = true;
        state.formError = null;
        state.currentConversion = null;
      })

      .addCase(convertCurrency.fulfilled, (state, action) => {
        state.loading = false;
        state.currentConversion = action.payload;
        state.formError = null;
      })

      .addCase(convertCurrency.rejected, (state, action) => {
        state.loading = false;
        state.currentConversion = null;
        if (action.payload) {
          state.formError = action.payload.message;
        } else {
          state.formError = "Something went wrong";
        }
      })

      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.history = action.payload.data;
        state.total = action.payload.total;
        state.loading = false;
        state.listError = null;
      })

      .addCase(fetchHistory.rejected, (state, action) => {
        state.listError = action.payload?.message || "Something went wrong";
        state.loading = false;
        state.history = [];
      });
  }
});

export const { resetConversion, clearCurrentConversion } = conversionSlice.actions;
export default conversionSlice.reducer;
