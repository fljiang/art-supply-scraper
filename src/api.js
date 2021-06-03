export const getData = async (searchInput) => {
  const response = await fetch("http://localhost:5000/table/" + searchInput);
  const data = await response.json();
  return data;
};

export const postEmail = async (emailInput) => {
  const response = await fetch("http://localhost:5000/email/" + emailInput);
};