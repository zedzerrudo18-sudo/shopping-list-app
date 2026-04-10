import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("shoppingList");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items]);

  const filteredItems = items.filter((item) => {
    if (filter === "active") return !item.completed;
    if (filter === "completed") return item.completed;
    return true;
  });

  function addItem() {
    if (input.trim() === "") return;
    setItems([...items, { text: input, completed: false }]);
    setInput("");
  }

  function deleteItem(index) {
    setItems(items.filter((_, i) => i !== index));
  }

  function toggleCompleted(index) {
    setItems(
      items.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function startEdit(index) {
    setEditIndex(index);
    setEditText(items[index].text);
  }

  function saveEdit() {
    setItems(
      items.map((item, i) =>
        i === editIndex ? { ...item, text: editText } : item
      )
    );
    setEditIndex(null);
    setEditText("");
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5",
    }}>

      <div style={{
        background:"white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        width: "400px",
      }}>

      <h1 style={{textAlign: "center"}}>Shopping List</h1>

      <TodoInput
        input={input}
        setInput={setInput}
        addItem={addItem}
      />

      <div style={{ margin: "10px ", textAlign: "center" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <p style={{ textAlign: "center" }}>
        Total: {items.length} | Completed: {items.filter(i => i.completed).length}
      </p>

      <TodoList
        items={filteredItems}
        toggleCompleted={toggleCompleted}
        deleteItem={deleteItem}
        startEdit={startEdit}
        editIndex={editIndex}
        editText={editText}
        setEditText={setEditText}
        saveEdit={saveEdit}
      />
    </div>
  </div>
  );
}

export default App;