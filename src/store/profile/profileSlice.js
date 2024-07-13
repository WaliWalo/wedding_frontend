import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  profile: {},
  status: 'idle',
  error: null
}

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (args) => {
    var requestOptions = { 
      method: 'GET',
      redirect: 'follow'
    };
  
  const response = await fetch(`http://localhost:8080/api/users/${args.weddingId}/email/${args.email}`, requestOptions);
  const data = await response.json();
  return data
})

export const fetchProfileByName = createAsyncThunk('profile/fetchProfileByName', async (args) => {
  var requestOptions = { 
    method: 'GET',
    redirect: 'follow'
  };

  const response = await fetch(`http://localhost:8080/api/users/${args.weddingId}/name/${args.name}`, requestOptions);
  const data = await response.json();
  if(response.status === 404){
    return null;
  }else{
    return data
  }
})

export const updateProfile = createAsyncThunk('profile/updateProfile', async (args) => {
    const body = JSON.stringify({
      firstName: args.updatedProfile.firstName,
      lastName: args.updatedProfile.lastName,
      accepted: args.updatedProfile.accepted,
      additionalGuests: args.updatedProfile.additionalGuests,
      allergy: args.updatedProfile.allergy,
      overnight: args.updatedProfile.overnight
    });
    var requestOptions = { 
      method: 'PUT',
      redirect: 'follow',
      headers: {
        "Content-Type": "application/json"
      },
      body: body,
    };
  console.log(body);
  const response = await fetch(`http://localhost:8080/api/users/${args.weddingId}/${args.userId}`, requestOptions);
  const data = await response.json();
  return data
})

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    
  }, 
  extraReducers(builder) {
    builder
      .addCase(fetchProfile.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.profile = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(updateProfile.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.profile = action.payload
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchProfileByName.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchProfileByName.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.profile = action.payload
      })
      .addCase(fetchProfileByName.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { userUpdated } = profileSlice.actions

export default profileSlice.reducer

export const getProfile = state => state.profile.profile;
