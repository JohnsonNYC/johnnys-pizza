import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Text from "../components/Text";
import Modal from "../components/Modal";
import UpdateOrderForm from "../components/UpdateOrderForm";

import styled from "styled-components";
import { Pencil } from "lucide-react";

const Tracker = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Header />
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
            <TableRow>
              <td>
                <Text font="poppins">#12345</Text>
              </td>
              <td>
                <Text font="poppins">2023-10-01</Text>
              </td>
              <td>
                <Text font="poppins">Shipped</Text>
              </td>
              <td>
                <Text font="poppins">3</Text>
              </td>
              <td>
                <Text font="poppins">$50.00</Text>
              </td>
              <td>
                <Button onClick={() => setIsModalOpen(true)}>
                  <Pencil />
                </Button>
              </td>
            </TableRow>
            <TableRow>
              <td>
                <Text font="poppins">#12345</Text>
              </td>
              <td>
                <Text font="poppins">2023-10-01</Text>
              </td>
              <td>
                <Text font="poppins">Shipped</Text>
              </td>
              <td>
                <Text font="poppins">3</Text>
              </td>
              <td>
                <Text font="poppins">$50.00</Text>
              </td>
              <td>
                <Button onClick={() => setIsModalOpen(true)}>
                  <Pencil />
                </Button>
              </td>
            </TableRow>
            <TableRow>
              <td>
                <Text font="poppins">#12345</Text>
              </td>
              <td>
                <Text font="poppins">2023-10-01</Text>
              </td>
              <td>
                <Text font="poppins">Shipped</Text>
              </td>
              <td>
                <Text font="poppins">3</Text>
              </td>
              <td>
                <Text font="poppins">$50.00</Text>
              </td>
              <td>
                <Button onClick={() => setIsModalOpen(true)}>
                  <Pencil />
                </Button>
              </td>
            </TableRow>
          </tbody>
        </Table>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          wrapperId="modal-root"
        >
          <UpdateOrderForm />
        </Modal>
      </main>
      <Footer />
    </>
  );
};

export default Tracker;

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
