export const getData = async (searchInput) => {
  const response = await fetch("https://art-supply-scraper.herokuapp.com/table/" + searchInput);
  const data = await response.json();
  return data;
};

export const postEmail = async (emailInput) => {
  const response = await fetch("https://art-supply-scraper.herokuapp.com/email/" + emailInput);
};