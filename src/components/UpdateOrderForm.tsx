import { useEffect, useState } from "react";
import styled from "styled-components";
import Text from "./Text";
import SelectionPill from "./SelectionPill";
import {
  HiringFrontendTakeHomeOrderResponse,
  HiringFrontendTakeHomeOrderStatus,
} from "../types";
import { handleUpdateStatus } from "../services/updateOrder";

// const BASE = import.meta.env.VITE_BASE_URL;

interface UpdateOrderFormProp {
  order: HiringFrontendTakeHomeOrderResponse | null;
}
const UpdateOrderForm: React.FC<UpdateOrderFormProp> = ({ order }) => {
  const [currentOrderItem, setCurrentOrderItem] =
    useState<HiringFrontendTakeHomeOrderResponse | null>(null);

  const { creditCardNumber, customer, items, paymentMethod } =
    currentOrderItem || {};

  const updateStatus = async (
    status: HiringFrontendTakeHomeOrderStatus,
    orderId: string
  ) => {
    if (!currentOrderItem || status == currentOrderItem.status) return;
    const order = await handleUpdateStatus(status, orderId);
    if (order) setCurrentOrderItem(order);
  };

  const { street, city, state, zipCode } = customer?.deliveryAddress || {};
  const lastFourCC = creditCardNumber?.slice(-4);

  useEffect(() => {
    if (!order) return;
    setCurrentOrderItem(order);
  }, [order]);

  if (!currentOrderItem) return null;
  return (
    <Container>
      <Text font="poppins" weight="bold" size="12px">
        ORDER: #{currentOrderItem.id}
      </Text>
      <UserDetails>
        <div>
          <Text type="div" font="poppins" size="14px">
            {customer?.firstName} {customer?.lastName}
          </Text>
          {currentOrderItem.type == "delivery" && customer?.deliveryAddress ? (
            <>
              <Text type="div">{street}</Text>
              <Text type="div">
                {city}, {state}, {zipCode}
              </Text>
            </>
          ) : null}
        </div>

        <div>
          <Text font="poppins" size="14px">
            {paymentMethod == "credit_card"
              ? `Payment: Card Ending in ${lastFourCC}`
              : `Will pay in Cash`}
          </Text>
        </div>
      </UserDetails>

      <Text font="poppins" size="20px" weight="bold">
        Status
      </Text>
      <StatusContainer>
        {Object.values(HiringFrontendTakeHomeOrderStatus).map((status) => {
          return (
            <SelectionPill
              key={`status_${status}`}
              active={status == currentOrderItem.status}
              option={status}
              onClick={() => updateStatus(status, currentOrderItem.id)}
            >
              <Text
                font="poppins"
                size="16px"
                weight="bold"
                color={status == currentOrderItem.status ? "white" : "black"}
              >
                {status}
              </Text>
            </SelectionPill>
          );
        })}
      </StatusContainer>

      <ItemsContainer>
        {items?.length &&
          items?.map(({ id, pizza }) => (
            <PizzaItem key={id}>
              <IngredientsList>
                <Text font="gothic" size="20px">
                  {pizza.name}
                </Text>
                <Text size="16px" font="gothic">
                  Quantity:{" "}
                  <Text size="16px" font="poppins">
                    1
                  </Text>
                </Text>

                <Text size="16px" font="gothic">
                  Size:{" "}
                  <Text size="16px" font="poppins">
                    {pizza.size}
                  </Text>
                </Text>
                <Text size="16px" font="gothic">
                  Cheese:{" "}
                  <Text size="16px" font="poppins">
                    Extra
                  </Text>
                </Text>
                <Text size="16px" font="gothic">
                  Sauce:{" "}
                  <Text size="16px" font="poppins">
                    Tomato
                  </Text>
                </Text>
              </IngredientsList>
            </PizzaItem>
          ))}
      </ItemsContainer>
    </Container>
  );
};

export default UpdateOrderForm;

const Container = styled.div``;

const UserDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
`;

const StatusContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 1rem;
`;

const ItemsContainer = styled.div``;

const PizzaItem = styled.div`
  display: flex;
  gap: 20px;
  padding: 1rem;
`;

const IngredientsList = styled.div`
  display: flex;
  flex-direction: column;
`;
