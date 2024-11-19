import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import Text from "../components/Text";

import {
  HiringFrontendTakeHomeOrderResponse,
  HiringFrontendTakeHomeOrderStatus,
} from "../types";
import { handleUpdateStatus } from "../services/updateOrder";

const BASE = import.meta.env.VITE_BASE_URL;

const Tracker = () => {
  const [orderNumberInput, setOrderNumberInput] = useState<string>("");
  const [foundOrder, setFoundOrder] =
    useState<HiringFrontendTakeHomeOrderResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { status, customer } = foundOrder || {};
  const { city, state, street, zipCode } = customer?.deliveryAddress || {};

  const searchForOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!orderNumberInput) return;

    try {
      const response = await fetch(`${BASE}/pizza?orderId=${orderNumberInput}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setFoundOrder(data.order);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const cancelOrder = async () => {
    if (!foundOrder) return;
    const order = await handleUpdateStatus(
      HiringFrontendTakeHomeOrderStatus.Cancelled,
      foundOrder.id
    );

    if (order) setFoundOrder(order);
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);

  return (
    <>
      <Header />
      <main>
        <Text font="gothic">Track Your Order</Text>

        <Form onSubmit={searchForOrder}>
          <input
            placeholder={"Please enter your order number"}
            onChange={(e) => setOrderNumberInput(e.target.value)}
          />
          <button>Search</button>
        </Form>
        {foundOrder ? (
          <>
            <Text font="gothic" size="20px">
              Order #: {foundOrder.id}
            </Text>
            <div>
              <div>
                {street && state && city && zipCode ? (
                  <Text weight="bold" type="div">
                    Delivering To:{" "}
                    <Text>
                      {" "}
                      {street}, {state}, {city}, {zipCode}
                    </Text>
                  </Text>
                ) : null}

                <Text weight="bold" type="div">
                  For:{" "}
                  <Text>
                    {customer?.firstName} {customer?.lastName}
                  </Text>
                </Text>
              </div>

              <div>
                <Text weight="bold" type="div">
                  Status:{" "}
                  <Text color={status == "cancelled" ? "red" : "black"}>
                    {status}
                  </Text>
                </Text>
              </div>
            </div>

            {status === "pending" ? (
              <CancelButton onClick={cancelOrder}>Cancel Order</CancelButton>
            ) : null}
          </>
        ) : null}
        {error ? (
          <Text color="red" type="div">
            {error}
          </Text>
        ) : null}
      </main>
      <Footer />
    </>
  );
};

export default Tracker;

const Form = styled.form`
  margin-bottom: 3rem;

  input {
    border: 1px solid black;
    border-radius: 10px;
    size: 16px;
    padding: 0.5rem 1rem;
  }

  button {
    background: black;
    border: 1px solid black;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    size: 16px;
    color: white;
  }
`;

const CancelButton = styled.button`
  border: 1px solid red;
  bord-radius: 5px;
  background: none;
  color: red;
  font-weight: bold;
  size: 20px;
  padding: 0.5rem 1rem;
  margin-top: 2rem;
  cursor: pointer;
`;
