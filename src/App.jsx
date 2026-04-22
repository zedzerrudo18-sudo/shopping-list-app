import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ProductProvider } from "./context/ProductContext";

export default function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}