import { useState, useContext } from "react";
import Text from "./Text";
import styled from "styled-components";

import Modal from "./Modal";
import Dropdown from "./Dropdown";
import Button from "./Button";
import Confirmation from "./Confirmation";
import PizzaRow from "./PizzaRow";

import { Pin } from "lucide-react";

import { CartContext } from "../context/CartContext";
import { PaymentContext } from "../context/PaymentContext";
import { HiringFrontendTakeHomeOrderType } from "../types";

interface OrderSummaryProps {
  cardNumber: string;
}

const OrderSummary = ({ cardNumber }: OrderSummaryProps) => {
  const [confirmationModal, setConfirmationModal] = useState(false);

  const paymentContext = useContext(PaymentContext);
  const { user, order } = paymentContext || {};

  const cartContext = useContext(CartContext);
  const { cart } = cartContext;

  const subTotal = cart.reduce(
    (acc, item) => acc + item.quantity * item.totalPrice,
    0
  );

  const submitPizzaOrder = () => {
    setConfirmationModal(true);
  };

  const estimatedTax = subTotal * 0.08875;
  const tipTotal = (order && subTotal * order.tip * 0.01) || 0;
  const orderTotal = subTotal + estimatedTax + tipTotal;

  return (
    <Container>
      {order?.method == "pickup" ? (
        <PickUpLocation>
          <Text font="gothic" color="24px">
            Pick Up At:
          </Text>

          <Text type="div" size="20px">
            <Pin />
            {"123 Hipster Ave, Brooklyn, NY, 12345"}
          </Text>
        </PickUpLocation>
      ) : null}

      <Dropdown title={`Order Summary (${cart.length})`}>
        {cart.map((pizza, index) => (
          <PizzaRow key={`pizza_${index}`} pizza={pizza} />
        ))}
      </Dropdown>

      <ItemizedContainer>
        <Text size="20px">Subtotal</Text>
        <Text size="20px">${subTotal.toFixed(2)}</Text>
      </ItemizedContainer>
      <ItemizedContainer>
        <Text size="20px">Estimate Taxes (Sales Tax)</Text>
        <Text size="20px">${estimatedTax.toFixed(2)}</Text>
      </ItemizedContainer>
      <ItemizedContainer>
        <Text size="20px">Tip (15%)</Text>
        <Text size="20px">${tipTotal.toFixed(2)}</Text>
      </ItemizedContainer>
      <ItemizedContainer>
        <Text size="20px" weight="bold">
          Subtotal
        </Text>
        <Text size="20px" weight="bold">
          ${orderTotal.toFixed(2)}
        </Text>
      </ItemizedContainer>

      <Button onClick={submitPizzaOrder}>
        <Text color="white" font="poppins" size="20px" weight="bold">
          Place Order ${orderTotal.toFixed(2)}
        </Text>
      </Button>

      <Modal
        isOpen={confirmationModal}
        onClose={() => setConfirmationModal(false)}
        wrapperId="modal-root"
      >
        <Confirmation
          items={cart}
          deliveryAddress={user?.deliveryAddress}
          orderMethod={order?.method as HiringFrontendTakeHomeOrderType}
          orderTotal={orderTotal}
          subTotal={subTotal}
          estimatedTax={estimatedTax}
          tipTotal={tipTotal}
          cardNumber={cardNumber}
        />
      </Modal>
    </Container>
  );
};

export default OrderSummary;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  button {
    margin-top: 4rem;
  }
`;

const PickUpLocation = styled.div`
  margin-bottom: 1rem;

  & > div:last-of-type {
    display: flex;
    align-items: center;
    svg {
      margin-right: 0.5rem;
    }
  }
`;

const ItemizedContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
