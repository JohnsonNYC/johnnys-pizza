import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Text from "../components/Text";
import Modal from "../components/Modal";
import UpdateOrderForm from "../components/UpdateOrderForm";

import styled from "styled-components";
import { Pencil } from "lucide-react";
import { HiringFrontendTakeHomeOrderResponse } from "../types";
import { formatDate } from "date-fns";

const BASE = import.meta.env.VITE_KEY;

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [orders, setOrders] = useState<HiringFrontendTakeHomeOrderResponse[]>(
    []
  );
  const [selectedOrder, setSelectedOrder] =
    useState<HiringFrontendTakeHomeOrderResponse | null>(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BASE}/pizzas?locationId=j-kow`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOrders(data.orders as HiringFrontendTakeHomeOrderResponse[]);
    } catch (error) {
      console.log("Error: ", error);
      setOrders([]);
    }
  };

  const handleEditOrder = (order: HiringFrontendTakeHomeOrderResponse) => {
    setSelectedOrder(order);
  };

  useEffect(() => {
    if (selectedOrder) setIsModalOpen(true);
    else setIsModalOpen(false);
  }, [selectedOrder]);

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!orders) return <Text>Looks like there aren't any orders right now</Text>;
  return (
    <>
      <Header />
      <main>
        <main>
          <Table>
            <thead>
              <TableRowMain>
                <th>
                  <Text font="gothic" size="16px">
                    Order Number
                  </Text>
                </th>
                <th>
                  <Text font="gothic">Order Date</Text>
                </th>
                <th>
                  <Text font="gothic">Status</Text>
                </th>
                <th>
                  <Text font="gothic">Items</Text>
                </th>
                <th>
                  <Text font="gothic">Total Amount</Text>
                </th>
                <th></th>
              </TableRowMain>
            </thead>
            <tbody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <td>
                    <Text font="poppins">#{order.id}</Text>
                  </td>
                  <td>
                    <Text font="poppins">
                      {formatDate(new Date(order.createdAt * 1000), "LLL do")}{" "}
                      at{" "}
                      {formatDate(
                        new Date(order.createdAt * 1000),
                        "hh:mm aaaa"
                      )}
                    </Text>
                  </td>
                  <td>
                    <Text font="poppins">{order.status}</Text>
                  </td>
                  <td>
                    <Text font="poppins">{order.items.length}</Text>
                  </td>
                  <td>
                    <Text font="poppins">${order.totalAmount.toFixed(2)}</Text>
                  </td>
                  <td>
                    <Button onClick={() => handleEditOrder(order)}>
                      <Pencil />
                    </Button>
                  </td>
                </TableRow>
              ))}
            </tbody>
          </Table>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setSelectedOrder(null)}
            wrapperId="modal-root"
          >
            <UpdateOrderForm order={selectedOrder} fetchOrders={fetchOrders} />
          </Modal>
        </main>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;

const Table = styled.table`
  border: 1px solid black;
  width: 100%;
  border-radius: 10px;

  td {
    text-align: center;
  }
`;

const TableRowMain = styled.tr`
  background: #c4c4c4;
`;
const TableRow = styled.tr`
  &:hover {
    background: #ededed;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    svg {
      path {
        stroke: green;
      }
    }
  }
`;
