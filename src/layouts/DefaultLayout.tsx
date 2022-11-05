import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export function DefaultLayout() {
  return (
    <>
      <Header />
      {/* OUTLET = espaço para ser inserido um conteudo */}
      <Outlet />
    </>
  );
}
