import { put, select, all, call, takeLatest } from "redux-saga/effects";
import { fetchData } from "../api";

export const getGraphData = state => state.graphData;
export const getSearchInput = state => state.searchInput;
export const getRecentSearches = state => state.recentSearches;

function* setSearchInput(action) {

  let newRecentSearches = yield select(getRecentSearches);
  const currIndex = newRecentSearches.length;

  for (let i = currIndex; i > 0; i--) {
    newRecentSearches[i] = newRecentSearches[i - 1];
  }
  newRecentSearches[0] = action.searchInput;
  newRecentSearches = newRecentSearches.slice(0, 3);

  const result = yield call(fetchData)
  console.log(result);

  yield put({
    type: "SEARCH_INPUT_UPDATED",
    searchInput: action.searchInput,
    recentSearches: newRecentSearches
    // setSearchInputBackend: action.setSearchInputBackend
  });
}

function* setEmail(action) {
  yield put({
    type: "EMAIL_UPDATED",
    // setEmailBackend: action.setEmailBackend
  });
}

function* appWatcher() {
  yield takeLatest("SET_SEARCH_INPUT", setSearchInput);
  yield takeLatest("SET_EMAIL", setEmail);
}

export default function* rootSaga() {
  yield all([
    appWatcher()
  ]);
}