import { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Register({ products, setProducts }) {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    productName: "",
    price: "",
    stock: "",
    category: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formValues.productName.trim())
      nextErrors.productName = "Required";

    if (!formValues.price.trim())
      nextErrors.price = "Required";

    if (!formValues.stock.trim())
      nextErrors.stock = "Required";

    if (!formValues.category.trim())
      nextErrors.category = "Required";

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const newProduct = {
      name: formValues.productName,
      price: Number(formValues.price),
      stock: Number(formValues.stock),
      category: formValues.category,
    };

    setProducts((prev) => [...prev, newProduct]);

    navigate("/");

    setFormValues({
      productName: "",
      price: "",
      stock: "",
      category: "",
    });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Paper sx={{ p: 3, width: 400 }}>
        <Typography variant="h5" align="center">
          Register Product
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2} mt={2}>
            <TextField
              label="Product Name"
              name="productName"
              value={formValues.productName}
              onChange={handleChange}
              error={!!errors.productName}
              helperText={errors.productName}
            />

            <TextField
              label="Price"
              name="price"
              value={formValues.price}
              onChange={handleChange}
              error={!!errors.price}
              helperText={errors.price}
            />

            <TextField
              label="Stock"
              name="stock"
              value={formValues.stock}
              onChange={handleChange}
              error={!!errors.stock}
              helperText={errors.stock}
            />

            <TextField
              label="Category"
              name="category"
              value={formValues.category}
              onChange={handleChange}
              error={!!errors.category}
              helperText={errors.category}
            />

            <Button type="submit" variant="contained">
              Register
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}