import styled from "styled-components";
import Text from "./Text";
import SelectionPill from "./SelectionPill";

const UpdateOrderForm = () => {
  return (
    <Container>
      <Text font="poppins" size="20px" weight="bold">
        ORDER: #1234
      </Text>
      <UserDetails>
        <div>
          <Text type="div" font="poppins" size="14px">
            Johnson Kow
          </Text>
          <Text type="div" font="poppins" size="14px">
            8277 116th street, Richmond Hill, NY, 11418
          </Text>
        </div>

        <div>
          <Text font="poppins" size="14px">
            Payment: Card Ending in 1234 OR CASH
          </Text>
        </div>
      </UserDetails>

      <Text font="poppins" size="20px" weight="bold">
        Status
      </Text>
      <StatusContainer>
        <SelectionPill
          active={false}
          option={"received"}
          onClick={() => console.log("HELLO THERE")}
        >
          <Text font="poppins" size="16px" weight="bold">
            Order Receieved
          </Text>
        </SelectionPill>
      </StatusContainer>

      <ItemsContainer>
        <PizzaItem>
          <div
            style={{ border: "1px solid red", width: "100px", height: "100px" }}
          />
          <IngredientsList>
            <Text font="gothic" size="20px">
              Pizza Name
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
                Small
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
            <Text size="16px" font="gothic">
              Meat:{" "}
              <Text size="16px" font="poppins">
                Chicken,Parm
              </Text>
            </Text>
            <Text size="16px" font="gothic">
              Veggies:{" "}
              <Text size="16px" font="poppins">
                Mushroom, Onions, Jalapenos
              </Text>
            </Text>
          </IngredientsList>
        </PizzaItem>
        <PizzaItem>
          <div
            style={{ border: "1px solid red", width: "100px", height: "100px" }}
          />
          <IngredientsList>
            <Text font="gothic" size="20px">
              Pizza Name
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
                Small
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
            <Text size="16px" font="gothic">
              Meat:{" "}
              <Text size="16px" font="poppins">
                Chicken,Parm
              </Text>
            </Text>
            <Text size="16px" font="gothic">
              Veggies:{" "}
              <Text size="16px" font="poppins">
                Mushroom, Onions, Jalapenos
              </Text>
            </Text>
          </IngredientsList>
        </PizzaItem>
      </ItemsContainer>
    </Container>
  );
};

export default UpdateOrderForm;

const Container = styled.div``;

const UserDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const StatusContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 1rem;
`;

const ItemsContainer = styled.div`
  border: 1px solid red;
`;

const PizzaItem = styled.div`
  display: flex;
  gap: 20px;
  padding: 1rem;
`;

const IngredientsList = styled.div`
  display: flex;
  flex-direction: column;
`;
