import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
} from "@mui/material";
import {
  CheckCircle,
  Schedule,
  Edit,
  Delete,
  Add,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Home({ products = [] }) {
  const navigate = useNavigate();

  //  state para sa search input - only updates on button click
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  //  state para sa delete confirmation dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState("");

  //  handle search button click
  const handleSearch = () => {
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  //  handle enter key in search input
  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  //  get status badge based on product status
  const getStatusBadge = (status) => {
    if (status === "Bought") {
      return (
        <Chip
          icon={<CheckCircle />}
          label="Bought"
          sx={{
            backgroundColor: "#e3f2fd",
            color: "#1976d2",
            fontWeight: 600,
          }}
        />
      );
    }
    return (
      <Chip
        icon={<Schedule />}
        label="Pending"
        sx={{
          backgroundColor: "#fff3e0",
          color: "#f57c00",
          fontWeight: 600,
        }}
      />
    );
  };

  //  open delete confirmation dialog
  const handleOpenDeleteDialog = (index, productName) => {
    setSelectedProductIndex(index);
    setSelectedProductName(productName);
    setOpenDeleteDialog(true);
  };

  //  close delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedProductIndex(null);
    setSelectedProductName("");
  };

  //  confirm delete product
  const handleConfirmDelete = () => {
    // Logic for deletion would be implemented here
    // This is where you'd call setProducts to remove item
    alert(`Product "${selectedProductName}" deleted successfully`);
    handleCloseDeleteDialog();
  };

  //  handle edit product
  const handleEdit = (product, index) => {
    navigate("/register", { state: { product, index, isEdit: true } });
  };

  //  handle add new product
  const handleAddProduct = () => {
    navigate("/register");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        p: 2,
        pb: 10,
      }}
    >
      {/*  main container */}
      <Paper sx={{ p: 4, width: "100%", maxWidth: 1200, margin: "0 auto" }}>

        {/*  title */}
        <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
          🛒 Shopping List Dashboard
        </Typography>

        {/*  search section */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="Search by Product Name"
            size="small"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleSearchKeyPress}
            sx={{ flex: 1 }}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Box>

        {/*  table section */}
        {filteredProducts.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography sx={{ fontSize: "1.1rem", opacity: 0.7 }}>
              No products found
            </Typography>
          </Box>
        ) : (
          <TableContainer sx={{ borderRadius: 2, boxShadow: 1 }}>
            <Table>
              {/*  table header */}
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, width: "15%" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, width: "25%" }}>
                    Product Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, width: "15%" }} align="right">
                    Price
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, width: "15%" }} align="center">
                    Quantity
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, width: "20%" }} align="center">
                    Created Time
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, width: "10%" }} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              {/*  table body */}
              <TableBody>
                {filteredProducts.map((product, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#fafafa",
                      },
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    {/*  status column */}
                    <TableCell sx={{ py: 2 }}>
                      {getStatusBadge(product.status || "Pending")}
                    </TableCell>

                    {/*  product name column */}
                    <TableCell sx={{ py: 2 }}>
                      {product.name}
                    </TableCell>

                    {/*  price column */}
                    <TableCell sx={{ py: 2 }} align="right">
                      <Typography sx={{ fontWeight: 500 }}>
                        ₱{product.price}
                      </Typography>
                    </TableCell>

                    {/*  quantity column */}
                    <TableCell sx={{ py: 2 }} align="center">
                      {product.stock}
                    </TableCell>

                    {/*  created time column */}
                    <TableCell sx={{ py: 2 }} align="center">
                      {product.createdTime || new Date().toLocaleDateString()}
                    </TableCell>

                    {/*  actions column */}
                    <TableCell sx={{ py: 2 }} align="center">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEdit(product, index)}
                        title="Edit Product"
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() =>
                          handleOpenDeleteDialog(index, product.name)
                        }
                        title="Delete Product"
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

      </Paper>

      {/*  FAB for adding new product */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleAddProduct}
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
        }}
      >
        <Add />
      </Fab>

      {/*  delete confirmation dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle sx={{ fontWeight: 600 }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography>
            Are you sure you want to delete <b>"{selectedProductName}"</b>?
          </Typography>
          <Typography sx={{ mt: 2, fontSize: "0.9rem", opacity: 0.7 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDeleteDialog} variant="outlined">
            No
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}