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
    {name: "Pigma Sensei Manga Drawing Set"},
    {name: "Oil Pastel Set of 12 Standard Assortment"},
    {name: "Charcoal Pencil Set - 4 pencil pack"},
    {name: "Set of 120 Polychromos Colour Pencils in Wood Case"},
    {name: "Golden Acrylic Explorer 14-Piece Set"},
    {name: "Oval paintbrush with a short handle"},
    {name: "Box Set of 50 Extra Soft Pastels"}
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