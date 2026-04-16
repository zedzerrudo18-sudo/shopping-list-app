import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useProducts } from '../hooks/useProductContext';
import { formatCurrency, formatDate } from '../utils/validation';

export default function Home() {
  const navigate = useNavigate();
  const { products, deleteProduct, getStats } = useProducts();

  // UI State
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('productName');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    if (!normalizedSearch) return products;

    return products.filter((p) =>
      p.productName.toLowerCase().includes(normalizedSearch)
    );
  }, [products, searchQuery]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    sorted.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle numeric sorting
      if (sortBy === 'price' || sortBy === 'quantity') {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      }

      // Handle string sorting
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // Handle numeric sorting
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return sorted;
  }, [filteredProducts, sortBy, sortOrder]);

  // Get statistics
  const stats = useMemo(() => getStats(), [getStats]);

  // Handle sort column click
  const handleSortClick = (columnName) => {
    if (sortBy === columnName) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnName);
      setSortOrder('asc');
    }
  };

  // Handle add product
  const handleAddProduct = () => {
    navigate('/register');
  };

  // Handle edit product
  const handleEditProduct = (product) => {
    navigate('/register', { state: { product } });
  };

  // Handle delete click
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.id);
      setOpenDeleteDialog(false);
      setSelectedProduct(null);
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const isCompleted = status === 'Bought';
    return (
      <Chip
        icon={isCompleted ? <CheckCircleIcon /> : <ScheduleIcon />}
        label={status}
        color={isCompleted ? 'success' : 'warning'}
        variant="outlined"
        size="small"
        sx={{
          fontWeight: 500,
          textTransform: 'capitalize',
        }}
      />
    );
  };

  const handleOpenSearchDialog = () => {
    setSearchInput(searchQuery);
    setSearchDialogOpen(true);
  };

  const handleCloseSearchDialog = () => {
    setSearchDialogOpen(false);
  };

  const handleExecuteSearch = () => {
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
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: 'white',
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            🛒  Product Tracker
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Manage  your products efficiently
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                p: 2.5,
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Total Products
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#667eea' }}>
                {stats.totalProducts}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                p: 2.5,
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Total Value
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#667eea' }}>
                {formatCurrency(stats.totalValue)}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                p: 2.5,
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Pending
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                {stats.pendingCount}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                p: 2.5,
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Completed
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#10b981' }}>
                {stats.boughtCount}
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content Card */}
        <Paper
          sx={{
            p: 3,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.98)',
          }}
        >
          {/* Header with Search */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ mb: 3, justifyContent: 'flex-end' }}
          >
            <Button
              variant="contained"
              startIcon={<SearchIcon />}
              onClick={handleOpenSearchDialog}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              Search
            </Button>
          </Stack>

          <Dialog open={searchDialogOpen} onClose={handleCloseSearchDialog}>
            <DialogTitle>Search products</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Search by product name"
                type="text"
                fullWidth
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseSearchDialog}>Cancel</Button>
              <Button variant="contained" onClick={handleExecuteSearch}>
                Search
              </Button>
            </DialogActions>
          </Dialog>

          {/* Table */}
          {sortedProducts.length === 0 ? (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
                {searchQuery.trim() !== '' 
                  ? '🔍 No matching products found' 
                  : '📭 No products found'}
              </Typography>
              {searchQuery.trim() === '' && (
                <Typography variant="body2" color="textSecondary">
                  Try searching for a product or add a new one using the + button.
                </Typography>
              )}
            </Box>
          ) : (
            <TableContainer>
              <Table sx={{ minWidth: 800 }}>
                <TableHead>
                  <TableRow
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '& th': {
                        color: 'white',
                        fontWeight: 600,
                      },
                    }}
                  >
                    <TableCell sortDirection={sortBy === 'productName' ? sortOrder : false}>
                      <TableSortLabel
                        active={sortBy === 'productName'}
                        direction={sortOrder}
                        onClick={() => handleSortClick('productName')}
                        sx={{
                          color: 'white !important',
                          '& .MuiTableSortLabel-icon': {
                            color: 'white !important',
                          },
                        }}
                      >
                        Product Name
                      </TableSortLabel>
                    </TableCell>

                    <TableCell
                      align="right"
                      sortDirection={sortBy === 'price' ? sortOrder : false}
                    >
                      <TableSortLabel
                        active={sortBy === 'price'}
                        direction={sortOrder}
                        onClick={() => handleSortClick('price')}
                        sx={{
                          color: 'white !important',
                          '& .MuiTableSortLabel-icon': {
                            color: 'white !important',
                          },
                        }}
                      >
                        Price
                      </TableSortLabel>
                    </TableCell>

                    <TableCell
                      align="center"
                      sortDirection={sortBy === 'quantity' ? sortOrder : false}
                    >
                      <TableSortLabel
                        active={sortBy === 'quantity'}
                        direction={sortOrder}
                        onClick={() => handleSortClick('quantity')}
                        sx={{
                          color: 'white !important',
                          '& .MuiTableSortLabel-icon': {
                            color: 'white !important',
                          },
                        }}
                      >
                        Quantity
                      </TableSortLabel>
                    </TableCell>

                    <TableCell
                      sortDirection={sortBy === 'category' ? sortOrder : false}
                    >
                      <TableSortLabel
                        active={sortBy === 'category'}
                        direction={sortOrder}
                        onClick={() => handleSortClick('category')}
                        sx={{
                          color: 'white !important',
                          '& .MuiTableSortLabel-icon': {
                            color: 'white !important',
                          },
                        }}
                      >
                        Category
                      </TableSortLabel>
                    </TableCell>

                    <TableCell
                      align="center"
                      sortDirection={sortBy === 'status' ? sortOrder : false}
                    >
                      <TableSortLabel
                        active={sortBy === 'status'}
                        direction={sortOrder}
                        onClick={() => handleSortClick('status')}
                        sx={{
                          color: 'white !important',
                          '& .MuiTableSortLabel-icon': {
                            color: 'white !important',
                          },
                        }}
                      >
                        Status
                      </TableSortLabel>
                    </TableCell>

                    <TableCell
                      align="center"
                      sortDirection={sortBy === 'createdAt' ? sortOrder : false}
                    >
                      <TableSortLabel
                        active={sortBy === 'createdAt'}
                        direction={sortOrder}
                        onClick={() => handleSortClick('createdAt')}
                        sx={{
                          color: 'white !important',
                          '& .MuiTableSortLabel-icon': {
                            color: 'white !important',
                          },
                        }}
                      >
                        Created Date
                      </TableSortLabel>
                    </TableCell>

                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {sortedProducts.map((product) => (
                    <TableRow
                      key={product.id}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(102, 126, 234, 0.05)',
                        },
                        '&:last-child td, &:last-child th': { border: 0 },
                      }}
                    >
                      <TableCell
                        sx={{
                          fontWeight: 500,
                          color: '#1f2937',
                        }}
                      >
                        {product.productName}
                      </TableCell>

                      <TableCell
                        align="right"
                        sx={{
                          fontWeight: 600,
                          color: '#667eea',
                        }}
                      >
                        {formatCurrency(product.price)}
                      </TableCell>

                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 500,
                        }}
                      >
                        {product.quantity}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={product.category}
                          size="small"
                          sx={{
                            background: 'rgba(102, 126, 234, 0.1)',
                            color: '#667eea',
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>

                      <TableCell align="center">{getStatusBadge(product.status)}</TableCell>

                      <TableCell align="center" sx={{ color: '#6b7280', fontSize: '0.9rem' }}>
                        {formatDate(product.createdAt)}
                      </TableCell>

                      <TableCell align="center">
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          <IconButton
                            size="small"
                            onClick={() => handleEditProduct(product)}
                            color="primary"
                            title="Edit product"
                            sx={{
                              '&:hover': {
                                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                              },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>

                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(product)}
                            color="error"
                            title="Delete product"
                            sx={{
                              '&:hover': {
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                              },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Results Summary */}
          {sortedProducts.length > 0 && (
            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e5e7eb' }}>
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'right' }}>
                Showing {sortedProducts.length} of {products.length} products
                {searchQuery && ` • Search: "${searchQuery}"`}
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>



      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle sx={{ fontWeight: 600 }}>🗑️ Confirm Delete</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography>
            Are you sure you want to delete{' '}
            <strong>{selectedProduct?.productName}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setOpenDeleteDialog(false)} variant="outlined">
            No
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            sx={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleAddProduct}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
          '&:hover': {
            boxShadow: '0 12px 32px rgba(102, 126, 234, 0.6)',
          },
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}