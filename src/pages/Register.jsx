import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  InputAdornment
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Register({ products = [], setProducts }) {
  const navigate = useNavigate();

  //  form state (inputs sa user)
  const [formValues, setFormValues] = useState({
    productName: "",
    price: "",
    stock: "",
    category: "",
    status: "Pending",
  });

  //  error state
  const [errors, setErrors] = useState({});

  //  update input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  //  validation logic
  const validate = () => {
    const nextErrors = {};

    if (!formValues.productName.trim()) {
      nextErrors.productName = "Required";
    }

    if (!formValues.price.trim()) {
      nextErrors.price = "Required";
    }

    if (!formValues.stock.trim()) {
      nextErrors.stock = "Required";
    }

    if (!formValues.category.trim()) {
      nextErrors.category = "Required";
    }

    //  duplicate check (Pending only)
    const duplicate = products.find(
      (p) =>
        p.name.toLowerCase() === formValues.productName.toLowerCase() &&
        p.status === "Pending"
    );

    if (duplicate) {
      nextErrors.productName =
        "Product already exists with Pending status";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  //  submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    //  STRICT negative value protection
    if (Number(formValues.price) < 0 || Number(formValues.stock) < 0) {
      alert("Negative values are not allowed");
      return;
    }

    //  create product object
    const newProduct = {
      name: formValues.productName,
      price: Number(formValues.price),
      quantity: Number(formValues.stock),
      category: formValues.category,
      status: formValues.status,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    //  add to product list
    setProducts((prev) => [...prev, newProduct]);

    //  go back to home
    navigate("/");

    //  reset form
    setFormValues({
      productName: "",
      price: "",
      stock: "",
      category: "",
      status: "Pending",
    });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Paper sx={{ p: 3, width: 400 }}>

        {/*  title */}
        <Typography variant="h5" align="center" gutterBottom>
          Register Product
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>

            {/*  product name */}
            <TextField
              label="Product Name"
              name="productName"
              value={formValues.productName}
              onChange={handleChange}
              error={!!errors.productName}
              helperText={errors.productName}
              fullWidth
            />

            {/*  price with currency */}
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formValues.price}
              onChange={handleChange}
              error={!!errors.price}
              helperText={errors.price}
              fullWidth
              inputProps={{
                min: 0,
                style: { textAlign: "right" },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    $
                  </InputAdornment>
                ),
              }}
            />

            {/*  quantity */}
            <TextField
              label="Quantity"
              name="stock"
              type="number"
              value={formValues.stock}
              onChange={handleChange}
              error={!!errors.stock}
              helperText={errors.stock}
              fullWidth
              inputProps={{
                min: 0,
                style: { textAlign: "right" },
              }}
            />

            {/*  category */}
            <TextField
              select
              label="Category"
              name="category"
              value={formValues.category}
              onChange={handleChange}
              error={!!errors.category}
              helperText={errors.category}
              fullWidth
            >
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Drink">Drink</MenuItem>
              <MenuItem value="Daily Product">Daily Product</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </TextField>

            {/*  status */}
            <TextField
              select
              label="Status"
              name="status"
              value={formValues.status}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Bought">Bought</MenuItem>
            </TextField>

            {/*  register button */}
            <Button type="submit" variant="contained" fullWidth>
              Register
            </Button>

            {/*  cancel button */}
            <Button
              variant="outlined"
              fullWidth
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