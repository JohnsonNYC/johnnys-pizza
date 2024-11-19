import React from "react";
import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return <AddToCartButton onClick={onClick}>{children}</AddToCartButton>;
};

export default Button;

const AddToCartButton = styled.button`
  border: 1px solid #ff0000;
  background: #ff0000;
  border-radius: 10px;
  padding: 1rem;
  width: 100%;
  cursor: pointer;
`;
