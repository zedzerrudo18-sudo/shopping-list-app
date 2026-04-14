import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container, Paper, Typography } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#667eea",
      },
      secondary: {
        main: "#764ba2",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{ p: 3, width: "100%", borderRadius: 2 }}
        >
          <Typography variant="h4" align="center">
            Shopping / Product App 🛒
          </Typography>

          <Typography align="center" sx={{ mt: 2 }}>
            Ready for Register Product feature
          </Typography>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;