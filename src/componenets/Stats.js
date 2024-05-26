export default function Stats({ items }) {
  //early return if there are no items
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your list 💼</em>
      </p>
    );

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
