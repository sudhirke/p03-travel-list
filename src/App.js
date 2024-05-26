import { useState } from "react";
import FlashCards from "./Flashcard";

function App() {
  //1. global app level state
  const [items, setItems] = useState([]);

  //2. Logic to handle add item
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  //Funtion to delete item,  inverse communication
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  //function to toggle the item (26.05.2024)
  function handleToggleItem(id) {
    //Update the checkbox for selected item
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  //3. Pass handle function as property to child form componenet
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏖️ Let's go places 🌋</h1>;
}

function Form({ onAddItems }) {
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
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    //5. Call function from parent APP component and pass newly created item.
    onAddItems(newItem);

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
//Passing deleteItem handler
function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => {
          return (
            <PackingItem
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
            />
          );
        })}
      </ul>
    </div>
  );
}

//conditionally applying styles
//26.05.24 - Added checkbox that toggles the item
function PackingItem({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>🗑️</button>
    </li>
  );
}

function Stats({ items }) {
  const numItems = items.length; //state value derived from items state value
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! ready to go ✈️"
          : `🛒 You have ${numItems} items in the list and you already packed 
        ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}

export default App;
