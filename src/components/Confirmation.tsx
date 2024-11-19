import React, { useEffect } from "react";
import styled from "styled-components";
import Text from "./Text";
import PizzaRow from "./PizzaRow";
import JSConfetti from "js-confetti";
import { Pizza, HiringFrontendTakeHomeOrderType } from "../types";

interface ConfirmationProps {
  items: Pizza[];
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  orderMethod: HiringFrontendTakeHomeOrderType;
  orderTotal: number;
  subTotal: number;
  estimatedTax: number;
  tipTotal: number;
  cardNumber: string;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  items,
  deliveryAddress,
  orderTotal,
  orderMethod,
  subTotal,
  estimatedTax,
  tipTotal,
  cardNumber,
}) => {
  const { street, city, state, zipCode } = deliveryAddress || {};

  useEffect(() => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();

    setTimeout(() => {
      jsConfetti.clearCanvas();
    }, 3000);
  });

  const lastFour = cardNumber.toString().slice(-4);

  return (
    <Container>
      <div>
        <Text type="div" font="gothic" size="25px">
          Confirmation
        </Text>
        <Text>Order Number: 123456789</Text>

        {items.map((pizza, index) => (
          <PizzaRow key={`pizza_${index}`} pizza={pizza} />
        ))}
      </div>

      <ConfirmationSummary>
        <Text font="gothic">
          {orderMethod === "delivery" ? "Deliver To" : "Pick Up At"}
        </Text>

        {orderMethod == "delivery" && street && city && state && zipCode ? (
          <>
            <Text type="div">{street}</Text>
            <Text type="div">
              {city}, {state}, {zipCode}
            </Text>
          </>
        ) : (
          <Text> 1234 Hipster Avenue, Brooklyn, NY</Text>
        )}

        <Text font="gothic">Order Summary </Text>
        <PurchaseBreakdown>
          <Text type="div">Subtotal</Text>
          <Text type="div">${subTotal.toFixed(2)}</Text>
        </PurchaseBreakdown>
        <PurchaseBreakdown>
          <Text type="div">Sales Tax</Text>
          <Text type="div">${estimatedTax.toFixed(2)}</Text>
        </PurchaseBreakdown>
        <PurchaseBreakdown>
          <Text type="div">Tip</Text>
          <Text type="div">${tipTotal.toFixed(2)}</Text>
        </PurchaseBreakdown>
        <PurchaseBreakdown>
          <Text type="div" weight="bold">
            Order Total
          </Text>
          <Text type="div">${orderTotal.toFixed(2)}</Text>
        </PurchaseBreakdown>

        <Text font="gothic">Payment Method</Text>
        <Text type="div">Card Ending In: {lastFour}</Text>
      </ConfirmationSummary>
    </Container>
  );
};

export default Confirmation;

const Container = styled.div`
  display: flex;
  gap: 20px;

  & > div {
    width: 100%;
  }
`;

const ConfirmationSummary = styled.div`
  span {
    display: block;
    margin-top: 1rem;
  }
`;

const PurchaseBreakdown = styled.div`
  display: flex;
  justify-content: space-between;
`;
