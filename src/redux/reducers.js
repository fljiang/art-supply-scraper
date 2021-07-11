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
    {name: "Copic Ciao Markers 12pc Basic Marker Set"},
    {name: "Mungyo Compressed Charcoal Set of 12"},
    {name: "Mungyo Oil Pastel Set of 24 Standard Assortment"},
    {name: "Amsterdam Standard Acrylic Set - 36 x 20 ml"},
    {name: "Fabre Castell 12-Pack Pastel Pencils"},
    {name: "Pigma Sensei Manga Drawing Set"},
    {name: "Winsor & Newton Fineliner Set of 5"}
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