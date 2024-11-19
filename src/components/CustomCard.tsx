import Text from "./Text";

import styled from "styled-components";

interface CardProps {
  handleClick: (arg: string) => void;
}

const CustomCard = ({ handleClick }: CardProps) => {
  return (
    <Container onClick={() => handleClick("custom")}>
      <Text font="gothic" size="20px">
        Build Your Own
      </Text>
      <Text>Pick your size, sauce, and toppings</Text>
    </Container>
  );
};

export default CustomCard;

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
