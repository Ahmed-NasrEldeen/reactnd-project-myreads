import React, { useState, useEffect } from "react";
// import * as BooksAPI from './BooksAPI'
import "../App.css";
import Book from "../components/Book";
import * as BooksAPI from "../BooksAPI";
import { Link } from "react-router-dom";
function BooksApp(props) {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchbooks = async () => {
      const allbooks = await BooksAPI.getAll();
      setBooks(allbooks);
    };
    fetchbooks();
  }, []);

  const changeShelf = (state, id) => {
    const tempbooks = [...books];
    const index = [...books].findIndex((book) => book.id === id);
    tempbooks[index].shelf = state;
    setBooks(tempbooks);
    BooksAPI.update(tempbooks[index], state);
  };
  const filterBooks = (state) =>
    books
      .filter((book) => book.shelf === state)
      .map((book) => (
        <li key={book.id}>
          <Book book={book} changeShelf={changeShelf} />
        </li>
      ));

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">{filterBooks("currentlyReading")}</ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">{filterBooks("wantToRead")}</ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">{filterBooks("read")}</ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link
          to={{
            pathname: "/search",
            state: { books: books },
          }}
        >
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
}

export default BooksApp;
