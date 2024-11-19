import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import Text from "../components/Text";
import Button from "../components/Button";

const BASE = import.meta.env.VITE_BASE_URL;
console.log({ BASE });

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <ImageContainer>
          <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          <BannerOverlay>
            <Text type="div" color="white" size="40px" weight="bold">
              Welcome to the Johnny's Pizza
            </Text>
            <Button>
              <Text weight="bold" color="white">
                Start An Order
              </Text>
            </Button>
          </BannerOverlay>
        </ImageContainer>
      </main>
      <Footer />
    </>
  );
};

export default Home;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BannerOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > button {
    width: fit-content;
  }
`;
