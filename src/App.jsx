import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container, Paper, Typography, Box, ButtonGroup, Button, TextField } from "@mui/material";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#667eea',
      },
      secondary: {
        main: '#764ba2',
      },
    },
  });
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("shoppingList");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const[editId, setEditId] = useState(null);
  const[editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items]);

  function addItem() {
    if (input.trim() === "") return;

    setItems([
      ...items,
      {
        text: input,
        completed: false,
        id: Date.now(),
      },
    ]);

    setInput("");
  }

  function deleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function toggleCompleted(id) {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function startEdit(item) {
    setEditId(item.id);
    setEditText(item.text);
  }

  function saveEdit() {
    setItems(
      items.map((item) =>
        item.id === editId ? { ...item, text: editText } : item
      )
    );
    setEditId(null);
    setEditText("");
  }

  function cancelEdit() {
  setEditId(null);
  setEditText("");
}

  // ✅ SAFE FILTER (NO DISAPPEARING ITEMS BUG)
  const filteredItems = items
    .filter((item) => {
      if (filter === "active") return !item.completed;
      if (filter === "completed") return item.completed;
      return true;
    })
    .filter((item) =>
      item.text.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)', py: 4 }}>
        <Paper elevation={3} sx={{ p: 3, width: '100%', borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Shopping List 🛒
          </Typography>

        {/* FILTER BUTTONS */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <ButtonGroup variant="outlined" aria-label="filter buttons">
            <Button
              variant={filter === 'all' ? 'contained' : 'outlined'}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'active' ? 'contained' : 'outlined'}
              onClick={() => setFilter('active')}
            >
              Active
            </Button>
            <Button
              variant={filter === 'completed' ? 'contained' : 'outlined'}
              onClick={() => setFilter('completed')}
            >
              Completed
            </Button>
          </ButtonGroup>
        </Box>

        {/* SEARCH */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* INPUT */}
        <TodoInput
          input={input}
          setInput={setInput}
          addItem={addItem}
        />

        {/* LIST */}
        <TodoList
          items={filteredItems}
          toggleCompleted={toggleCompleted}
          deleteItem={deleteItem}
          startEdit={startEdit}
          editId={editId}
          editText={editText}
          setEditText={setEditText}
          saveEdit={saveEdit}
        />
      </Paper>
    </Container>
    </ThemeProvider>
  );
}

export default App;