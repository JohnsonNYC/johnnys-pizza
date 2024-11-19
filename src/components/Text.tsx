import styled from "styled-components";

interface TextProps {
  size?: string;
  color?: string;
  weight?: string;
  font?: string;
  type?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
}

const fontFamilyStore: { [key: string]: string } = {
  poppins: '"Poppins", sans-serif',
  gothic: '"Dela Gothic One", serif',
  caveat: '"Caveat", sans-serif',
};

const Text = ({
  size = "16px",
  color = "#000",
  weight = "normal",
  font = "poppins",
  className = "",
  type: Component = "span",
  children,
}: TextProps) => {
  return (
    <StyledText
      as={Component}
      $size={size}
      $color={color}
      $weight={weight}
      $font={font}
      className={className}
    >
      {children}
    </StyledText>
  );
};

export default Text;

const StyledText = styled.span<{
  $size?: string;
  $color?: string;
  $weight?: string;
  $font?: string;
}>`
  font-size: ${({ $size }) => $size};
  color: ${({ $color }) => $color};
  font-weight: ${({ $weight }) => $weight};
  font-family: ${({ $font }) =>
    fontFamilyStore[$font?.toLowerCase() || "poppins"]};
`;
