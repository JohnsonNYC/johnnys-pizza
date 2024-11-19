import { createContext, useState, ReactNode } from "react";
import { Customer, HiringFrontendTakeHomeOrderType } from "../types";

interface OrderState {
  method: HiringFrontendTakeHomeOrderType;
  tip: 15 | 20 | 25;
  estimatedTax: number;
}

interface PaymentContextProps {
  order: OrderState;
  user: Customer;
  updateOrderDetails: (details: Partial<OrderState>) => void;
  updateUserDetails: (details: Partial<Customer>) => void;
}

const defaultOrderState: OrderState = {
  method: HiringFrontendTakeHomeOrderType.Pickup,
  tip: 15,
  estimatedTax: 0,
};

const defaultUserState: Customer = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  deliveryAddress: {
    street: "",
    city: "",
    state: "",
    zipCode: "",
  },
};

export const PaymentContext = createContext<PaymentContextProps | undefined>(
  undefined
);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<OrderState>(defaultOrderState);
  const [user, setUser] = useState<Customer>(defaultUserState);

  console.log({ order, user });

  const updateUserDetails = (details: Partial<Customer>) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...details,
    }));
  };
  const updateOrderDetails = (details: Partial<OrderState>) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      ...details,
    }));
  };

  return (
    <PaymentContext.Provider
      value={{ order, user, updateOrderDetails, updateUserDetails }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
