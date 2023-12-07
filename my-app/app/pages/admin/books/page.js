"use client"

import React, { useState, useEffect } from 'react';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationYear: '',
  });

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/v1/admin/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books data: ', error));
  }, []);

  const handleAdd = (newBook) => {
    fetch('http://127.0.0.1:5000/api/v1/admin/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data && data.id) {
        setBooks([...books, data]);
        alert('Book added successfully');
        console.log(data);
        return books.json();
      } else {
        console.error('Unexpected response data:', data);
      }
    })
    .catch(error => {
      console.error('Error adding new book:', error);
      alert('Error adding new book' );
    });
  };

  const handleEdit = (bookId, updatedBook) => {
    fetch(`http://127.0.0.1:5000/api/v1/admin/books/${bookId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBook),
    })
    .then(response => response.json())
    .then(data => {
      setBooks(books.map(book => book.id === bookId ? data : book));
    })
    .catch(error => console.error('Error updating book:', error));
  };

  const handleDelete = (bookId) => {
    fetch(`http://127.0.0.1:5000/api/v1/admin/books/${bookId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setBooks(books.filter(book => book.id !== bookId));
      } else {
        console.error('Error deleting book');
      }
    })
    .catch(error => console.error('Error:', error));
  };

  const openFormForAdd = () => {
    setEditingBook(null);
    setFormData({ title: '', author: '', genre: '', publicationYear: '' });
    setShowForm(true);
  };

  const openFormForEdit = (book) => {
    setEditingBook(book);
    setFormData({ ...book });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async () => {

    const title = document.getElementById("title");

    const author = document.getElementById("author"); 

    const genre = document.getElementById("genre"); 

    const pubYear = document.getElementById("pubYear");

    var data = {title:title, author:author, genre:genre, pubYear:pubYear}

    try{

    const response = await fetch("http://127.0.0.1:5000/api/v1/admin/books", {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      }, 
      body:JSON.stringify({ 'id': 1001, 'title': title.value, 'isbn':"112222" , 'publication_year': pubYear.value, 'image':'soren.jpg', 'genre':"genre" }),

    })

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
      console.log('Data sent successfully:', responseData);
    } 
    
    catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }

  };

  return (
<>

    
      

      <h1>Books</h1>
      <button onClick={openFormForAdd}>Add New Book</button>
      {showForm && (
        <div>

          <input id="title" type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
          <input id="author" type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Author" />
          <input id="genre" type="text" name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" />
          <input id="pubYear" type="number" name="publicationYear" value={formData.publicationYear} onChange={handleChange} placeholder="Publication Year" />

          <button onClick={handleSubmit}>Submit</button>
          <button onClick={closeForm}>Cancel</button>
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {books.map(book => (
          <div key={book.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ddd' }}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Publication Year: {book.publicationYear}</p>
            <button onClick={() => openFormForEdit(book)}>Edit</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </div>
        ))}
      </div>


    </>
  );
}
