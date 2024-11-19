import { useState } from "react";
import styled from "styled-components";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomerDetails from "../components/CustomerDetails";
import OrderSummary from "../components/OrderSummary";

import { HiringFrontendTakeHomePaymentMethod } from "../types";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState(
    HiringFrontendTakeHomePaymentMethod.CreditCard
  );

  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <>
      <Header />
      <Main>
        <CustomerDetails
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          expirationDate={expirationDate}
          setExpirationDate={setExpirationDate}
          cvv={cvv}
          setCvv={setCvv}
        />
        <OrderSummary cardNumber={cardNumber} />
      </Main>
      <Footer />
    </>
  );
};

export default Payment;

const Main = styled.div`
  display: flex;
  padding: 0 70px;

  & > div {
    width: 100%;
  }
`;
