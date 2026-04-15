import { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    productName: "",
    price: "",
    stock: "",
    category: "",
  });

  const [errors, setErrors] = useState({
    productName: "",
    price: "",
    stock: "",
    category: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ FIXED validate function
  const validate = () => {
    const nextErrors = {
      productName: "",
      price: "",
      stock: "",
      category: "",
    };

    if (!formValues.productName.trim()) {
      nextErrors.productName = "Product Name is required";
    }
    if (!formValues.price.trim()) {
      nextErrors.price = "Price is required";
    }
    if (!formValues.stock.trim()) {
      nextErrors.stock = "Stock is required";
    }
    if (!formValues.category.trim()) {
      nextErrors.category = "Category is required";
    }

    setErrors(nextErrors);
    return Object.values(nextErrors).every((value) => value === "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) return;

    const newProduct = {
      name: formValues.productName,
      price: Number(formValues.price),
      stock: Number(formValues.stock),
      category: formValues.category,
    };

    console.log("New Product:", newProduct);

    // TODO: add to product list state

    navigate("/");

    setFormValues({
      productName: "",
      price: "",
      stock: "",
      category: "",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        p: 2,
      }}
    >
      <Paper sx={{ p: 3, width: "100%", maxWidth: 520 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Shopping List 🛒
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Product Name"
              name="productName"
              value={formValues.productName}
              onChange={handleChange}
              error={Boolean(errors.productName)}
              helperText={errors.productName}
              fullWidth
            />

            <TextField
              label="Price"
              name="price"
              value={formValues.price}
              onChange={handleChange}
              error={Boolean(errors.price)}
              helperText={errors.price}
              fullWidth
            />

            <TextField
              label="Stock"
              name="stock"
              value={formValues.stock}
              onChange={handleChange}
              error={Boolean(errors.stock)}
              helperText={errors.stock}
              fullWidth
            />

            <TextField
              label="Category"
              name="category"
              value={formValues.category}
              onChange={handleChange}
              error={Boolean(errors.category)}
              helperText={errors.category}
              fullWidth
            />

            <Button type="submit" variant="contained" size="large">
              Submit
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate("/register")}
            >
              Register Product
            </Button>

            <Button
              variant="outlined"
              color="secondary"
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