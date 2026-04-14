import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";

export default function App() {
  const [products, setProducts] = useState([]);

  return (
    <Routes>
      <Route
        path="/"
        element={<Home products={products} />}
      />

      <Route
        path="/register"
        element={
          <Register
            products={products}
            setProducts={setProducts}
          />
        }
      />
    </Routes>
  );
}