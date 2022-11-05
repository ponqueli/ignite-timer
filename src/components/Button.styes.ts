import styled from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";

interface IButtonContainerProps {
  variant: ButtonVariant;
}

export const ButtonContainer = styled.button<IButtonContainerProps>`
  width: 100px;
  height: 50px;
  border-radius: 8px;
  font-size: 1rem;
  margin: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  background-color: ${({ theme }) => theme["green-500"]};
`;
