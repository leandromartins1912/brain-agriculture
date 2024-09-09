import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export const fetchProducers = createAsyncThunk(
  "producers/fetchProducers",
  async () => {
    const response = await axios.get("/farmers");
    return response.data;
  }
);

// Função para deletar produtor
export const deleteProducer = createAsyncThunk(
  "producers/deleteProducer",
  async (producerId, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`/farmers/${producerId}`);
      dispatch(fetchProducers());
      return producerId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createProducer = createAsyncThunk(
  "producers/createProducer",
  async (producerData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/farmers", producerData);
      dispatch(fetchProducers());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProducers = createAsyncThunk(
  "producers/updateProducer",
  async (producerData, { dispatch, rejectWithValue }) => {
    const { id, ...restData } = producerData;
    try {
      const response = await axios.put(`/farmers/${id}`, restData); // Envia os dados atualizados do produtor
      dispatch(fetchProducers()); // Atualiza a lista de produtores após a atualização
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message); // Captura erros da API
    }
  }
);

export const producerSlice = createSlice({
  name: "producers",
  initialState: {
    producers: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addProducer: (state, action) => {
      state.producers.push(action.payload);
    },
    updateProducer: (state, action) => {
      const index = state.producers.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) {
        state.producers[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducers.fulfilled, (state, action) => {
        state.status = "idle";
        state.producers = action.payload;
      })
      .addCase(fetchProducers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteProducer.fulfilled, (state, action) => {
        state.producers = state.producers.filter(
          (p) => p.id !== action.payload
        );
      })
      .addCase(createProducer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.producers.push(action.payload);
      })
      .addCase(createProducer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateProducers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        const index = state.producers.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.producers[index] = action.payload;
        }
      })
      .addCase(updateProducers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addProducer, updateProducer } = producerSlice.actions;
export default producerSlice.reducer;
