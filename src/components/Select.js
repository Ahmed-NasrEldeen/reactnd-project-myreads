import React from "react";
import "../App.css";

function Select(props) {
  const changeValue = (e) => {
    //e.target.value = "selected";
    props.changeShelf(e.target.value, props.id);
  };

  return (
    <div className="book-shelf-changer">
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"
        rel="stylesheet"
      />

      <select
        value={props.book.shelf ? props.book.shelf : "none"}
        onChange={(e) => changeValue(e)}
      >
        <option value="move" disabled>
          Move to...
        </option>
        <option value="none">None</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
      </select>
    </div>
  );
}

export default Select;
