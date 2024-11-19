import React from "react";
import styled from "styled-components";

interface SelectionPillProps<T> {
  children: React.ReactNode;
  active: boolean;
  option?: T;
  onClick: (arg?: T) => void;
}

const SelectionPill = <T,>({
  children,
  active,
  option,
  onClick,
}: SelectionPillProps<T>) => {
  return (
    <Container
      onClick={() => onClick(option)}
      active={active ? active : undefined}
    >
      {children}
    </Container>
  );
};

export default SelectionPill;

interface StyledProps {
  active?: boolean;
}

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<StyledProps>`
  border: 1px solid black;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  width: fit-content;
  cursor: pointer;

  ${({ active }) =>
    active
      ? `
        background: black;
        border:1px solid white;
      `
      : `
        background: white;
        border: 1px solid black;
      `}
`;
