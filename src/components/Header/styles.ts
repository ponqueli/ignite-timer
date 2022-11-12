import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 3rem;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      width: 3rem;
      height: 3rem;
      border-radius: 8px;

      display: flex;
      justify-content: center;
      align-items: center;

      color: ${({ theme }) => theme["gray-100"]};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      transition: all 0.3s;

      &:hover {
        border-bottom: 3px solid ${({ theme }) => theme["green-500"]};
      }

      &.active {
        color: ${({ theme }) => theme["green-500"]};
      }
    }
  }
`;
