import React from "react";
import "../App.css";
import Select from "./Select";
function Book(props) {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${
              props.book.imageLinks
                ? props.book.imageLinks.thumbnail
                : undefined
            })`,
          }}
        />
        <Select
          book={props.book}
          id={props.book.id}
          changeShelf={props.changeShelf}
        />
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.authors}</div>
    </div>
  );
}

export default Book;
