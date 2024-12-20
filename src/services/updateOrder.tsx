import { HiringFrontendTakeHomeOrderStatus } from "../types";

const BASE = import.meta.env.VITE_KEY;

export const handleUpdateStatus = async (
  status: HiringFrontendTakeHomeOrderStatus,
  orderId: string
) => {
  try {
    const response = await fetch(`${BASE}/pizza/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.order;
  } catch (error) {
    console.log("HTTP ERROR: ", error);
  }
};
