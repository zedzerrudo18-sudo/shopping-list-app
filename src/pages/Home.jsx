import { Box, Paper, Typography, TextField, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

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
      <Paper sx={{ p: 3, width: "100%", maxWidth: 500 }}>
        
        {/* TITLE (IMPORTANT PART NI LAI san) */}
        <Typography variant="h4" align="center" gutterBottom>
          Shopping List 🛒
        </Typography>

        {/* INPUT AREA */}
        <Stack spacing={2}>
          <TextField label="Product Name" fullWidth />

          <Button variant="contained">
            Search
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/register")}
          >
            Register Product
          </Button>

          {/* PRODUCT LIST AREA */}
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="body1">
              No products yet
            </Typography>
          </Paper>
        </Stack>

      </Paper>
    </Box>
  );
}