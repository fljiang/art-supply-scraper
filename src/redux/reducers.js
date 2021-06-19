const defaultGraphData = [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}, {x: 4, y: 5}];
const defaultTableData = [
  {
    "productId": 1,
    "name": "TODO",
    "store": "TODO",
    "stock": "TODO",
    "price": 0
  },
  {
    "productId": 2,
    "name": "TODO",
    "store": "TODO",
    "stock": "TODO",
    "price": 0
  },
  {
    "productId": 3,
    "name": "TODO",
    "store": "TODO",
    "stock": "TODO",
    "price": 0
  }
]

const initialState = {

  // Search
  recentSearches: [],
  searchInput: "copic marker",
  searchOptions: [
    {name: "copic marker 36 set"},
    {name: "copic marker 72 set"},
    {name: "copic marker 128 set"},
    {name: "prismacolour marker 36 set"},
    {name: "promarker 12 set"},
    {name: "promarker 36 set"}
  ],
  tableData: defaultTableData,

  // Product
  activeProductId: "",
  favourites: [],
  graphData: defaultGraphData,

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