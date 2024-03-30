import "./style.css";
import { useState } from "react";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todo, setToDo] = useState([]);

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

  function handleSubmit(e) {
    e.preventDefault();

    setToDo((current) => {
      return [...current, { id: crypto.randomUUID(), title: newItem }];
    });

    setNewItem("");
  }
  return (
    <div>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            id="item"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      <h1 className="header">To Do List</h1>
      <ul>
        {todo.map((t) => {
          return (
            <li key={t.id}>
              <label htmlFor="Item1">
                <input type="checkbox" onChange={toggleTodo} />
                {t.title}
              </label>
              <button className="btn btn-danger">Delete</button>
              <br />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
