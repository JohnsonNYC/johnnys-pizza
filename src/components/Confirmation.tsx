import React, { useEffect } from "react";
import styled from "styled-components";
import Text from "./Text";
import PizzaRow from "./PizzaRow";
import JSConfetti from "js-confetti";
import { formatDate } from "date-fns";

import { HiringFrontendTakeHomeOrderResponse } from "../types";

interface ConfirmationProps {
  orderConfirmationData: HiringFrontendTakeHomeOrderResponse;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  orderConfirmationData,
}) => {
  const {
    id,
    creditCardNumber,
    customer,
    estimatedDeliveryTime,
    items,
    totalAmount,
    type,
  } = orderConfirmationData || {};

  const { deliveryAddress } = customer || {};
  const { street, city, state, zipCode } = deliveryAddress || {};

  const lastFour = creditCardNumber?.toString().slice(-4) || "0000";

  const formattedDeliveryTime = estimatedDeliveryTime
    ? formatDate(new Date(estimatedDeliveryTime * 1000), "MMM, do hh:mm a")
    : "We will call for updates";

  useEffect(() => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();

    setTimeout(() => {
      jsConfetti.clearCanvas();
    }, 3000);
  });

  if (!orderConfirmationData) return null;

  return (
    <Container>
      <div>
        <Text type="div" font="gothic" size="25px">
          Confirmation
        </Text>
        <Text weight="bold" type="div">
          Order Number:
        </Text>

        <Text size="14px">{id}</Text>

        <Text type="div" weight="bold">
          {" "}
          Estimated Arrival: {formattedDeliveryTime}{" "}
        </Text>

        {items?.length
          ? items.map(({ id, pizza }) => (
              <PizzaRow key={`pizza_${id}`} pizza={pizza} />
            ))
          : null}
      </div>

      <ConfirmationSummary>
        {type == "delivery" ? (
          <>
            <Text font="gothic">Delivery</Text>
            <Text type="div">{street}</Text>
            <Text type="div">
              {city}, {state}, {zipCode}
            </Text>
          </>
        ) : (
          <>
            <Text font="gothic">Pick Up</Text>
            <Text> 1234 Hipster Avenue, Brooklyn, NY</Text>
          </>
        )}

        <Text font="gothic">Order Summary </Text>
        <PurchaseBreakdown>
          <Text type="div" weight="bold">
            Order Total
          </Text>
          <Text type="div">${totalAmount}</Text>
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
