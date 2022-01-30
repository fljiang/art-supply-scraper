import { defaultGraphData } from "./sagas";

const defaultTableData = [
  {
    "productId": 1,
    "name": "",
    "store": "API takes up",
    "stock": "up to 30",
    "price": "seconds"
  },
  {
    "productId": 2,
    "name": "",
    "store": "Scheduler",
    "stock": "currently",
    "price": "disabled"
  }
];

const initialState = {

  // Search
  recentSearches: [],
  searchInput: "copic marker",
  searchOptions: [
    {name: "Copic Ciao Markers Basic Set (12PC)"},
    {name: "Mungyo Compressed Charcoal Set (12PC)"},
    {name: "Mungyo Oil Pastel Set (24PC)"},
    {name: "Amsterdam Standard Acrylic Set (36PC x 20ml)"},
    {name: "Faber Castell Pastel Pencils Set (12PC)"},
    {name: "Pigma Sensei Manga Drawing Set (6PC)"},
    {name: "Winsor & Newton Black Fineliner Set (5PC)"}
  ],
  tableData: defaultTableData,

  // Product table
  activeProductId: "",
  favourites: [],

  // Graph
  graphData: defaultGraphData,
  maxPrice: 0,

  // Email
  emailInputSuccess: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case "SEARCH_INPUT_UPDATED":
      return {
        ...state,
        recentSearches: action.recentSearches,
        searchInput: action.searchInput,
        tableData: action.tableData
      }
    case "PRODUCT_ID_UPDATED":
      return {
        ...state,
        activeProductId: action.productId,
        graphData: action.graphData
      }
    case "EMAIL_INPUT_UPDATED":
      return {
        ...state,
        emailInputSuccess: true
      }
    default:
      return state;
  }
}