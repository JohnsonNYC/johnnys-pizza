import { useState, useEffect, useMemo, useContext } from "react";
import styled from "styled-components";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Text from "../components/Text";
import Card from "../components/Card";
import CustomCard from "../components/CustomCard";
import Modal from "../components/Modal";
import PizzaForm from "../components/PizzaForm";
import SelectionPill from "../components/SelectionPill";
import { MenuDataContext } from "../context/MenuContext";

import { SpecialtyPizza } from "../types";
import { GetPizzaPricingResponse } from "../types/api";

import { getSpecialtyPizzas, getSpecialtyPricing } from "../services/pizzas";

const Menu = () => {
  const menuDataContext = useContext(MenuDataContext);
  const { menuData, setMenuData } = menuDataContext;

  const [menuLookUp, setMenuLookUp] = useState<{
    [key: string]: SpecialtyPizza;
  }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filterBy, setFilterBy] = useState<string>("all");
  const [selectedPizza, setSelectedPizza] = useState<SpecialtyPizza | null>(
    null
  );
  const [pricingInformation, setPricingInformation] =
    useState<GetPizzaPricingResponse>();

  const SPECIALTY_PIZZA = useMemo(() => {
    if (filterBy != "all") {
      return menuData.filter((pizza) => pizza.group === filterBy);
    }
    return menuData;
  }, [menuData, filterBy]);

  const filterPizzasByGroup = (group: string) => {
    if (filterBy === group) setFilterBy("all");
    else setFilterBy(group);
  };

  const openCard = (pizzaId: string): void => {
    if (pizzaId === "custom") {
      setSelectedPizza(null);
    } else {
      const foundPizza = menuData.find((el) => el.id == pizzaId);
      if (foundPizza) setSelectedPizza(foundPizza);
    }
    // setIsModalOpen(true);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as Element;
    const el = target.closest("[data-id]");

    if (!el) return;
    const pizzaId = el.getAttribute("data-id");
    if (!pizzaId) return;

    const foundPizza = menuLookUp[pizzaId];
    setSelectedPizza(foundPizza);
  };

  useEffect(() => {
    if (selectedPizza) setIsModalOpen(true);
    else setIsModalOpen(false);
  }, [selectedPizza]);

  useEffect(() => {
    if (menuData.length === 0) {
      getSpecialtyPizzas().then((pizzas) => {
        if (pizzas.length) {
          const pizzaMapStore: { [key: string]: SpecialtyPizza } = {};

          pizzas.forEach((pizza: SpecialtyPizza) => {
            pizzaMapStore[pizza.id] = pizza;
          });

          setMenuData(pizzas);
          setMenuLookUp(pizzaMapStore);
        } else console.log(pizzas);
      });
    }

    getSpecialtyPricing().then((pricing) => {
      setPricingInformation(pricing);
    });
  }, []);

  return (
    <>
      <Header />
      <Main>
        <Text className="pizza-title" font="gothic" size="36px">
          Custom Pie
        </Text>
        <Grid>
          <CustomCard handleClick={openCard} />
        </Grid>

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

        <Grid onClick={(e) => handleCardClick(e)}>
          {SPECIALTY_PIZZA.map((data) => (
            <Card key={`specialty-pizza-${data.id}`} data={data} />
          ))}
        </Grid>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setSelectedPizza(null)}
          wrapperId="modal-root"
        >
          <PizzaForm
            pizzaData={selectedPizza}
            pricingInformation={pricingInformation}
            closeModal={() => setSelectedPizza(null)}
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
