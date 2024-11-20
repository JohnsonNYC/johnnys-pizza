import { useState, useEffect, useContext } from "react";
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
import {
  HiringFrontendTakeHomeOrderType,
  HiringFrontendTakeHomeOrderRequest,
  HiringFrontendTakeHomePaymentMethod,
  HiringFrontendTakeHomeOrderResponse,
} from "../types";

import { fixNumber } from "../utils/numbers";

const BASE = import.meta.env.VITE_KEY;

interface OrderSummaryProps {
  cardNumber: string;
  paymentMethod: HiringFrontendTakeHomePaymentMethod;
}

const OrderSummary = ({ cardNumber, paymentMethod }: OrderSummaryProps) => {
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [orderConfirmationData, setOrderConfirmationData] =
    useState<HiringFrontendTakeHomeOrderResponse | null>(null);

  const paymentContext = useContext(PaymentContext);
  const { user, order } = paymentContext || {};

  const cartContext = useContext(CartContext);
  const { cart } = cartContext;

  const subTotal = cart.reduce((acc, item) => {
    const { pizza } = item;
    return acc + pizza.quantity * pizza.totalPrice;
  }, 0);

  const estimatedTax = subTotal * 0.08875;
  const tipTotal = (order && subTotal * order.tip * 0.01) || 0;
  const orderTotal = subTotal + estimatedTax + tipTotal;

  const submitPizzaOrder = async () => {
    const orderRequest: HiringFrontendTakeHomeOrderRequest = {
      locationId: "j-kow",
      items: cart,
      customer: {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
      },
      totalAmount: fixNumber(orderTotal, 2),
      creditCardNumber: cardNumber,
      paymentMethod: paymentMethod,
      type: order?.method as HiringFrontendTakeHomeOrderType,
    };

    if (order?.method === "delivery") {
      orderRequest.customer.deliveryAddress = {
        street: user?.deliveryAddress?.street || "",
        city: user?.deliveryAddress?.city || "",
        state: user?.deliveryAddress?.state || "",
        zipCode: user?.deliveryAddress?.zipCode || "",
      };
    }

    try {
      const response = await fetch(`${BASE}/pizza`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data) setOrderConfirmationData(data.order);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const isSubmitable = Boolean(
    user?.firstName.length &&
      user?.lastName.length &&
      user?.phoneNumber.length &&
      user?.email.length &&
      (paymentMethod === "cash" ||
        (paymentMethod === "credit_card" && cardNumber.length)) &&
      (order?.method == "pickup" ||
        (user?.deliveryAddress?.street.length &&
          user?.deliveryAddress?.city.length &&
          user?.deliveryAddress?.state.length &&
          user?.deliveryAddress?.zipCode.length))
  );

  useEffect(() => {
    if (orderConfirmationData) {
      setConfirmationModal(true);
    }
  }, [orderConfirmationData]);

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
        {cart.map(({ id, pizza }) => (
          <PizzaRow key={`pizza_${id}`} pizza={pizza} />
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

      <Button onClick={submitPizzaOrder} disabled={!isSubmitable}>
        <Text color="white" font="poppins" size="20px" weight="bold">
          Place Order ${orderTotal.toFixed(2)}
        </Text>
      </Button>

      <Modal
        isOpen={confirmationModal}
        onClose={() => setConfirmationModal(false)}
        wrapperId="modal-root"
      >
        {orderConfirmationData && (
          <Confirmation orderConfirmationData={orderConfirmationData} />
        )}
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
