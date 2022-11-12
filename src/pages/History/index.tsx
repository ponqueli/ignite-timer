import { HistoryContainer, HistoryList } from "./styles";

export function History() {
  return (
    <HistoryContainer>
      <h1> Meuhistórico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Estudar</td>
              <td>1h</td>
              <td>Há 2 meses</td>
              <td>Concluído</td>
            </tr>
            <tr>
              <td>Estudar</td>
              <td>1h</td>
              <td>Há 2 meses</td>
              <td>Em andamento</td>
            </tr>
            <tr>
              <td>Estudar</td>
              <td>1h</td>
              <td>Há 2 meses</td>
              <td>Interrompido</td>
            </tr>
            <tr>
              <td>Estudar</td>
              <td>1h</td>
              <td>Há 2 meses</td>
              <td>Interrompido</td>
            </tr>
            <tr>
              <td>Estudar</td>
              <td>1h</td>
              <td>Há 2 meses</td>
              <td>Interrompido</td>
            </tr>
            <tr>
              <td>Estudar</td>
              <td>1h</td>
              <td>Há 2 meses</td>
              <td>Interrompido</td>
            </tr>
            <tr>
              <td>Estudar</td>
              <td>1h</td>
              <td>Há 2 meses</td>
              <td>Interrompido</td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
