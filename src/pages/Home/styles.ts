import styled from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  color: ${({ theme }) => theme["gray-100"]};

  font-weight: bold;

  cursor: pointer;

  transition: background-color 0.2s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${({ theme }) => theme["green-500"]};

  &:not(:disabled):hover {
    background: ${({ theme }) => theme["green-700"]};
  }
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${({ theme }) => theme["red-500"]};

  &:not(:disabled):hover {
    background: ${({ theme }) => theme["red-700"]};
  }
`;
