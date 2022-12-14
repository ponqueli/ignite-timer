import styled from "styled-components";

export const HistoryContainer = styled.main`
  height: calc(100% - 3rem);
  padding: 2.5rem;

  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme["gray-100"]};
    min-height: 1.5rem;
  }
`;

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    thead {
      position: sticky;
      top: 0;
    }

    th {
      background-color: ${({ theme }) => theme["gray-600"]};
      padding: 1rem;
      text-align: left;
      color: ${({ theme }) => theme["gray-100"]};
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-right: 1.5rem;
      }
      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${({ theme }) => theme["gray-700"]};
      border-top: 4px solid ${({ theme }) => theme["gray-800"]};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        width: 45%;
        padding-right: 1.5rem;
      }
      &:last-child {
        padding-right: 1.5rem;
      }

      button {   
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: transparent;
        border: 0;
        color: ${({ theme }) => theme["gray-100"]};
        font-size: 0.875rem;
        line-height: 1.6;
        transition: color 0.2s;
        
        &:hover {
          color: ${({ theme }) => theme["red-500"]};

          svg {
            stroke: ${({ theme }) => theme["red-500"]};

          }
        }
      }

    }
  }
`;

const STATUS_COLORS = {
  green: "green-500",
  red: "red-500",
  yellow: "yellow-500",
} as const;

interface IStatusProps {
  statusColor: keyof typeof STATUS_COLORS;
}

export const Status = styled.span<IStatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: ${({ theme, statusColor }) =>
    theme[STATUS_COLORS[statusColor]]};
`;
