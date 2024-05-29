import { createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
  name: "songs",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchSongsStart: (state) => {
      state.loading = true;
    },
    fetchSongsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    fetchSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createSongStart: (state) => {
      state.loading = true;
    },
    createSongSuccess: (state, action) => {
      state.loading = false;
      state.list.push(action.payload);
    },
    createSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSongStart: (state) => {
      state.loading = true;
    },
    updateSongSuccess: (state, action) => {
      state.loading = false;
      const index = state.list.findIndex(
        (song) => song.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    updateSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongStart: (state) => {
      state.loading = true;
    },
    deleteSongSuccess: (state, action) => {
      state.loading = false;
      state.list = state.list.filter((song) => song.id !== action.payload);
    },
    deleteSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSongsStart,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongStart,
  createSongSuccess,
  createSongFailure,
  updateSongStart,
  updateSongSuccess,
  updateSongFailure,
  deleteSongStart,
  deleteSongSuccess,
  deleteSongFailure,
} = songsSlice.actions;

export default songsSlice.reducer;
