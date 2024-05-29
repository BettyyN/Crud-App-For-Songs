// src/sagas/songsSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
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
} from "../features/songs/songsSlice";

const API_URL = "http://localhost:8000/songs"; 

function* fetchSongs() {
  try {
    const response = yield call(axios.get, "http://localhost:8000/songs");
    yield put(fetchSongsSuccess(response.data));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* createSong(action) {
  try {
    const response = yield call(axios.post,"http://localhost:8000/songs", action.payload);
    yield put(createSongSuccess(response.data));
  } catch (error) {
    yield put(createSongFailure(error.message));
  }
}

function* updateSong(action) {
  try {
    const response = yield call(
      axios.put,
      `${"http://localhost:8000/songs"}/${action.payload.id}`,
      action.payload
    );
    yield put(updateSongSuccess(response.data));
  } catch (error) {
    yield put(updateSongFailure(error.message));
  }
}

function* deleteSong(action) {
  try {
    yield call(axios.delete, `${"http://localhost:8000/songs"}/${action.payload}`);
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield put(deleteSongFailure(error.message));
  }
}

export default function* songsSaga() {
  yield takeLatest(fetchSongsStart.type, fetchSongs);
  yield takeLatest(createSongStart.type, createSong);
  yield takeLatest(updateSongStart.type, updateSong);
  yield takeLatest(deleteSongStart.type, deleteSong);
}
