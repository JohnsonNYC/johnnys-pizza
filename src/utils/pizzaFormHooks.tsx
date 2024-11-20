import { useEffect } from "react";
import {
  HiringFrontendTakeHomePizzaToppings,
  HiringFrontendTakeHomeToppingQuantity,
  SpecialtyPizza,
} from "../types";

const useToppingExclusions = (
  pizzaData: SpecialtyPizza | null,
  selectedMeats: Array<{
    name: HiringFrontendTakeHomePizzaToppings;
    quantity: HiringFrontendTakeHomeToppingQuantity;
  }>,
  selectedVeggies: Array<{
    name: HiringFrontendTakeHomePizzaToppings;
    quantity: HiringFrontendTakeHomeToppingQuantity;
  }>,
  setToppingExclusions: React.Dispatch<
    React.SetStateAction<HiringFrontendTakeHomePizzaToppings[]>
  >
) => {
  useEffect(() => {
    if (!pizzaData) return;

    const exclusions: HiringFrontendTakeHomePizzaToppings[] = [];

    pizzaData.toppings.forEach((topping) => {
      const isSelected =
        selectedMeats.some(
          (meat) =>
            meat.name ===
            (topping as unknown as HiringFrontendTakeHomePizzaToppings)
        ) ||
        selectedVeggies.some(
          (veggie) =>
            veggie.name ===
            (topping as unknown as HiringFrontendTakeHomePizzaToppings)
        );
      if (!isSelected) {
        exclusions.push(
          topping as unknown as HiringFrontendTakeHomePizzaToppings
        );
      }
    });

    setToppingExclusions(exclusions);
  }, [pizzaData, selectedMeats, selectedVeggies, setToppingExclusions]);
};

export default useToppingExclusions;
