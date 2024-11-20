import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import Text from "../components/Text";
import { Link } from "react-router-dom";

const ImageUrl =
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <ImageContainer>
          <img src={ImageUrl} />
          <BannerOverlay>
            <Text type="div" color="white" size="40px" weight="bold">
              Welcome to the Johnny's Pizza
            </Text>

            <StyledLink to="/menu">
              <Text weight="bold" color="white">
                Start An Order
              </Text>
            </StyledLink>
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
  height: 78vh;
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
`;

const StyledLink = styled(Link)`
  border: 1px solid red;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  background: red;
  text-decoration: none;
`;
