import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnalysesPage from "./pages/Analyse";
import MedecinInfo from "./pages/Medecin_info";
import MedicamentPage from "./pages/Medicament";
import DynamicPage from "./pages/dynamic_route";
import Home from "./pages/Home";
import './index.css'
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <NextUIProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyse" element={<AnalysesPage />} />
        <Route path="/MedecinInfo" element={<MedecinInfo />} />
        <Route path="/Medicaments" element={<MedicamentPage />} />
        <Route path="/:id" element={<DynamicPage />} />
      </Routes>
    </BrowserRouter>
  </NextUIProvider>
);
