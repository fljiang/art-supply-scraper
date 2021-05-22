let defaultGraphData = [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}, {x: 4, y: 5}];
let defaultTableData = [];

const initialState = {
  graphData: defaultGraphData,
  tableData: defaultTableData,
  searchInput: "Copic marker",
  selectedProduct: "",
  favourites: [],
  recentSearches: [],
  emailSuccess: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case "SEARCH_INPUT_UPDATED":
      return {
        ...state,
        searchInput: action.searchInput,
      }
    case "EMAIL_UPDATED":
      return {
        ...state,
        emailSuccess: true
      }
    default:
      return state;
  }
}