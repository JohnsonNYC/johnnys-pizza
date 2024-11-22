import { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { CartContext } from "../context/CartContext";

import Text from "./Text";
import Dropdown from "./Dropdown";
import SelectionPill from "./SelectionPill";
import Button from "./Button";

import {
  SpecialtyPizza,
  HiringFrontendTakeHomePizzaType,
  HiringFrontendTakeHomePizzaToppings,
  HiringFrontendTakeHomeToppingQuantity,
  HiringFrontendTakeHomePizzaCheese,
  HiringFrontendTakeHomePizzaSauce,
  HiringFrontendTakeHomePizzaSize,
  Pizza,
} from "../types";

import { GetPizzaPricingResponse } from "../types/api";

import { meats, veggies } from "../constantsTBD/constants";

import useToppingExclusions from "../utils/pizzaFormHooks";

interface PizzaFormProps {
  pizzaData: SpecialtyPizza | null;
  closeModal?: () => void;
  pricingInformation: GetPizzaPricingResponse | undefined;
}

const PizzaForm = ({
  pizzaData,
  closeModal,
  pricingInformation,
}: PizzaFormProps) => {
  // ---- State Variables ---
  const [type, setType] = useState<HiringFrontendTakeHomePizzaType>(
    HiringFrontendTakeHomePizzaType.Custom
  );
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState<string>("");

  const [size, setSize] = useState<HiringFrontendTakeHomePizzaSize>(
    HiringFrontendTakeHomePizzaSize.Medium
  );

  const [cheese, setCheese] = useState<HiringFrontendTakeHomePizzaCheese>(
    HiringFrontendTakeHomePizzaCheese.Normal
  );

  const [sauce, setSauce] = useState<HiringFrontendTakeHomePizzaSauce>(
    HiringFrontendTakeHomePizzaSauce.Tomato
  );

  const [selectedMeats, setSelectedMeats] = useState<
    Array<{
      name: HiringFrontendTakeHomePizzaToppings;
      quantity: HiringFrontendTakeHomeToppingQuantity;
    }>
  >([]);

  const [selectedVeggies, setSelectedVeggies] = useState<
    Array<{
      name: HiringFrontendTakeHomePizzaToppings;
      quantity: HiringFrontendTakeHomeToppingQuantity;
    }>
  >([]);

  const [toppingExclusions, setToppingExclusions] = useState<
    HiringFrontendTakeHomePizzaToppings[]
  >([]);

  const sizePricingStore = pricingInformation?.size;
  const toppingsPricingStore = pricingInformation?.toppingPrices;

  // ---- Context ----
  const cartContext = useContext(CartContext);
  const { addToCart } = cartContext;

  // --- Click Handlers ----
  const handleAddToCart = () => {
    const newPizza: Pizza = {
      name,
      type,
      size,
      cheese,
      sauce,
      quantity: quantity,
      totalPrice: price,
    };

    if (selectedMeats.length || selectedVeggies.length)
      newPizza["toppings"] = [...selectedMeats, ...selectedVeggies];

    if (toppingExclusions.length)
      newPizza["toppingExclusions"] = [...toppingExclusions];

    addToCart(newPizza);
    if (closeModal) closeModal();
  };

  const handleQuantity = (type: string): void => {
    if (type === "add") setQuantity(quantity + 1);
    if (type === "subtract" && quantity > 1) setQuantity(quantity - 1);
  };

  const handleSize = (size: HiringFrontendTakeHomePizzaSize): void => {
    setSize(size);

    if (pizzaData) setPrice(pizzaData.price[size]);
    else if (sizePricingStore) setPrice(sizePricingStore[size]);
  };

  const handleSauce = (sauce: HiringFrontendTakeHomePizzaSauce): void => {
    setSauce(sauce);
  };

  const handleCheese = (newCheese: HiringFrontendTakeHomePizzaCheese): void => {
    if (!toppingsPricingStore) return;

    // const currCheese = cheese === "normal" ? "regular" : cheese;
    // const newCheeseFormatted = newCheese === "normal" ? "regular" : newCheese;

    // if (newCheeseFormatted === currCheese) return;

    // const cheesePrices = toppingsPricingStore["extra_cheese"];
    // const currCheesePrice =
    //   currCheese === "none" ? 0 : cheesePrices[currCheese];
    // const newCheesePrice =
    //   newCheeseFormatted === "none" ? 0 : cheesePrices[newCheeseFormatted];

    // if (currCheesePrice !== newCheesePrice) {
    //   setPrice((prevPrice) => prevPrice - currCheesePrice + newCheesePrice);
    // }

    setCheese(newCheese);
  };

  const updatePriceByToppingSelection = (
    type: string,
    topping: HiringFrontendTakeHomePizzaToppings,
    quantity: HiringFrontendTakeHomeToppingQuantity,
    currQuantity?: HiringFrontendTakeHomeToppingQuantity
  ) => {
    if (!toppingsPricingStore) return;
    const toppingPrice = toppingsPricingStore[topping];

    if (type === "add") {
      setPrice((prevPrice) => prevPrice + toppingPrice[quantity]);
    } else if (type === "subtract") {
      setPrice((prevPrice) => prevPrice - toppingPrice[quantity]);
    } else if (type === "update" && currQuantity) {
      const currentTopping =
        selectedMeats.find((meat) => meat.name === topping) ||
        selectedVeggies.find((veg) => veg.name === topping);

      if (currentTopping) {
        setPrice(
          (prevPrice) =>
            prevPrice - toppingPrice[currQuantity] + toppingPrice[quantity]
        );
      }
    }
  };

  const handleMeat = (
    meat: HiringFrontendTakeHomePizzaToppings,
    toppingQuantity: HiringFrontendTakeHomeToppingQuantity
  ): void => {
    const foundIndex = selectedMeats.findIndex(
      (meatItem) => meatItem.name == meat
    );

    let copyMeats = [...selectedMeats];

    if (foundIndex > -1) {
      const foundEl = copyMeats[foundIndex];

      if (foundEl.quantity === toppingQuantity) {
        // if clicking on the same quantity - remove it
        copyMeats = copyMeats.filter((meatItem) => meatItem.name != meat);
        updatePriceByToppingSelection("subtract", meat, toppingQuantity);
      } else {
        // If clicking on different quantity - update it
        updatePriceByToppingSelection(
          "update",
          meat,
          toppingQuantity,
          foundEl.quantity
        );
        foundEl.quantity = toppingQuantity;
        copyMeats[foundIndex] = foundEl;
      }
    } else {
      // If meat does not exist in pie + update price if it is for a custom pizza
      copyMeats.push({ name: meat, quantity: toppingQuantity });
      updatePriceByToppingSelection("add", meat, toppingQuantity);
    }

    setSelectedMeats(copyMeats);
  };

  const handleVeggies = (
    veggie: HiringFrontendTakeHomePizzaToppings,
    toppingQuantity: HiringFrontendTakeHomeToppingQuantity
  ): void => {
    const foundIndex = selectedVeggies.findIndex(
      (veggieItem) => veggieItem.name == veggie
    );

    let copyVeggies = [...selectedVeggies];

    if (foundIndex > -1) {
      const foundEl = copyVeggies[foundIndex];
      if (foundEl.quantity === toppingQuantity) {
        copyVeggies = copyVeggies.filter((vegItem) => vegItem.name != veggie);
        updatePriceByToppingSelection("subtract", veggie, toppingQuantity);
      } else {
        updatePriceByToppingSelection(
          "update",
          veggie,
          toppingQuantity,
          foundEl.quantity
        );
        foundEl.quantity = toppingQuantity;
        copyVeggies[foundIndex] = foundEl;
      }
    } else {
      copyVeggies.push({ name: veggie, quantity: toppingQuantity });
      updatePriceByToppingSelection("add", veggie, toppingQuantity);
    }
    setSelectedVeggies(copyVeggies);
  };

  const prefillPizzaData = (pizzaData: SpecialtyPizza | null) => {
    if (!pizzaData) {
      setName("Custom Pizza Build");
      if (sizePricingStore) setPrice(sizePricingStore[size]);
      return;
    }

    const { name, description, price, toppings } = pizzaData || {};

    if (price && name) {
      setName(name);
      setPrice(price.medium);
    }

    if (description) setDescription(description);
    setCheese(HiringFrontendTakeHomePizzaCheese.Normal);

    setType(HiringFrontendTakeHomePizzaType.Specialty);

    const meatSelection: Array<{
      name: HiringFrontendTakeHomePizzaToppings;
      quantity: HiringFrontendTakeHomeToppingQuantity;
    }> = [];

    const veggieSelection: Array<{
      name: HiringFrontendTakeHomePizzaToppings;
      quantity: HiringFrontendTakeHomeToppingQuantity;
    }> = [];

    if (toppings) {
      toppings.forEach((topping) => {
        if ((topping as unknown) === "extra cheese") {
          setCheese(HiringFrontendTakeHomePizzaCheese.Extra);
        } else if (
          meats.includes(
            topping as unknown as HiringFrontendTakeHomePizzaToppings
          )
        ) {
          meatSelection.push({
            name: topping as unknown as HiringFrontendTakeHomePizzaToppings,
            quantity: HiringFrontendTakeHomeToppingQuantity.Regular,
          });
        } else if (
          veggies.includes(
            topping as unknown as HiringFrontendTakeHomePizzaToppings
          )
        ) {
          veggieSelection.push({
            name: topping as unknown as HiringFrontendTakeHomePizzaToppings,
            quantity: HiringFrontendTakeHomeToppingQuantity.Regular,
          });
        }
      });
    }
    if (meatSelection.length) setSelectedMeats(meatSelection);
    if (veggieSelection.length) setSelectedVeggies(veggieSelection);
  };

  // ---- Hooks ----
  useToppingExclusions(
    pizzaData,
    selectedMeats,
    selectedVeggies,
    setToppingExclusions
  );

  useEffect(() => {
    prefillPizzaData(pizzaData);
  }, [pizzaData]);

  return (
    <Container>
      <Text type="div" font="gothic" size="24px">
        {name}
      </Text>
      <Text type="div" font="poppins" size="24px" className="price">
        ${price.toFixed(2)}
      </Text>
      <Text type="div" font="poppins" size="20px" className="description">
        {description}
      </Text>

      <QuantityContainer>
        <RoundContainer onClick={() => handleQuantity("subtract")}>
          -
        </RoundContainer>
        <Text className="quantity">{quantity}</Text>
        <RoundContainer onClick={() => handleQuantity("add")}>+</RoundContainer>
      </QuantityContainer>

      <SelectionContainer>
        {Object.values(HiringFrontendTakeHomePizzaSize).map((option, index) => (
          <SelectionPill
            key={`size-${index}`}
            option={option}
            active={size === option}
            onClick={() => handleSize(option)}
          >
            <Text color={size == option ? "white" : "black"}>{option}</Text>
          </SelectionPill>
        ))}
      </SelectionContainer>

      <Dropdown title="Cheese" className="dropdown">
        {Object.values(HiringFrontendTakeHomePizzaCheese).map(
          (option, index) => (
            <SelectionPill
              key={`${option}-${index}`}
              active={cheese === option}
              onClick={() => handleCheese(option)}
              option={option}
            >
              <Text color={option == cheese ? "white" : "black"}>{option}</Text>
            </SelectionPill>
          )
        )}
      </Dropdown>

      <Dropdown title="Sauce" className="dropdown">
        {Object.values(HiringFrontendTakeHomePizzaSauce).map(
          (option, index) => (
            <SelectionPill
              key={`${option}-${index}`}
              active={sauce === option}
              onClick={() => handleSauce(option)}
              option={option}
            >
              <Text color={option == sauce ? "white" : "black"}>{option}</Text>
            </SelectionPill>
          )
        )}
      </Dropdown>

      <Dropdown title="Meats" className="dropdown">
        {meats.map((meat, index) => (
          <Row key={`${meat}-${index}`}>
            <Text>{meat}</Text>
            <QuantityContainer>
              {Object.values(HiringFrontendTakeHomeToppingQuantity).map(
                (option, index) => {
                  const isActive = selectedMeats.some(
                    (selectedMeat) =>
                      selectedMeat.name === meat &&
                      selectedMeat.quantity === option
                  );
                  return (
                    <SelectionPill
                      key={`${option}-${index}`}
                      option={option}
                      active={isActive}
                      onClick={() => handleMeat(meat, option)}
                    >
                      <Text color={isActive ? "white" : "black"}>{option}</Text>
                    </SelectionPill>
                  );
                }
              )}
            </QuantityContainer>
          </Row>
        ))}
      </Dropdown>

      <Dropdown title="Veggies" className="dropdown">
        {veggies.map((veg, index) => (
          <Row key={`${veg}-${index}`}>
            <Text>{veg}</Text>
            <QuantityContainer>
              {Object.values(HiringFrontendTakeHomeToppingQuantity).map(
                (option, index) => {
                  const isActive = selectedVeggies.some(
                    (selectedVeg) =>
                      selectedVeg.name === veg &&
                      selectedVeg.quantity === option
                  );
                  return (
                    <SelectionPill
                      key={`${option}-${index}`}
                      option={option}
                      active={isActive}
                      onClick={() => handleVeggies(veg, option)}
                    >
                      <Text color={isActive ? "white" : "black"}>{option}</Text>
                    </SelectionPill>
                  );
                }
              )}
            </QuantityContainer>
          </Row>
        ))}
      </Dropdown>

      <AddToCartButton onClick={() => handleAddToCart()}>
        <Text color="white">Add to Order</Text>
      </AddToCartButton>
    </Container>
  );
};

export default PizzaForm;

const AddToCartButton = styled(Button)`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const SelectionContainer = styled.div`
  display: flex;
  gap: 20px;
  margin: 2rem 0;
`;

const Container = styled.div`
  position: relative;
  height: 100%;

  .price {
    margin-top: 0.5rem;
  }

  .description {
    margin-top: 0.5rem;
  }

  .dropdown {
    margin-top: 1rem;
  }

  & > *:last-of-type {
    margin-bottom: 1rem;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .quantity {
    margin: 0 1rem;
  }
`;

const RoundContainer = styled.div`
  height: 36px;
  width: 36px;
  border-radius: 50%;
  border: 1px solid #d9d9d9;
  font-size: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: 6px 10px 16px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
