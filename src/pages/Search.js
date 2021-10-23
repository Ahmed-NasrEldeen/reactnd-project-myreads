import React from "react";
import { useState, useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import "../App.css";
import Book from "../components/Book";

function Search(props) {
  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    const fetchbooks = async () => {
      const allbooks = await BooksAPI.getAll();
      setMyBooks(allbooks);
    };
    fetchbooks();
  }, []);

  const changeShelf = async (state, id) => {
    const tempbooks = [...books];
    const index = tempbooks.findIndex((book) => book.id === id);
    tempbooks[index].shelf = state;
    setBooks(tempbooks);
    await BooksAPI.update(tempbooks[index], state);
  };

  const update = (books) => {
    myBooks.forEach((CurrentBook) => {
      const tempbooks = [...books];
      const index = [...books].findIndex((book) => book.id === CurrentBook.id);
      if (index > -1) {
        tempbooks[index].shelf = CurrentBook.shelf;
        setBooks(tempbooks);
      }
    });
    setBooks(books);
  };

  const search = async (e) => {
    const query = e.target.value;
    let booksResult = await BooksAPI.search(query);

    if (!booksResult) {
      setBooks([]);
      return;
    }
    console.log(booksResult);
    if (booksResult.error) {
      setBooks([]);
    } else {
      booksResult = booksResult.filter(
        (book) => book.authors && book.imageLinks
      );
      update(booksResult);
    }
  };

  return (
    <div className="app">
      <div className="search-books">
        <div className="search-books-bar">
          <a href="/">
            <button className="close-search">Close</button>
          </a>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(e) => search(e)}
            />
          </div>
        </div>
        <div className="list-books-content">
          <div className="search-books-results">
            <ol className="books-grid">
              {books.map((book, index) => (
                <li key={index}>
                  <Book book={book} changeShelf={changeShelf} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Search;
