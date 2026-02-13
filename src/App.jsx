import "./style.css";
import { useState, useEffect } from "react";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [error, setError] = useState("");

  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    if (newItem.trim() === "") {
      setError("Please enter a todo item.");
      return;
    }

    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: crypto.randomUUID(),
        title: newItem,
        completed: false,
      },
    ]);

    setNewItem("");
    setError("");
  }

  function toggleTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="container">
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            type="text"
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Write your todo..."
            autoComplete="off"
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button className="btn">Add</button>
      </form>

      <h1 className="header">To Do List</h1>

      <ul className="list">
        {todos.length === 0 && <li className="empty">No Todos</li>}

        {todos.map((todo) => (
          <li key={todo.id} className="list-item">
            <label className="title">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className={todo.completed ? "completed" : ""}>
                {todo.title}
              </span>
            </label>

            <button
              onClick={() => deleteTodo(todo.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
