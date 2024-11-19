import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { PaymentContext } from "../context/PaymentContext";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Text from "../components/Text";
import SelectionPill from "../components/SelectionPill";
import PizzaTile from "../components/PizzaTile";
import Button from "../components/Button";

import styled from "styled-components";

import { HiringFrontendTakeHomeOrderType } from "../types";

const Cart = () => {
  const cartContext = useContext(CartContext);
  const { cart, removeFromCart, updateItemQuantity } = cartContext || {};

  console.log({ cart });
  const paymentContext = useContext(PaymentContext);
  const { order, updateOrderDetails } = paymentContext || {};

  const subTotal = cart.reduce(
    (acc, item) => acc + item.quantity * item.totalPrice,
    0
  );

  const estimatedTax = subTotal * 0.08875;
  const tipTotal = (order && subTotal * order.tip * 0.01) || 0;
  const orderTotal = subTotal + estimatedTax + tipTotal;

  const isPickUp = Boolean(
    order && order.method === HiringFrontendTakeHomeOrderType.Pickup
  );

  const handleOrderMethod = (method: HiringFrontendTakeHomeOrderType) => {
    if (updateOrderDetails) updateOrderDetails({ method });
  };

  return (
    <>
      <Header />
      <Main>
        {cart.length ? (
          <>
            <CartDetails>
              <Text font="gothic" size="40px">
                Your Cart
              </Text>
              {cart.map((item, index) => (
                <PizzaTile
                  key={`pizza_${index}`}
                  index={index}
                  item={item}
                  removeFromCart={removeFromCart}
                  updateItemQuantity={updateItemQuantity}
                />
              ))}
            </CartDetails>

            <CheckoutForm>
              <Text size="20px" weight="bold">
                HOW TO GET IT
              </Text>
              <ButtonContainer>
                <SelectionPill
                  active={isPickUp}
                  option={HiringFrontendTakeHomeOrderType.Pickup}
                  onClick={() =>
                    handleOrderMethod(HiringFrontendTakeHomeOrderType.Pickup)
                  }
                >
                  <Text color={isPickUp ? "white" : "black"}>Pick Up</Text>
                </SelectionPill>

                <SelectionPill
                  active={!isPickUp}
                  option={HiringFrontendTakeHomeOrderType.Delivery}
                  onClick={() =>
                    handleOrderMethod(HiringFrontendTakeHomeOrderType.Delivery)
                  }
                >
                  <Text color={isPickUp ? "black" : "white"}>Delivery</Text>
                </SelectionPill>
              </ButtonContainer>

              <Text>Add A Tip</Text>
              <ButtonContainer>
                <TipContainer
                  $isActive={order?.tip === 15}
                  onClick={() =>
                    updateOrderDetails && updateOrderDetails({ tip: 15 })
                  }
                >
                  <Text
                    size="24px"
                    weight="bold"
                    color={order?.tip === 15 ? "white" : "black"}
                  >
                    15%
                  </Text>
                  <Text
                    size="16px"
                    weight="medium"
                    color={order?.tip === 15 ? "white" : "black"}
                  >
                    ${(subTotal * 0.15).toFixed(2)}
                  </Text>
                </TipContainer>

                <TipContainer
                  $isActive={order?.tip === 20}
                  onClick={() =>
                    updateOrderDetails && updateOrderDetails({ tip: 20 })
                  }
                >
                  <Text
                    size="24px"
                    weight="bold"
                    color={order?.tip === 20 ? "white" : "black"}
                  >
                    20%
                  </Text>
                  <Text
                    size="16px"
                    weight="medium"
                    color={order?.tip === 20 ? "white" : "black"}
                  >
                    $5.70
                  </Text>
                </TipContainer>

                <TipContainer
                  $isActive={order?.tip === 25}
                  onClick={() =>
                    updateOrderDetails && updateOrderDetails({ tip: 25 })
                  }
                >
                  <Text
                    size="24px"
                    weight="bold"
                    color={order?.tip === 25 ? "white" : "black"}
                  >
                    25%
                  </Text>
                  <Text
                    size="16px"
                    weight="medium"
                    color={order?.tip === 25 ? "white" : "black"}
                  >
                    $5.70
                  </Text>
                </TipContainer>
              </ButtonContainer>

              <DueContainer>
                <Text size="20px">Subtotal</Text>
                <Text size="20px">${subTotal.toFixed(2)}</Text>
              </DueContainer>
              <DueContainer>
                <Text size="20px">Estimate Taxes (Sales Tax)</Text>
                <Text size="20px">${estimatedTax.toFixed(2)}</Text>
              </DueContainer>
              <DueContainer>
                <Text size="20px">Tip (15%)</Text>
                <Text size="20px">${tipTotal.toFixed(2)}</Text>
              </DueContainer>
              <DueContainer>
                <Text size="20px" weight="bold">
                  Subtotal
                </Text>
                <Text size="20px" weight="bold">
                  ${orderTotal.toFixed(2)}
                </Text>
              </DueContainer>

              <Link to="/payments">
                <Button>
                  <Text weight="bold" color="white">
                    Continue to Payment
                  </Text>
                </Button>
              </Link>
            </CheckoutForm>
          </>
        ) : (
          <Text size="40px">Your Cart is Empty! </Text>
        )}
      </Main>
      <Footer />
    </>
  );
};

export default Cart;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const Main = styled.main`
  display: flex;
  padding: 20px 70px;
  width: 100%;
  gap: 20px;
  box-sizing: border-box;
`;

const CartDetails = styled.div`
  width: 100%;

  & > div {
    margin-bottom: 2rem;
  }
`;

const CheckoutForm = styled.div`
  width: 100%;
  padding: 1rem;
  border: 1px solid black;
`;

const TipContainer = styled.div<{
  $isActive: boolean;
}>`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 20px;
  background: ${({ $isActive }) => ($isActive ? "red" : "#e2e2e2")};
  margin-bottom: 2rem;
  cursor: pointer;
`;

const DueContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
