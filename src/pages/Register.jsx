import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Register({ products = [], setProducts }) {
  const navigate = useNavigate(); // pang navigation padulong Home

  //   state para sa form inputs
  const [formValues, setFormValues] = useState({
    productName: "",
    price: "",
    stock: "",
    category: "",
    status: "Pending",
  });

  //   state para sa errors
  const [errors, setErrors] = useState({});

  //  update sa input kada type sa user
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  //  validation sa tanang fields + duplicate check based on status
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

    //  duplicate product name validation
    //  prevent duplicate only if existing product has "Pending" status
    //  allow duplicate if existing product has "Bought" status
    if (formValues.productName.trim()) {
      const duplicateProduct = products.find(
        (p) =>
          p.name.toLowerCase() === formValues.productName.toLowerCase() &&
          p.status === "Pending"
      );

      if (duplicateProduct) {
        nextErrors.productName =
          "Product name already exists with Pending status";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  //  submit sa form
  const handleSubmit = (e) => {
    e.preventDefault();

  //  validate form, if naay error, di mo proceed
    if (!validate()) return;

  //pahimo og bag-ong product object gikan sa form values
    const newProduct = {
      name: formValues.productName,
      price: Number(formValues.price),
      stock: Number(formValues.stock),
      category: formValues.category,
      status: formValues.status,
      createdTime: new Date().toLocaleDateString(),
    };

    //  idugang sa produuct list(state sa App.jsx)
    setProducts((prev) => [...prev, newProduct]);

    //  balik sa home page
    navigate("/");

    //  reset sa form inputs
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
        
        {/*  Title */}
        <Typography variant="h5" align="center" gutterBottom>
          Register Product
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            
            {/*  ngalan sa product */}
            <TextField
              label="Product Name"
              name="productName"
              value={formValues.productName}
              onChange={handleChange}
              error={!!errors.productName}
              helperText={errors.productName}
              fullWidth
            />

            {/*  presyo */}
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formValues.price}
              onChange={handleChange}
              error={!!errors.price}
              helperText={errors.price}
              fullWidth
            />

            {/*  stock /quantity*/}
            <TextField
              label="Stock"
              name="stock"
              type="number"
              value={formValues.stock}
              onChange={handleChange}
              error={!!errors.stock}
              helperText={errors.stock}
              fullWidth
            />

            {/*  category (dropdown REQUIRED sa task) */}
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
              <MenuItem value="Daily Product">Fruit</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </TextField>

            {/*  status dropdown */}
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