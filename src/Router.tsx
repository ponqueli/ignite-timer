import { Routes, Route } from "react-router-dom";
import { History } from "./pages/History";
import { Home } from "./pages/Home";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
}
