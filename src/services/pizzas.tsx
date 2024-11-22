const BASE = import.meta.env.VITE_KEY;

export const getSpecialtyPizzas = async () => {
  const url = BASE + "/specialty-pizzas";

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data?.specialtyPizzas?.length) return data.specialtyPizzas;
    else throw new Error("ERROR");
  } catch (error) {
    return error;
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
