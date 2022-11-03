import styled from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";

interface IButtonContainerProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: "#007bff",
  secondary: "#6c757d",
  danger: "#dc3545",
  success: "#28a745",
};

export const ButtonContainer = styled.button<IButtonContainerProps>`
  width: 100px;
  height: 50px;
  border-radius: 8px;
  font-size: 1rem;
  margin: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  background-color: ${({ variant }) => buttonVariants[variant]};
`;
