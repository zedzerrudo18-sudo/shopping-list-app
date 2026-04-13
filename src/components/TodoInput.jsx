export default function TodoInput({ input, setInput, addItem }) {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      
      <input
        style={{
          flex: 1,
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #ddd",
          outline: "none"
        }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add item..."
      />

      <button
        onClick={addItem}
        style={{
          padding: "12px 16px",
          border: "none",
          borderRadius: "10px",
          background: "#4f46e5",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Add
      </button>
    </div>
  );
}