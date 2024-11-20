const BASE = import.meta.env.VITE_KEY;

export const getSpecialtyPizzas = async () => {
  const url = BASE + "/specialty-pizzas";

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.specialtyPizzas;
  } catch (error) {
    console.error("Error fetching specialty pizzas:", error);
  }
};

export const getSpecialtyPricing = async () => {
  const url = BASE + "/pizza-pricing";

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching specialty pizzas:", error);
  }
};
