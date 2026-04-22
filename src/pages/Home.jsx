import { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProductContext';
import { formatCurrency, formatDate } from '../utils/validation';
import { MenuItem } from '@mui/material';
import ProductFormDialog from '../components/ProductFormDialog';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Container,
  Stack,
  Card,
  Grid,
  Snackbar,
} from '@mui/material';

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Search as SearchIcon,
  Inventory2 as Inventory2Icon,
  Payments as PaymentsIcon,
} from '@mui/icons-material';


export default function Home() {
  const { products, addProduct, updateProduct, deleteProduct, getStats } = useProducts();

  // UI State
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('productName');

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [openDialog, setOpenDialog] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // ================= FILTER =================
  const filteredProducts = useMemo(() => {
  const q = searchQuery.trim().toLowerCase();

  if (!q && !searchCategory && !searchStatus) return products;

  return products.filter((p) => {
    const name = p.productName?.toLowerCase() || '';

    const matchName = q ? name.includes(q) : true;

    const matchCategory = searchCategory
      ? p.category?.toLowerCase() === searchCategory.toLowerCase()
      : true;

    const matchStatus = searchStatus
      ? p.status?.toLowerCase() === searchStatus.toLowerCase()
      : true;

    return matchName && matchCategory && matchStatus;
  });
}, [products, searchQuery, searchCategory, searchStatus]);

  // ================= SORT =================
  const sortedProducts = useMemo(() => {
    if (!filteredProducts.length) return [];

    const sorted = [...filteredProducts];

    return sorted.sort((a, b) => {
      const aValue = a[sortBy] ?? '';
      const bValue = b[sortBy] ?? '';

      if (sortBy === 'price' || sortBy === 'quantity') {
        return sortOrder === 'asc'
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }

      return sortOrder === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [filteredProducts, sortBy, sortOrder]);

  const stats = useMemo(() => getStats(), [products]);
  // 👇 ADD DEBUG HERE (STEP 1)
console.log("products:", products);
console.log("searchQuery:", searchQuery);
console.log("filtered:", filteredProducts);
console.log("sorted:", sortedProducts);


  // ================= HANDLERS =================
  const handleSortClick = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleAddProduct = () => {
    setEditProduct(null);
    setOpenDialog(true);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setOpenDialog(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedProduct) return;

    deleteProduct(selectedProduct.id);
    setOpenDeleteDialog(false);
    setSelectedProduct(null);

    setSnackbarMessage('Product deleted successfully');
    setSnackbarOpen(true);
  };

  const handleClearSearch = () => {
  setSearchInput('');
  setSearchQuery('');
  setSearchCategory('');
  setSearchStatus('');
};

  const getStatusBadge = (status) => {
    const isBought = status === 'Bought';

    return (
      <Chip
        icon={isBought ? <CheckCircleIcon /> : <ScheduleIcon />}
        label={status}
        size="small"
        sx={{
          fontWeight: 500,
          textTransform: 'capitalize',
          backgroundColor:
            status === 'Bought'
              ? '#dbeafe'
              : status === 'Pending'
              ? '#ffedd5'
              : '#e5e7eb',

          color:
            status === 'Bought'
              ? '#1d4ed8'
              : status === 'Pending'
              ? '#c2410c'
              : '#374151',
        }}
      />
    );
  };

  const handleSearch = () => {
    setSearchQuery(searchInput.trim());
    setSearchDialogOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="lg">

        {/* HEADER */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'white' }}>
            🛒 Product Tracker
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
            Manage your products efficiently
          </Typography>
        </Box>

        {/* STATS */}
        <Grid container spacing={2} sx={{ mb: 4 }}>

        {/* Total Products */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #e0f2fe, #f8fafc)',
              transition: '0.2s',
              '&:hover': { transform: 'translateY(-3px)' },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Inventory2Icon sx={{ color: '#0284c7' }} />
              <Typography fontWeight={700}>
                {stats.totalProducts}
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              Total Products
            </Typography>
          </Card>
        </Grid>

        {/* Total Value */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ecfdf5, #f0fdf4)',
              transition: '0.2s',
              '&:hover': { transform: 'translateY(-3px)' },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <PaymentsIcon sx={{ color: '#16a34a' }} />
              <Typography fontWeight={700}>
                {formatCurrency(stats.totalValue)}
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              Total Value
            </Typography>
          </Card>
        </Grid>

        {/* Pending */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
              transition: '0.2s',
              '&:hover': { transform: 'translateY(-3px)' },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <ScheduleIcon sx={{ color: '#f97316' }} />
              <Typography fontWeight={700}>
                {stats.pendingCount}
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              Pending
            </Typography>
          </Card>
        </Grid>

        {/* Completed */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
              transition: '0.2s',
              '&:hover': { transform: 'translateY(-3px)' },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <CheckCircleIcon sx={{ color: '#2563eb' }} />
              <Typography fontWeight={700}>
                {stats.boughtCount}
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              Completed
            </Typography>
          </Card>
        </Grid>

      </Grid>

        {/* MAIN CARD */}
        <Paper sx={{ p: 3, borderRadius: 2 }}>

          {/* SEARCH BUTTON */}
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ mb: 2, gap: 1 }}
          >
            <Button
              startIcon={<SearchIcon />}
              variant="contained"
              onClick={() => setSearchDialogOpen(true)}
            >
              Search
            </Button>

            <Button
                onClick={handleClearSearch}
                variant="outlined"
                disabled={!searchInput && !searchCategory && !searchStatus}
              >
                Clear
              </Button>
          </Stack>

          {/* SEARCH DIALOG */}
            <Dialog
              open={searchDialogOpen}
              onClose={() => setSearchDialogOpen(false)}
            >
              <DialogTitle>Search Products</DialogTitle>

              <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>

                  <TextField
                    label="Product Name"
                    fullWidth
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />

                  <TextField
                    select
                    label="Category"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Daily Product">Daily Product</MenuItem>
                    <MenuItem value="Electronics">Electronics</MenuItem>
                  </TextField>

                  <TextField
                    select
                    label="Status"
                    value={searchStatus}
                    onChange={(e) => setSearchStatus(e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Bought">Bought</MenuItem>
                  </TextField>

                </Stack>
              </DialogContent>

              <DialogActions>
                <Button onClick={() => setSearchDialogOpen(false)}>
                  Cancel
                </Button>

                <Button onClick={handleSearch} variant="contained">
                  Search
                </Button>
              </DialogActions>
            </Dialog>

          {/* TABLE */}
          {sortedProducts.length === 0 ? (
            <Typography sx={{ textAlign: 'center', py: 5, fontWeight: 600 }}>
              🔍No products found
            </Typography>
          ) : (
            <TableContainer
              sx={{
                maxHeight: 420,
                overflowY: 'auto',
              }}
            >
              <Table stickyHeader>

                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                    <TableCell sx={{ fontWeight: 700 }}>
                      <TableSortLabel
                        active={sortBy === 'productName'}
                        onClick={() => handleSortClick('productName')}
                      >
                        Product Name
                      </TableSortLabel>
                    </TableCell>

                    <TableCell align="right" sx={{ fontWeight: 700 }}>Price</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>Quantity</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>Status</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>Date</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {sortedProducts.map((p, index) => (
                    <TableRow
                      key={p.id}
                      hover
                      sx={{
                        backgroundColor: index % 2 === 0 ? '#fff' : '#f8fafc',
                        '&:hover': {
                          backgroundColor: '#f1f5f9',
                        },
                      }}
                    >
                      <TableCell>{p.productName}</TableCell>
                      <TableCell align="right">{formatCurrency(p.price)}</TableCell>
                      <TableCell align="right">{p.quantity}</TableCell>
                      <TableCell>{p.category}</TableCell>
                      <TableCell align="center">{getStatusBadge(p.status)}</TableCell>
                      <TableCell align="right">{formatDate(p.createdAt)}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleEditProduct(p)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteClick(p)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>
          )}

        </Paper>
      </Container>

      {/* DELETE */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>

        <DialogContent>
          Are you sure you want to delete this product? This action cannot be undone.
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>No</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />

      {/* FORM (UNIFIED ADD/EDIT) */}
      <ProductFormDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSubmit={(product) => {
          if (editProduct) updateProduct(editProduct.id, product);
          else addProduct(product);

          setOpenDialog(false);
          setEditProduct(null);

          setSnackbarMessage(editProduct ? 'Product updated successfully' : 'Product added successfully');
          setSnackbarOpen(true);
        }}
        initialData={editProduct}
        existingProducts={products}
      />

      {/* FAB */}
      <Fab
        onClick={handleAddProduct}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: 'linear-gradient(135deg, #ff6b6b 0%, #f06595 100%)',
          color: 'white',
        }}
      >
        <AddIcon />
      </Fab>

    </Box>
  );
}