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
  const navigate = useNavigate(); // pang navigate padulong Home page

  // state para sa form inputs
  const [formValues, setFormValues] = useState({
    productName: "",
    price: "",
    stock: "",
    category: "",
    status: "Pending",
  });

  // state para sa error messages
  const [errors, setErrors] = useState({});

  // update sa values kada type sa user
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // validation sa form
  const validate = () => {
    const nextErrors = {};

    // required field check
    if (!formValues.productName.trim())
      nextErrors.productName = "Required";

    if (!formValues.price.trim())
      nextErrors.price = "Required";

    if (!formValues.stock.trim())
      nextErrors.stock = "Required";

    if (!formValues.category.trim())
      nextErrors.category = "Required";

    // duplicate check (Pending ra ang bawal)
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

  // submit sa form
  const handleSubmit = (e) => {
    e.preventDefault();

    // kung naay error, stop
    if (!validate()) return;

    // bawal negative values (price ug quantity)
    if (Number(formValues.price) < 0 || Number(formValues.stock) < 0) {
      alert("Dili pwede negative values");
      return;
    }

    // himo bag-ong product object
    const newProduct = {
      name: formValues.productName,
      price: Number(formValues.price),
      quantity: Number(formValues.stock),
      category: formValues.category,
      status: formValues.status,
      createdAt: new Date().toISOString().slice(0, 10),
    };

    // i-add sa product list
    setProducts((prev) => [...prev, newProduct]);

    // balik sa Home page
    navigate("/");

    // reset form after submit
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

        {/* title sa page */}
        <Typography variant="h5" align="center" gutterBottom>
          Register Product
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>

            {/* product name input */}
            <TextField
              label="Product Name"
              name="productName"
              value={formValues.productName}
              onChange={handleChange}
              error={!!errors.productName}
              helperText={errors.productName}
              fullWidth
            />

            {/* price input with currency */}
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
                    ₱
                  </InputAdornment>
                ),
              }}
            />

            {/* quantity input (stock = quantity) */}
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

            {/* category dropdown */}
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

            {/* status dropdown */}
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

            {/* register button */}
            <Button type="submit" variant="contained" fullWidth>
              Register
            </Button>

            {/* cancel button */}
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