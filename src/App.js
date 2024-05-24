import { Checkbox } from "@mui/material";
import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Cloths", quantity: 12, packed: false },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏖️ Let's go places 🌋</h1>;
}

function Form() {
  //create state variables to keep form data
  //1. declare state variable
  //2. bind control with state variable using value property
  //3. bind setDescription function with onChange event of control
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  //Form submit handler
  function handleSubmit(event) {
    //prevent default submission of the form and refresh
    event.preventDefault();

    //do nothing if description is blank
    if (!description) return;

    //create new object baesd on value
    const newItem = { description, quantity, packed: false, id: Date.now };
    console.log(newItem);

    //reset control to default
    setDescription("");
    setQuantity(1);
  }

  //form component html
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>📋 List down the things you need for trip </h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, index) => index + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

//Packing list conponent definition
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => {
          return <PackingItem item={item} key={item.id} />;
        })}
      </ul>
    </div>
  );
}

//conditionally applying styles
function PackingItem({ item }) {
  return (
    <li>
      <button>🗑️</button>

      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      🛒 You have XX items in the list and you already packed XX(X%)
    </footer>
  );
}

export default App;
