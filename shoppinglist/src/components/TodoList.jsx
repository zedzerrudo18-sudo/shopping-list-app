import TodoItem from "./TodoItem";

export default function TodoList(props) {
  return (
    <ul>
      {props.items.map((item, index) => (
        <TodoItem
          key={index}
          index={index}
          item={item}
          {...props}
        />
      ))}
    </ul>
  );
}
