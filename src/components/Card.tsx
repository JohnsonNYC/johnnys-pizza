import Text from "./Text";
import { SpecialtyPizza } from "../types";

import styled from "styled-components";

interface CardProps {
  data: SpecialtyPizza;
  handleClick: (arg0: string) => void;
}

const Card = ({ data, handleClick }: CardProps) => {
  const { id, name, description, price } = data;

  return (
    <Container onClick={() => handleClick(id)}>
      <Text font="gothic" size="20px">
        {name || "Build Your Own"}
      </Text>
      <Text>{description || "Pick your size, sauce, and toppings"}</Text>
      {price ? <Text>${price.medium}</Text> : null}
    </Container>
  );
};

export default Card;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 10px;
  padding: 1rem;

  cursor: pointer;
  &:hover {
    box-shadow: 6px 10px 16px rgba(0, 0, 0, 0.2);
  }
`;
