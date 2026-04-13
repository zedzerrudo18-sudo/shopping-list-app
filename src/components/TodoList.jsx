export default function TodoList({
  items,
  toggleCompleted,
  deleteItem,
  startEdit,
  editId,
  editText,
  setEditText,
  saveEdit,
  cancelEdit
}) {
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            marginTop: "10px",
            background: "#f9f9f9",
            borderRadius: "8px"
          }}
        >

          {/* EDIT MODE */}
          {editId === item.id ? (
            <div style={{ display: "flex", gap: "8px", width: "100%" }}>
              <input
                style={{
                  flex: 1,
                  padding: "6px",
                  borderRadius: "6px",
                  border: "1px solid #ccc"
                }}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />

              <button onClick={saveEdit}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </div>
          ) : (
            <>
              {/* ITEM TEXT */}
              <span
                onClick={() => toggleCompleted(item.id)}
                style={{
                  cursor: "pointer",
                  textDecoration: item.completed
                    ? "line-through"
                    : "none"
                }}
              >
                {item.text}
              </span>

              {/* ACTIONS */}
              <div style={{ display: "flex", gap: "5px" }}>
                <button onClick={() => startEdit(item)}>
                  Edit
                </button>
                <button onClick={() => deleteItem(item.id)}>
                  X
                </button>
              </div>
            </>
          )}

        </div>
      ))}
    </div>
  );
}