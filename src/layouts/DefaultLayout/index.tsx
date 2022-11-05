import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import { LayoutContainer } from "./styles";

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      {/* OUTLET = espaço para ser inserido um conteudo */}
      <Outlet />
    </LayoutContainer>
  );
}
