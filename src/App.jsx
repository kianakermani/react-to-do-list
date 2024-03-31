import "./style.css";
import { useState, useEffect } from "react";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todo, setToDo] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todo));
  }, [todo]);

  function toggleTodo(e) {
    const { value, checked } = e.target;
    const { id } = todo;
    // Case 1 : The user checks the box
    if (checked) {
      setToDo({
        id: [...id, value],
        title: [...id, value],
      });
    }
    // Case 2  : The user unchecks the box
    else {
      setToDo({
        id: id.filter((e) => e !== value),
        title: id.filter((e) => e !== value),
      });
    }
  }

  function Delete(id) {
    setToDo((current) => {
      return current.filter((t) => t.id !== id);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (newItem.length > 0) {
      setToDo((current) => {
        return [...current, { id: crypto.randomUUID(), title: newItem }];
      });
    } else {
      alert("Please Fill Input !");
    }

    setNewItem("");
  }
  return (
    <div>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            type="text"
            onChange={(e) => setNewItem(e.target.value)}
            id="item"
            value={newItem}
            placeholder="Write Your Todo"
            autoComplete="off"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">To Do List</h1>
      <ul>
        {todo.length === 0 && "No Todos"}

        {todo.map((t) => {
          return (
            <li key={t.id}>
              <div>
                <label htmlFor="Item1" className="title">
                  <input type="checkbox" onChange={toggleTodo} />
                  {t.title}
                </label>
              </div>
              <div>
                <button onClick={() => Delete(t.id)} className="btn btn-danger">
                  Delete
                </button>
              </div>
              <br />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
