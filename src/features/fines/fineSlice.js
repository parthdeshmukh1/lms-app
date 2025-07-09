import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as fineService from "../../api/fineService.js";

// 🔁 Thunks
export const fetchFines = createAsyncThunk("fines/fetchFines", async () => {
  const response = await fineService.getFines();
  return response.data;
});

export const getFineById = createAsyncThunk(
  "fines/getFineById",
  async (fineId) => {
    const response = await fineService.getFineById(fineId);
    return response.data;
  }
);

export const getFinesByMemberId = createAsyncThunk(
  "fines/getFinesByMemberId",
  async (memberId) => {
    const response = await fineService.getFinesByMemberId(memberId);
    return response.data;
  }
);

export const getPendingFines = createAsyncThunk(
  "fines/getPendingFines",
  async () => {
    const response = await fineService.getPendingFines();
    return response.data;
  }
);

export const getTotalPendingFinesByMember = createAsyncThunk(
  "fines/getTotalPendingFinesByMember",
  async (memberId) => {
    const response = await fineService.getTotalPendingFinesByMember(memberId);
    return response.data;
  }
);

export const createFine = createAsyncThunk(
  "fines/createFine",
  async ({ transactionId, fineType }) => {
    const response = await fineService.createFine(transactionId, fineType);
    return response.data;
  }
);

export const payFine = createAsyncThunk("fines/payFine", async (fineId) => {
  const response = await fineService.payFine(fineId);
  return response.data;
});

export const cancelFine = createAsyncThunk(
  "fines/cancelFine",
  async (fineId) => {
    const response = await fineService.cancelFine(fineId);
    return response.data;
  }
);

export const updateFines = createAsyncThunk("fines/updateFines", async () => {
  const response = await fineService.updateFines();
  return response.data;
});

export const deleteFine = createAsyncThunk(
  "fines/deleteFine",
  async (fineId) => {
    await fineService.deleteFine(fineId);
    return fineId;
  }
);

export const reverseFine = createAsyncThunk(
  "fines/reverseFine",
  async (fineId) => {
    const response = await fineService.reverseFine(fineId);
    return response.data;
  }
);

// 🧠 Slice
const fineSlice = createSlice({
  name: "fines",
  initialState: {
    fines: [],
    loading: false,
    error: null,
    totalPendingByMember: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch All
      .addCase(fetchFines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFines.fulfilled, (state, action) => {
        state.loading = false;
        state.fines = action.payload;
      })
      .addCase(fetchFines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create
      .addCase(createFine.fulfilled, (state, action) => {
        state.fines.push(action.payload);
      })

      .addCase(payFine.fulfilled, (state, action) => {
        const updatedFine = action.payload;
        const index = state.fines.findIndex(
          (fine) => fine.fineDTO.fineId === updatedFine.fineDTO.fineId
        );
        if (index !== -1) {
          state.fines[index] = updatedFine;
        }
      })

      // Cancel
      .addCase(cancelFine.fulfilled, (state, action) => {
        const index = state.fines.findIndex(
          (fine) => fine.fineDTO.fineId === action.payload.fineDTO.fineId
        );
        if (index !== -1) {
          state.fines[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteFine.fulfilled, (state, action) => {
        state.fines = state.fines.filter(
          (fine) => fine.fineDTO.fineId !== action.payload
        );
      })

      // Get Total Pending Fines by Member
      .addCase(getTotalPendingFinesByMember.fulfilled, (state, action) => {
        state.totalPendingByMember = action.payload;
      })

      // Update Fines (bulk update)
      .addCase(updateFines.fulfilled, (state, action) => {
        state.fines = action.payload;
      })

      .addCase(getFineById.fulfilled, (state, action) => {
        const index = state.fines.findIndex(
          (fine) => fine.fineDTO.fineId === action.payload.fineDTO.fineId
        );
        if (index !== -1) {
          state.fines[index] = action.payload;
        } else {
          state.fines.push(action.payload);
        }
      })
      .addCase(getFinesByMemberId.fulfilled, (state, action) => {
        state.fines = action.payload;
      })
      .addCase(getPendingFines.fulfilled, (state, action) => {
        state.fines = action.payload;
      })
      .addCase(reverseFine.fulfilled, (state, action) => {
        const index = state.fines.findIndex(
          (fine) => fine.fineDTO.fineId === action.payload.fineDTO.fineId
        );
        if (index !== -1) {
          state.fines[index] = action.payload;
        }
      });
  },
});

export default fineSlice.reducer;
