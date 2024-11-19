import React, { useState } from "react";
import Text from "./Text";
import styled from "styled-components";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface DropdownProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ children, title, className }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <LabelContainer onClick={handleToggle} className={className}>
        <Text font="gothic" size="16px">
          {title}
        </Text>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown />
        </motion.div>
      </LabelContainer>

      <OptionsContainer
        initial={{ height: "0" }}
        animate={{
          height: isOpen ? "auto" : "0",
          padding: isOpen ? "1rem 0" : "0",
        }}
      >
        {children}
      </OptionsContainer>
    </>
  );
};

export default Dropdown;

const LabelContainer = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  align-items: end;
  justify-content: space-between;
  cursor: pointer;
`;

const OptionsContainer = styled(motion.div)`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  overflow: hidden;
`;
