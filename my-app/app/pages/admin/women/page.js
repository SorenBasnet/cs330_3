"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';



export default function WomensClothingPage() {
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
    fetch('http://127.0.0.1:5000/api/v1/admin/clothing/women')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching men\'s clothing data: ', error));
  }, []);


const handleAdd = (newItem) => {
  fetch('http://127.0.0.1:5000/api/v1/admin/clothing/women', {
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
  fetch(`http://127.0.0.1:5000/api/v1/admin/clothing/women/${itemId}`, {
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
  fetch(`http://127.0.0.1:5000/api/v1/admin/clothing/women/${itemId}`, { 
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


  const openFormForAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', price: '', size: '', color: '', image: '' }); // Reset form data for new item
    setShowForm(true);
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
      <h1>Women's Clothing</h1>
      <button onClick={openFormForAdd}>Add New Item</button>
      {showForm && (
        <div>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
          <input type="text" name="size" value={formData.size} onChange={handleChange} placeholder="Size" />
          <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Color" />
          <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" />
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={closeForm}>Cancel</button>
        </div>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {items.map(item => (
          <div key={item.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ddd' }}>
            <h2>{item.name}</h2>
            <Image 

              src="/static/Images/WomenClothes/${item.image}"
              width={20}
              height={30}

            />
            <img src={`/static/Images/WomenClothes/${item.image}`} alt={item.name} style={{ width: '100px', height: '100px' }} />
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
