import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import MonthComponent from "./pages/Home";
import DayComponent from "./pages/DayComponent";

import "./App.css";
import CalendarProvider from "./contexts/CalendarContext";
import { PrimeReactProvider } from "primereact/api";

function App() {
  return (
    <PrimeReactProvider>
      <CalendarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MonthComponent />} />
              <Route path="/day/:date" element={<DayComponent />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CalendarProvider>
    </PrimeReactProvider>
  );
}

export default App;
