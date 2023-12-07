"use client"
import Image from 'next/image';
import Nav from '../../../components/Nav/page';



import React, { useState, useEffect } from 'react';

export default function MensClothingPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/v1/clothing/men')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching men\'s clothing data: ', error));
  }, []);

  const addToCart = (itemId) => {
    const quantity = 1; 
    fetch('http://127.0.0.1:5000/api/v1/add_to_cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'mens', id: itemId, quantity }),
    })
    .then(response => response.json())
    .then(data => {
      alert('Item added to cart');
    })
    .catch(error => console.error('Error adding item to cart: ', error));
  };

  return (
    <>

    <div style={{ zIndex: -1, position: 'fixed', width: '100vw', height: '100vh' }}>
<Image
          src="/background.jpg"
          alt="background image"
          layout="fill"
          objectFit='cover'
        />
</div>
    <div>
      <Nav />
      <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Men's Clothing</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {items.map(item => (
          <div key={item.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ddd' }}>
            <h2>{item.name}</h2>
            <img src={`/static/Images/MenClothes/${item.image}`} alt={item.name} style={{ width: '100px', height: '100px' }} />
            <p>Price: ${item.price}</p>
            <p>Size: {item.size}</p>
            <p>Color: {item.color}</p>
            <p>Category: {item.category_name}</p>
            <button onClick={() => addToCart(item.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
    </div>

    </>
  );
}
