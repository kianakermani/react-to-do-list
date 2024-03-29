import "./style.css";
import { useState } from "react";

export default function App() {
  const [Checked, setChecked] = useState(false);
  const [newItem, setNewItem] = useState("");

  const handleChange = () => {
    setChecked(!Checked);
  };
  return (
    <div>
      <form className="new-item-form">
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
        <li>
          <label htmlFor="Item1">
            <input type="checkbox" checked={Checked} onChange={handleChange} />
            Item 1
          </label>
          <button className="btn btn-danger">Delete</button>
          <br />
          <label htmlFor="Item2">
            <input type="checkbox" />
            Item 2
          </label>
          <button className="btn btn-danger">Delete</button>
        </li>
      </ul>
    </div>
  );
}
