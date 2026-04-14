import { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
  });

  const categories = ["Food", "Drink", "Daily Product", "Electronics", "Others"];

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  function handleRegister() {
  if (!product.name || !product.price || !product.stock || !product.category) {
    alert("Please fill all fields");
    return;
  }

  const newProduct = {
    ...product,
    id: Date.now(),
  };

  setProducts([...products, newProduct]); // SAVE TO GLOBAL STATE

  navigate("/");
}

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom align="center">
        Register Product 📝
      </Typography>

      <Stack spacing={2}>
        <TextField
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Product Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Stock Quantity"
          name="stock"
          type="number"
          value={product.stock}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          select
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          fullWidth
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>

        <Button variant="contained" onClick={handleRegister}>
          Register
        </Button>

        <Button variant="outlined" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </Stack>
    </Box>
  );
}