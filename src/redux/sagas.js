import { put, select, all, call, takeLatest } from "redux-saga/effects";
import {
  getTableDataBackend,
  getGraphDataBackend,
  postEmailBackend
} from "../api";

export const getGraphData = state => state.graphData;
export const getSearchInput = state => state.searchInput;
export const getRecentSearches = state => state.recentSearches;

export const defaultGraphData = [
  {x: "2021-07-07", y: 0},
  {x: "2021-07-08", y: 0},
  {x: "2021-07-09", y: 0},
  {x: "2021-07-10", y: 0},
  {x: "2021-07-11", y: 0}
];

// Maps search option display names to api call names
const searchOptionsDict = {
  "Copic Ciao Markers Basic Set (12PC)": "Copic Ciao Markers 12pc Basic Marker Set",
  "Mungyo Compressed Charcoal Set (12PC)": "Mungyo Compressed Charcoal Set of 12",
  "Mungyo Oil Pastel Set (24PC)": "Mungyo Oil Pastel Set of 24 Standard Assortment",
  "Amsterdam Standard Acrylic Set (36PC x 20ml)": "Amsterdam Standard Acrylic Set - 36 x 20 ml",
  "Faber Castell Pastel Pencils Set (12PC)": "Fabre Castell 12-Pack Pastel Pencils",
  "Pigma Sensei Manga Drawing Set (6PC)": "Pigma Sensei Manga Drawing Set",
  "Winsor & Newton Black Fineliner Set (5PC)": "Winsor & Newton Fineliner Set of 5 - Black"
}

function* setSearchInput(action) {
  let newRecentSearches = yield select(getRecentSearches);

  // Remove search input if already present
  for (let i = 0; i < newRecentSearches.length; i++) {
    if (action.searchInput === newRecentSearches[i]) {
        newRecentSearches.splice(i, 1);
        break
    }
  }
  
  for (let i = newRecentSearches.length; i > 0; i--) {
    newRecentSearches[i] = newRecentSearches[i - 1];
  }
    
  newRecentSearches[0] = action.searchInput;
  newRecentSearches = newRecentSearches.slice(0, 3);

  const apiSearchInput = searchOptionsDict[action.searchInput]
  const response = yield call(getTableDataBackend, apiSearchInput);
  
  // Update names to display names in table data
  let tableData = []
  for (let i = 0; i < response.data.length; i++) {
    let record = response.data[i];
    record["name"] = action.searchInput;
    tableData.push(record);
  }

  yield put({
    type: "SEARCH_INPUT_UPDATED",
    recentSearches: newRecentSearches,
    searchInput: action.searchInput,
    tableData: tableData
  });
}

function* setProductId(action) {
  const response = yield call(getGraphDataBackend, action.productId);

  // Graph data
  let graphData;
  if (!response.data.length) {
    graphData = defaultGraphData;
  }
  else {
    graphData = response.data;
  }

  // Max price
  const maxPrice = response.maxPrice;
  const yAxisMax = Math.ceil(maxPrice / 10) * 10;

  yield put({
    type: "PRODUCT_ID_UPDATED",
    productId: action.productId,
    graphData: graphData,
    yAxisMax: yAxisMax
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