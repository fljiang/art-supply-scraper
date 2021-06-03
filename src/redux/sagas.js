import { put, select, all, call, takeLatest } from "redux-saga/effects";
import {
  getData,
  postEmail
} from "../api";

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
  const tableData = yield call(getData, action.searchInput);

  yield put({
    type: "SEARCH_INPUT_UPDATED",
    recentSearches: newRecentSearches,
    searchInput: action.searchInput,
    tableData: tableData.data
  });
}

function* setEmailInput(action) {

  // yield call(postEmail, action.emailInput);

  yield put({
    type: "EMAIL_INPUT_UPDATED",
  });
}

function* appWatcher() {
  yield takeLatest("SET_SEARCH_INPUT", setSearchInput);
  yield takeLatest("SET_EMAIL_INPUT", setEmailInput);
}

export default function* rootSaga() {
  yield all([
    appWatcher()
  ]);
}