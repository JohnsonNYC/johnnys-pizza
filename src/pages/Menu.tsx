import { useState, useEffect, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Text from "../components/Text";
import Card from "../components/Card";
import CustomCard from "../components/CustomCard";
import Modal from "../components/Modal";
import PizzaForm from "../components/PizzaForm";
import SelectionPill from "../components/SelectionPill";

import styled from "styled-components";
import { SpecialtyPizza } from "../types";

import { GetPizzaPricingResponse } from "../types/api";

const BASE = import.meta.env.VITE_BASE_URL;

const Menu = () => {
  const [specialtyPizzas, setSpecialtyPizzas] = useState<SpecialtyPizza[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filterBy, setFilterBy] = useState<string>("all");
  const [selectedPizza, setSelectedPizza] = useState<SpecialtyPizza | null>(
    null
  );
  const [pricingInformation, setPricingInformation] =
    useState<GetPizzaPricingResponse>();

  const SPECIALTY_PIZZA = useMemo(() => {
    if (filterBy != "all") {
      return specialtyPizzas.filter((pizza) => pizza.group === filterBy);
    }
    return specialtyPizzas;
  }, [specialtyPizzas, filterBy]);

  const filterPizzasByGroup = (group: string) => {
    if (filterBy === group) setFilterBy("all");
    else setFilterBy(group);
  };

  const openCard = (pizzaId: string): void => {
    if (pizzaId === "custom") {
      setSelectedPizza(null);
    } else {
      const foundPizza = specialtyPizzas.find((el) => el.id == pizzaId);
      if (foundPizza) setSelectedPizza(foundPizza);
    }
    setIsModalOpen(true);
  };

  const getSpecialtyPizzas = async () => {
    const url = BASE + "/specialty-pizzas";

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.specialtyPizzas) setSpecialtyPizzas(data.specialtyPizzas);
    } catch (error) {
      console.error("Error fetching specialty pizzas:", error);
    }
  };

  const getSpecialtyPricing = async () => {
    const url = BASE + "/pizza-pricing";

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPricingInformation(data);
    } catch (error) {
      console.error("Error fetching specialty pizzas:", error);
    }
  };

  useEffect(() => {
    if (specialtyPizzas.length === 0) {
      getSpecialtyPizzas();
      getSpecialtyPricing();
    }
  }, []);

  return (
    <>
      <Header />
      <Main>
        <Text className="pizza-title" font="gothic" size="36px">
          Specialty Pies
        </Text>

        <TabsContainer>
          {["meat lovers", "veggie lovers", "new recipes", "classics"].map(
            (group) => (
              <SelectionPill
                key={group}
                active={filterBy === group}
                onClick={() => filterPizzasByGroup(group)}
              >
                <Text color={filterBy === group ? "white" : "black"}>
                  {group}
                </Text>
              </SelectionPill>
            )
          )}
        </TabsContainer>
        <Grid>
          {SPECIALTY_PIZZA.map((data) => (
            <Card
              key={`specialty-pizza-${data.id}`}
              data={data}
              handleClick={openCard}
            />
          ))}
        </Grid>

        <Text className="pizza-title" font="gothic" size="36px">
          Custom Pie
        </Text>
        <Grid>
          <CustomCard handleClick={openCard} />
        </Grid>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(!isModalOpen)}
          wrapperId="modal-root"
        >
          <PizzaForm
            pizzaData={selectedPizza}
            pricingInformation={pricingInformation}
            closeModal={() => setIsModalOpen(false)}
          />
        </Modal>
      </Main>
      <Footer />
    </>
  );
};

export default Menu;

const Main = styled.main``;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 1rem 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
