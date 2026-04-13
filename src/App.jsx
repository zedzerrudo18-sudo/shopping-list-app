import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
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
    <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "20px",
  }}
>
      <div
  style={{
    background: "white",
    padding: "25px",
    borderRadius: "16px",
    width: "420px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  }}
>
        <h1 style={{ textAlign: "center", marginBottom: "15px" }}>
          Shopping List 🛒
        </h1>

        {/* FILTER BUTTONS */}
        <div style={{
  padding: "8px 12px",
  margin: "4px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#667eea",
  color: "white"
}}>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("active")}>Active</button>
          <button onClick={() => setFilter("completed")}>
            Completed
          </button>
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  outline: "none",
  marginBottom: "10px"
}}
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
          onMouseOver={(e) => e.currentTarget.style.background = "#eee"}
onMouseOut={(e) => e.currentTarget.style.background = "#f9f9f9"}
        />
      </div>
    </div>
  );
}

export default App;