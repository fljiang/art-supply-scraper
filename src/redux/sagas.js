import { put, select, all, call, takeLatest } from "redux-saga/effects";
import {
  getTableDataBackend,
  getGraphDataBackend,
  postEmailBackend
} from "../api";

export const getGraphData = state => state.graphData;
export const getSearchInput = state => state.searchInput;
export const getRecentSearches = state => state.recentSearches;

const defaultGraphData = [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}, {x: 4, y: 5}];

function* setSearchInput(action) {
  let newRecentSearches = yield select(getRecentSearches);

  // Shift list
  for (let i = newRecentSearches.length; i > 0; i--) {
    newRecentSearches[i] = newRecentSearches[i - 1];
  }

  newRecentSearches[0] = action.searchInput;
  newRecentSearches = newRecentSearches.slice(0, 3);
  const tableData = yield call(getTableDataBackend, action.searchInput);

  yield put({
    type: "SEARCH_INPUT_UPDATED",
    recentSearches: newRecentSearches,
    searchInput: action.searchInput,
    tableData: tableData.data
  });
}

function* setProductId(action) {
  const graphData = yield call(getGraphDataBackend, action.productId);
  if (!graphData.data.length) {
    graphData.data = defaultGraphData;
  }

  yield put({
    type: "PRODUCT_ID_UPDATED",
    productId: action.productId,
    graphData: graphData.data
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
  yield takeLatest("SET_PRODUCT_ID", setProductId);
  yield takeLatest("SET_EMAIL_INPUT", setEmailInput);
}

export default function* rootSaga() {
  yield all([
    appWatcher()
  ]);
}