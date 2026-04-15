import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home({ products = [] }) {
  const navigate = useNavigate(); //  pang navigate padung Register page

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
      {/*  main container sa content*/}
      <Paper sx={{ p: 3, width: "100%", maxWidth: 500 }}>
        
        {/*  title */}
        <Typography variant="h4" align="center" gutterBottom>
          Shopping List 🛒
        </Typography>

        {/*  button para mo adto sa register page*/}
        <Box mb={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/register")}
          >
            Add Product
          </Button>
        </Box>

        {/* display sa  product list */}
        <Stack spacing={2}>
          {products.length === 0 ? (
            //  kung walay products, ipakita ni nga message
            <Typography align="center" sx={{ opacity: 0.7 }}>
              No products yet
            </Typography>
          ) : (

            //ipakita ang tanan product
            products.map((p, i) => (
              <Paper key={i} sx={{ p: 2, borderRadius: 2 }}>
                <Typography><b>Name:</b> {p.name}</Typography>
                <Typography><b>Price:</b> ₱{p.price}</Typography>
                <Typography><b>Stock:</b> {p.stock}</Typography>
                <Typography><b>Category:</b> {p.category}</Typography>
              </Paper>
            ))
          )}
        </Stack>
      </Paper>
    </Box>
  );
}