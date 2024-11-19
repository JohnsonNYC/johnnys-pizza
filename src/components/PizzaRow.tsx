import React from "react";
import styled from "styled-components";
import Text from "./Text";

import { Pizza } from "../types";

interface PizzaRowProp {
  pizza: Pizza;
}

const PizzaRow: React.FC<PizzaRowProp> = ({ pizza }) => {
  return (
    <Container>
      <div style={{ width: "80px", height: "80px", border: "2px solid red" }} />
      <div>
        <Text size="20px" font="poppins" weight="semibold">
          Pizza Name
        </Text>
        <Text type="div">Quantity: {pizza.quantity}</Text>
      </div>
      <Text size="16px" font="poppins">
        ${pizza.totalPrice.toFixed(2)}
      </Text>
    </Container>
  );
};

export default PizzaRow;

const Container = styled.div`
  background: #d9d9d9;
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 0.5rem 1rem;
  box-sizing: border-box;

  & > span:last-of-type {
    margin-left: auto;
  }
`;
