import React, { useContext } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { ShoppingCart, ChevronLeft } from "lucide-react";

import Text from "./Text";
import { CartContext } from "../context/CartContext";

const Header: React.FC = () => {
  const cartContext = useContext(CartContext);
  const { cart } = cartContext;

  const inCartPage = location.pathname.includes("/cart");
  const inPaymentPage = location.pathname.includes("/payments");

  return (
    <HeaderContainer>
      {inCartPage ? (
        <Link to="/menu">
          <NavContainer>
            <ChevronLeft color="#ff0000" />
            <Text>Back to Shopping</Text>
          </NavContainer>
        </Link>
      ) : inPaymentPage ? (
        <Link to="/cart">
          <NavContainer>
            <ChevronLeft color="#ff0000" />
            <Text>Back to Cart</Text>
          </NavContainer>
        </Link>
      ) : null}

      <MainText>
        <Text font="gothic" size="32px" weight="400">
          Johnny's
        </Text>
        <Text font="caveat" size="32px" weight="400" color="#ff0000">
          Pizzeria
        </Text>
      </MainText>

      {inCartPage || inPaymentPage ? null : (
        <CartContainer>
          <Link to="/cart">
            {cart && cart.length ? (
              <Count>
                <Text color="white" size="12px" weight="bold">
                  {cart.length < 10 ? cart.length : "10+"}
                </Text>
              </Count>
            ) : null}
            <ShoppingCart id="cart-icon" />
          </Link>
        </CartContainer>
      )}

      {inCartPage ? null : (
        <ULContainer>
          <li>
            <Link to="/">
              <Text size="24px">Home</Text>
            </Link>
          </li>
          <li>
            <Link to="/menu">
              <Text size="24px">Menu</Text>
            </Link>
          </li>
          <li>
            <Link to="/tracker">
              <Text size="24px">Tracker</Text>
            </Link>
          </li>
        </ULContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;

const Count = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid red;
  border-radius: 50%;
  background: #ff0000;
  padding: 0.3rem;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 1rem;
  left: 1rem;
`;
const CartContainer = styled.div`
  position: absolute;
  right: 4rem;
  top: 2rem;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  left: 4rem;
  top: 2rem;
`;

const HeaderContainer = styled.header`
  position: relative;
`;
const MainText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ULContainer = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  border-bottom: 1px solid black;

  li {
    list-style-type: none;

    a {
      text-decoration: none;
    }
  }
`;
