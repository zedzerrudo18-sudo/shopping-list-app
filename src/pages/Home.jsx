import { Box, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home({ products = [] }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
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

        <Box textAlign="center" mb={2}>
          <Button variant="contained" onClick={() => navigate("/register")}>
            Add Product
          </Button>
        </Box>

        {products.length === 0 ? (
          <Typography align="center">No products yet</Typography>
        ) : (
          products.map((p, i) => (
            <Paper key={i} sx={{ p: 2, mb: 2 }}>
              <Typography><b>Name:</b> {p.name}</Typography>
              <Typography><b>Price:</b> {p.price}</Typography>
              <Typography><b>Stock:</b> {p.stock}</Typography>
              <Typography><b>Category:</b> {p.category}</Typography>
            </Paper>
          ))
        )}
      </Paper>
    </Box>
  );
}