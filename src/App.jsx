import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";

export default function App() {
  const [products, setProducts] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/register" element={<Register setProducts={setProducts} />} />
      </Routes>
    </BrowserRouter>
  );
}