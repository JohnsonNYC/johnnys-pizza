import styled from "styled-components";
import Text from "./Text";

import { Pizza } from "../types";
import { Trash2 } from "lucide-react";

interface PizzaItemProp {
  index: number;
  item: Pizza;
  removeFromCart: (arg: number) => void;
  updateItemQuantity: (index: number, quantity: number) => void;
}

const PizzaTile = ({
  index,
  item,
  removeFromCart,
  updateItemQuantity,
}: PizzaItemProp) => {
  const { totalPrice, quantity } = item;

  const handleQuantity = (type: string) => {
    let newQuantity: number = quantity;
    if (type == "add") {
      newQuantity++;
    } else {
      if (newQuantity == 1) return;
      newQuantity--;
    }

    updateItemQuantity(index, newQuantity);
  };

  return (
    <PizzaItemContainer>
      <div>
        <Text color="32px" weight="bold" size="24px">
          {item.name}
        </Text>
        <Text size="14px">${totalPrice.toFixed(2)}</Text>

        <QuantityContainer>
          <RoundContainer onClick={() => handleQuantity("subtract")}>
            -
          </RoundContainer>
          <Text className="quantity">{quantity}</Text>
          <RoundContainer onClick={() => handleQuantity("add")}>
            +
          </RoundContainer>
        </QuantityContainer>
      </div>
      <div>
        <Text weight="bold">${(totalPrice * quantity).toFixed(2)}</Text>
        <Trash2 onClick={() => removeFromCart(index)} color="#FF0000" />
      </div>
    </PizzaItemContainer>
  );
};

export default PizzaTile;

const PizzaItemContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  border: 1px solid black;
  padding: 1rem;
  box-sizing: border-box;

  & > div {
    display: flex;
    flex-direction: column;

    &:last-of-type {
      margin-left: auto;
      padding: 0 1rem 0.5rem;

      svg {
        margin-top: auto;
        cursor: pointer;
      }
    }
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
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
