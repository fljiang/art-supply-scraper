let defaultGraphData = [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 4}, {x: 4, y: 5}];
let defaultTableData = [];

const initialState = {
  graphData: defaultGraphData,
  tableData: defaultTableData,
  searchInput: "copic marker",
  selectedProduct: "",
  searchOptions: [
    {name: "copic marker 36 set"},
    {name: "copic marker 72 set"},
    {name: "copic marker 128 set"},
    {name: "prismacolour marker 36 set"},
    {name: "promarker 12 set"},
    {name: "promarker 36 set"}
  ],
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