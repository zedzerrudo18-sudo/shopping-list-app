import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  InputAdornment,
  Card,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProducts } from '../hooks/useProductContext';
import {
  validateProduct,
  CATEGORIES,
  STATUS_OPTIONS,
  formatCurrency,
} from '../utils/validation';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { products, addProduct, updateProduct } = useProducts();

  const editingProduct = location.state?.product;
  const isEditMode = !!editingProduct;

  const [formValues, setFormValues] = useState({
    productName: editingProduct?.productName || '',
    price: editingProduct?.price || '',
    quantity: editingProduct?.quantity || '',
    category: editingProduct?.category || '',
    status: editingProduct?.status || 'Pending',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const totalValue =
    (Number(formValues.price) || 0) * (Number(formValues.quantity) || 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationData = {
      ...formValues,
      price: formValues.price,
      quantity: formValues.quantity,
    };

    const newErrors = validateProduct(
      validationData,
      isEditMode ? products.filter((p) => p.id !== editingProduct.id) : products,
      editingProduct?.id
    );

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    const product = {
      productName: formValues.productName,
      price: Number(formValues.price),
      quantity: Number(formValues.quantity),
      category: formValues.category,
      status: formValues.status,
      createdAt:
        editingProduct?.createdAt || new Date().toISOString().split('T')[0],
    };

    try {
      if (isEditMode) {
        updateProduct(editingProduct.id, product);
      } else {
        addProduct(product);
      }

      setSubmitSuccess(true);

      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setErrors({ submit: 'Failed to save product. Please try again.' });
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (submitSuccess) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Card
          sx={{
            p: 4,
            textAlign: 'center',
            maxWidth: 400,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: 80,
              color: '#10b981',
              mb: 2,
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            {isEditMode ? 'Product Updated!' : 'Product Added!'}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            {isEditMode
              ? 'Your product has been successfully updated.'
              : 'Your product has been successfully registered.'}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Redirecting to dashboard...
          </Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={handleCancel}
            sx={{
              color: 'white',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Back
          </Button>
        </Box>

        <Paper
          sx={{
            p: 4,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.98)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {isEditMode ? '✏️ Edit Product' : '➕ Register Product'}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            {isEditMode
              ? 'Update product information. Created date cannot be changed.'
              : 'Add a new product to your inventory.'}
          </Typography>

          {errors.submit && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errors.submit}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
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
                disabled={isSubmitting}
                autoFocus
              />

              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formValues.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
                placeholder="0.00"
                inputProps={{
                  step: '0.01',
                  min: '0',
                  style: { textAlign: 'right' },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                disabled={isSubmitting}
                variant="outlined"
              />

              <TextField
                fullWidth
                label="Quantity"
                name="quantity"
                type="number"
                value={formValues.quantity}
                onChange={handleChange}
                error={!!errors.quantity}
                helperText={errors.quantity}
                placeholder="0"
                inputProps={{
                  step: '1',
                  min: '0',
                  style: { textAlign: 'right' },
                }}
                disabled={isSubmitting}
                variant="outlined"
              />

              <TextField
                fullWidth
                select
                label="Category"
                name="category"
                value={formValues.category}
                onChange={handleChange}
                error={!!errors.category}
                helperText={errors.category}
                disabled={isSubmitting}
                variant="outlined"
              >
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={formValues.status}
                onChange={handleChange}
                error={!!errors.status}
                helperText={errors.status}
                disabled={isSubmitting}
                variant="outlined"
              >
                {STATUS_OPTIONS.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>

              {isEditMode && editingProduct?.createdAt && (
                <Box
                  sx={{
                    p: 2,
                    bgcolor: 'rgba(99, 102, 241, 0.1)',
                    borderLeft: '4px solid #6366f1',
                    borderRadius: '4px',
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    Created Date (Not Editable)
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 600, color: '#667eea' }}
                  >
                    {editingProduct.createdAt}
                  </Typography>
                </Box>
              )}

              {formValues.price && formValues.quantity && (
                <Box
                  sx={{
                    p: 2.5,
                    bgcolor: 'rgba(16, 185, 129, 0.1)',
                    borderLeft: '4px solid #10b981',
                    borderRadius: '4px',
                  }}
                >
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                    Total Value
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: '#10b981' }}
                  >
                    {formatCurrency(totalValue)}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {formValues.quantity} × {formatCurrency(formValues.price)}
                  </Typography>
                </Box>
              )}

              <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  sx={{
                    textTransform: 'none',
                    fontSize: '1rem',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  startIcon={
                    isSubmitting ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <SaveIcon />
                    )
                  }
                  sx={{
                    background:
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    textTransform: 'none',
                    fontSize: '1rem',
                  }}
                >
                  {isSubmitting
                    ? 'Saving...'
                    : isEditMode
                    ? 'Update Product'
                    : 'Register Product'}
                </Button>
              </Stack>
            </Stack>
          </Box>

          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: '1px solid #e5e7eb',
              fontSize: '0.875rem',
              color: '#6b7280',
            }}
          >
            <Typography variant="caption" display="block" sx={{ mb: 1 }}>
              <strong>Deduplication Rule:</strong> You cannot add a product with
              the same name if it already has "Pending" status. Complete or
              delete it first.
            </Typography>
            {isEditMode && (
              <Typography variant="caption" display="block">
                <strong>Note:</strong> Created date is automatically set and
                cannot be modified.
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
