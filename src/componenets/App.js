import { useState } from "react";
import Logo from "../Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

  //function to clear the list
  function handleClearList() {
    const confirmed = window.confirm("Are you sure to remove all items!");
    if (confirmed) setItems([]);
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
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
