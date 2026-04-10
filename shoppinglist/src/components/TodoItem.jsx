export default function TodoItem({
  item,
  index,
  toggleCompleted,
  deleteItem,
  startEdit,
  editIndex,
  editText,
  setEditText,
  saveEdit
}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => toggleCompleted(index)}
      />

      {editIndex === index ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={saveEdit}>Save</button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: item.completed ? "line-through" : "none" }}>
            {item.text}
          </span>

          <button onClick={() => startEdit(index)}>Edit</button>
        </>
      )}

      <button onClick={() => deleteItem(index)}>Delete</button>
    </li>
  );
}