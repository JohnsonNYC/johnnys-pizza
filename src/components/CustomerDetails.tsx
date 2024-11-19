import React, { useContext } from "react";
import Text from "./Text";
import styled from "styled-components";
import { PaymentContext } from "../context/PaymentContext";
import {
  HiringFrontendTakeHomePaymentMethod,
  // HiringFrontendTakeHomeOrderRequest,
} from "../types";

interface CustomerDetailsProps {
  paymentMethod: HiringFrontendTakeHomePaymentMethod;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  setPaymentMethod: (method: HiringFrontendTakeHomePaymentMethod) => void;
  setCardNumber: (value: string) => void;
  setExpirationDate: (value: string) => void;
  setCvv: (value: string) => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  paymentMethod,
  cardNumber,
  expirationDate,
  cvv,
  setPaymentMethod,
  setCardNumber,
  setExpirationDate,
  setCvv,
}) => {
  const paymentContext = useContext(PaymentContext);
  const { order, user, updateUserDetails } = paymentContext || {};

  const updateUser = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (!updateUserDetails) return;
    const value = e.target.value;

    if (
      key == "street" ||
      key == "city" ||
      key == "state" ||
      key == "zipCode"
    ) {
      const addressCopy = {
        street: user?.deliveryAddress?.street || "",
        city: user?.deliveryAddress?.city || "",
        state: user?.deliveryAddress?.state || "",
        zipCode: user?.deliveryAddress?.zipCode || "",
        [key]: value,
      };

      updateUserDetails({ deliveryAddress: addressCopy });
      return;
    }

    updateUserDetails({ [key]: value });
  };

  return (
    <Container>
      <Text font="gothic" size="40px">
        Checkout
      </Text>
      <Text font="gothic" size="24px">
        Contact
      </Text>

      <InputContainer
        placeholder="Phone Number"
        value={user?.phoneNumber}
        onChange={(e) => updateUser(e, "phoneNumber")}
      />
      <InputContainer
        placeholder="Email Address for Receipt"
        value={user?.email}
        onChange={(e) => updateUser(e, "email")}
      />

      <HalfWidthContainer>
        <InputContainer
          placeholder="First Name"
          value={user?.firstName}
          onChange={(e) => updateUser(e, "firstName")}
        />
        <InputContainer
          placeholder="Last Name"
          value={user?.lastName}
          onChange={(e) => updateUser(e, "lastName")}
        />
      </HalfWidthContainer>

      <Text font="gothic" size="24px">
        Payment
      </Text>

      <HalfWidthContainer>
        <PaymentTile
          $active={paymentMethod == HiringFrontendTakeHomePaymentMethod.Cash}
          onClick={() =>
            setPaymentMethod(HiringFrontendTakeHomePaymentMethod.Cash)
          }
        >
          <Text
            weight="bold"
            color={
              paymentMethod == HiringFrontendTakeHomePaymentMethod.Cash
                ? "white"
                : "black"
            }
          >
            Cash
          </Text>
        </PaymentTile>
        <PaymentTile
          onClick={() =>
            setPaymentMethod(HiringFrontendTakeHomePaymentMethod.CreditCard)
          }
          $active={
            paymentMethod == HiringFrontendTakeHomePaymentMethod.CreditCard
          }
        >
          <Text
            weight="bold"
            color={
              paymentMethod == HiringFrontendTakeHomePaymentMethod.CreditCard
                ? "white"
                : "black"
            }
          >
            Card
          </Text>
        </PaymentTile>
      </HalfWidthContainer>

      {paymentMethod == HiringFrontendTakeHomePaymentMethod.CreditCard ? (
        <>
          <InputContainer
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <HalfWidthContainer>
            <InputContainer
              placeholder="Expiration Date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
            <InputContainer
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </HalfWidthContainer>
        </>
      ) : null}

      {order?.method === "delivery" ? (
        <>
          <Text font="gothic" size="24px">
            Delivery Address
          </Text>

          <HalfWidthContainer>
            <InputContainer
              placeholder="Street"
              value={user?.deliveryAddress?.street}
              onChange={(e) => updateUser(e, "street")}
            />
            <InputContainer
              placeholder="City"
              value={user?.deliveryAddress?.city}
              onChange={(e) => updateUser(e, "city")}
            />
          </HalfWidthContainer>

          <HalfWidthContainer>
            <InputContainer
              placeholder="State"
              value={user?.deliveryAddress?.state}
              onChange={(e) => updateUser(e, "state")}
            />
            <InputContainer
              placeholder="Zip Code"
              value={user?.deliveryAddress?.zipCode}
              onChange={(e) => updateUser(e, "zipCode")}
            />
          </HalfWidthContainer>
        </>
      ) : null}
    </Container>
  );
};

export default CustomerDetails;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const InputContainer = styled.input`
  border: 1px solid black;
  border-radius: 10px;
  height: 60px;
  padding: 0 1rem;
  size: 16px;
  margin-bottom: 1rem;
`;

interface PaymentTileProps {
  $active: boolean;
}

const PaymentTile = styled.div<PaymentTileProps>`
  border-radius: 10px;
  height: 60px;
  padding: 0 1rem;
  size: 16px;
  margin-bottom: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background: ${({ $active }) => ($active ? "#8EB69B" : "white")};
  border: 1px solid ${({ $active }) => ($active ? "#8EB69B" : "black")};
`;
const HalfWidthContainer = styled.div`
  display: flex;
  gap: 20px;

  & > input {
    width: 100%;
  }
`;
