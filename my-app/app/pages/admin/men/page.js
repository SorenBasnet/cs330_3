"use client"

import React, { useState, useEffect } from 'react';

export default function MensClothingPage() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    size: '',
    color: '',
    image: '',
  });

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/v1/admin/clothing/men')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching men\'s clothing data: ', error));
  }, []);


const handleAdd = (newItem) => {
  fetch('http://127.0.0.1:5000/api/v1/admin/clothing/men', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newItem),
  })
  .then(response => response.json())
  .then(data => {
    setItems([...items, data]);
  })
  .catch(error => console.error('Error adding new item:', error));
};

const handleEdit = (itemId, updatedItem) => {
  fetch(`http://127.0.0.1:5000/api/v1/admin/clothing/men/${itemId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedItem),
  })
  .then(response => response.json())
  .then(data => {
    setItems(items.map(item => item.id === itemId ? data : item));
  })
  .catch(error => console.error('Error updating item:', error));
};

const handleDelete = (itemId) => {
  fetch(`http://127.0.0.1:5000/api/v1/admin/clothing/men/${itemId}`, { 
    method: 'DELETE' 
  })
  .then(response => {
    if (response.ok) {
      setItems(items.filter(item => item.id !== itemId));
    } else {
      console.error('Error deleting item');
    }
  })
  .catch(error => console.error('Error:', error));
};


  const openFormForAdd = async () => {

    const name = document.getElementById("name");

    const price = document.getElementById("price"); 

    const size = document.getElementById("size"); 

    const color = document.getElementById("color");

    const image = document.getElementById("imageURL")

    var data = {title:title, author:author, genre:genre, pubYear:pubYear}

    try{

    const response = await fetch("http://127.0.0.1:5000/api/v1/admin/books", {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      }, 
      body:JSON.stringify({ "id": 1000, "name":name, "price":price, "size":size, "color":color, "image":image, "category_id":"street" }),

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


    // setEditingItem(null);
    // setFormData({ name: '', price: '', size: '', color: '', image: '' }); // Reset form data for new item
    // setShowForm(true);
  };

  const openFormForEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item }); // Pre-fill form with item data for editing
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = () => {
    const action = editingItem ? handleEdit : handleAdd;
    action(editingItem ? editingItem.id : null, formData);
    closeForm();
  };

  return (
    <div>
      <h1>Men's Clothing</h1>
      <button onClick={openFormForAdd}>Add New Item</button>
      {showForm && (
        <div>
          <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          <input id="price" type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
          <input id="size" type="text" name="size" value={formData.size} onChange={handleChange} placeholder="Size" />
          <input id="color" type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Color" />
          <input id="imageURL" type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
          <input id="category"></input>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={closeForm}>Cancel</button>
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {items.map(item => (
          <div key={item.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ddd' }}>
            <h2>{item.name}</h2>
            <img src={`/static/Images/MenClothes/${item.image}`} alt={item.name} style={{ width: '100px', height: '100px' }} />
            <p>Price: ${item.price}</p>
            <p>Size: {item.size}</p>
            <p>Color: {item.color}</p>
            <p>Category: {item.category_name}</p>
            <button onClick={() => openFormForEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
