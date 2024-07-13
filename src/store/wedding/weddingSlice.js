import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    wedding: {},
    status: 'idle',
    error: null
  }

export const fetchWedding = createAsyncThunk('weddings/fetchWedding', async (args) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    const response = await fetch(`https://wedding-backend-weld.vercel.app/api/weddings/${args.weddingId}`, requestOptions);
    const data = await response.json();
    return data
})

const weddingSlice = createSlice({
    name: 'wedding',
    initialState,
    reducers: {
    }, 
    extraReducers(builder) {
      builder
        .addCase(fetchWedding.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(fetchWedding.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.wedding = action.payload
        })
        .addCase(fetchWedding.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
    }
  })

  export default weddingSlice.reducer

  export const getWedding = state => state.wedding.wedding