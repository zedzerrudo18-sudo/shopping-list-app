export default function TodoInput({ input, setInput, addItem }) {
  return (
    <div style={{display:"flex", gap:"5px "}}>
      <input
        style={{ flex: 1,padding:"8px" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add item..."
      />
      <button 
      onClick={addItem}
      style={{
        padding: "5px 10px",
        margin:"3px",
        cursor: "pointer"
         }}
        >
          Add
          </button>
    </div>
  );
}