export const getTableDataBackend = async (searchInput) => {
  const response = await fetch("https://art-supply-scraper.herokuapp.com/table/" + searchInput);
  const data = await response.json();
  return data;
};

export const getGraphDataBackend = async (productId) => {
  const response = await fetch("https://art-supply-scraper.herokuapp.com/graph/" + productId);
  const data = await response.json();
  return data;
};

export const postEmailBackend = async (emailInput) => {
  const response = await fetch("https://art-supply-scraper.herokuapp.com/email/" + emailInput);
};