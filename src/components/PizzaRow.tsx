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
      <div>
        <Text size="20px" font="poppins" weight="semibold">
          {pizza.name}
        </Text>
        <div>
          <Text type="div">Quantity: {pizza.quantity}</Text>
          <div>
            {pizza?.toppings?.map((item) => (
              <Text key={`${item.name}-${item.quantity}`} type="div">
                {item.name} - {item.quantity}
              </Text>
            ))}
          </div>
        </div>
      </div>

      <div>
        <Text size="16px" font="poppins" type="div">
          ${pizza.totalPrice.toFixed(2)}
        </Text>

        {pizza?.toppingExclusions ? (
          <>
            <Text color="red">Exclusions</Text>
            {pizza.toppingExclusions.map((item) => (
              <Text key={`${item}`} type="div">
                {item}
              </Text>
            ))}
          </>
        ) : null}
      </div>
    </Container>
  );
};

export default PizzaRow;

const Container = styled.div`
  background: #d9d9d9;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
`;
