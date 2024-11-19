import React from "react";
import styled from "styled-components";

const FooterText = styled.p`
  margin: 0;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterText> 2024 Tech Assessment for Sparrow Team</FooterText>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  padding: 20px;
  text-align: center;
  color: black;
  bottom: 0;
`;
