import React from "react";
import { useState, useEffect } from "react";
import API from "../utils/api";
export default function Search() {
  const [books, setBooks] = useState([]);
  const [term, setTerm] = useState("");

  const retrieveBooks = (e) => {
    e.preventDefault();
    console.log(term);
    API.getBooks(term).then((res) => {
      console.log(res);
      setBooks(res.data.items);
    });
  };

  return (
    <>
      <div class="container">
        <div class="row">
          <div
            class="col-md-12 text-center"
            style={{ border: "solid 2px black" }}
          >
            <h1>(React) Google Books Search</h1>
            <h2>Search for and save books of intrest</h2>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 p-5" style={{ border: "solid 2px black" }}>
            <h4>Search</h4>
            <h5>Book</h5>
            <div class=" w-100 input-group input-group-lg">
              <span class="input-group-text" id="inputGroup-sizing-lg">
                Large
              </span>
              <input
                type="text"
                class="form-control"
                onChange={(e) => setTerm(e.target.value)}
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-lg"
              />
            </div>
            <button
              type="button"
              onClick={retrieveBooks}
              class="btn btn-primary btn-lg"
            >
              Large button
            </button>
          </div>
        </div>
      </div>
      <div class="container" style={{ border: "solid 2px black" }}>
        <h3>Results</h3>
        {books.map((book) => (
          <div class="row" style={{ border: "solid 2px black" }}>
            <div class="col-md-12 p-2">
              <div class="d-flex justify-content-between w-100">
                <div class="d-flex flex-column">
                  <p class="lead">{book.volumeInfo.title}</p>
                  {book.volumeInfo.authors.length > 1 && (
                    <p>
                      {book.volumeInfo.authors.map((author, index) => (
                        <>
                          {index === 0 && `Written By: ${author}, `}
                          {index === book.volumeInfo.authors.length - 1 &&
                            `${author}`}
                          {index < book.volumeInfo.authors.length - 1 &&
                            index > 0 &&
                            `${author}, `}
                        </>
                      ))}
                    </p>
                  )}

                  {book.volumeInfo.authors.length === 1 && (
                    <p>Written by: {book.volumeInfo.authors[0]}</p>
                  )}
                  {book.volumeInfo.imageLinks ? (
                       <img src={book.volumeInfo.imageLinks.thumbnail}/>
                  ):(
                      <p>no image available</p>
                  )}
                 
                  <p>{book.volumeInfo.description}</p>
                </div>
                <div class="d-flex">
                  <button type="button" class="btn btn-primary btn-lg">
                    Large button
                  </button>
                  <button type="button" class="btn btn-primary btn-lg">
                    Large button
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
