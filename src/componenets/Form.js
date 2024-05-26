import { useState } from "react";

export default function Form({ onAddItems }) {
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
