"use client"


import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  

  const [data, setData] = useState(null);
  const [showClothingDropdown, setShowClothingDropdown] = useState(false);
  

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  const navStyle = {
    color: '#FFFFFF',
    fontSize: '18px',
    padding: '10px 20px',
    textDecoration: 'none',
  };

  const dropdownStyle = {
    position: 'absolute',
    backgroundColor: 'black',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    zIndex: 1,
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

      <div className="h-14 bg-gradient-to-b from-[#ABABAB] ...">
        <div className="flex justify-center">
          <h1 className="p-20 text-5xl">Sustainability</h1>
        </div>

        <div className="flex justify-center">
          <table>
            <thead>
              <tr>
                <th style={navStyle}><Link href="/">Home</Link></th>
                
                <th style={navStyle}>
                  <div onMouseEnter={() => setShowClothingDropdown(true)} onMouseLeave={() => setShowClothingDropdown(false)}>
                    <Link href="/clothings">Clothings</Link>
                    {showClothingDropdown && (
                      <div style={dropdownStyle}>
                        <Link href="/admin/men/page" style={navStyle}>Men&apos;s Clothing</Link>
                        <Link href="/admin/women/page" style={navStyle}>Women&apos;s Clothing</Link>
                      </div>
                    )}
                  </div>
                </th>

                <th style={navStyle}><Link href="/admin/books/page">Books</Link></th>
              </tr>
            </thead>
          </table>
        </div>
        <br />
        
      </div>
    </>
  );
}
