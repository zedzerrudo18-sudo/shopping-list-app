import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
  InputAdornment,
  Box,
  Typography,
} from '@mui/material';
import { validateProduct, CATEGORIES, STATUS_OPTIONS } from '../utils/validation';

export default function ProductFormDialog({
  open,
  onClose,
  onSubmit,
  initialData = null,
  existingProducts = [],
}) {
  const [formValues, setFormValues] = useState({
    productName: '',
    price: '',
    quantity: '',
    category: '',
    status: 'Pending',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with existing data or reset
  useEffect(() => {
    if (initialData) {
      setFormValues({
        productName: initialData.productName || '',
        price: initialData.price || '',
        quantity: initialData.quantity || '',
        category: initialData.category || '',
        status: initialData.status || 'Pending',
      });
    } else {
      setFormValues({
        productName: '',
        price: '',
        quantity: '',
        category: '',
        status: 'Pending',
      });
    }
    setErrors({});
  }, [open, initialData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Convert prices to numbers for validation
    const validationData = {
      ...formValues,
      price: formValues.price,
      quantity: formValues.quantity,
    };

    const newErrors = validateProduct(
      validationData,
      existingProducts,
      initialData?.id
    );

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    // Prepare product object
    const product = {
      ...formValues,
      price: Number(formValues.price),
      quantity: Number(formValues.quantity),
      createdAt: initialData?.createdAt || new Date().toISOString().split('T')[0],
    };

    onSubmit(product);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, fontSize: '1.3rem' }}>
        {initialData ? '✏️ Edit Product' : '➕ Add New Product'}
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={2.5}>
          {/* Product Name */}
          <TextField
            fullWidth
            label="Product Name"
            name="productName"
            value={formValues.productName}
            onChange={handleChange}
            error={!!errors.productName}
            helperText={errors.productName}
            placeholder="Enter product name"
            variant="outlined"
          />

          {/* Price */}
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formValues.price}
            onChange={(e) => {
              const value = e.target.value;

              // 🚫 block negative input
              if (value < 0) return;

              handleChange(e);
            }}
            error={!!errors.price}
            helperText={errors.price}
            disabled={isSubmitting}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
                inputProps: {
                  min: 0,   // 🔥 extra protection
                  style: { textAlign: "right" },
                },
              },
            }}
          />

          {/* Quantity */}
          <TextField
            fullWidth
            label="Quantity"
            name="quantity"
            type="number"
            value={formValues.quantity}
            onChange={(e) => {
              const value = e.target.value;

              // 🚫 block negative input
              if (value < 0) return;

              handleChange(e);
            }}
            error={!!errors.quantity}
            helperText={errors.quantity}
            disabled={isSubmitting}
            variant="outlined"
            slotProps={{
              htmlInput: {
                step: 1,
                min: 0,
                style: { textAlign: "right" }
              }
            }}
          />

          {/* Category */}
          <TextField
            fullWidth
            select
            label="Category"
            name="category"
            value={formValues.category}
            onChange={handleChange}
            error={!!errors.category}
            helperText={errors.category}
            variant="outlined"
          >
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          {/* Status */}
          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            value={formValues.status}
            onChange={handleChange}
            error={!!errors.status}
            helperText={errors.status}
            variant="outlined"
          >
            {STATUS_OPTIONS.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </TextField>

          {/* Display total value */}
          {formValues.price && formValues.quantity && (
            <Box
              sx={{
                p: 2,
                bgcolor: 'rgba(99, 102, 241, 0.1)',
                borderLeft: '4px solid #6366f1',
                borderRadius: '4px',
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Total Value:
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#6366f1' }}>
                ${(Number(formValues.price) * Number(formValues.quantity)).toFixed(2)}
              </Typography>
            </Box>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Add Product'}
        </Button>
      </DialogActions>
    </Dialog>
  ); 
}
