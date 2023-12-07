"use client"
import Image from 'next/image';
import Nav from '../../components/Nav/page';


import React, { useState, useEffect } from 'react';

const getUserData = async () => {
    const res = await fetch("http://127.0.0.1:5000/api/v1/books");
    return res.json();
};

export default function Books() {
    const [posts, setPosts] = useState([]);
    const [reservedBooks, setReservedBooks] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserData();
            setPosts(data);
        };
        fetchData();
    }, []);



    const handleReserve = (postId) => {
        // Check if the book is already reserved
        if (reservedBooks[postId]) {
            // If it's already reserved, unreserve it
            setReservedBooks((prevState) => ({
                ...prevState,
                [postId]: false,

            
            }));
        } else {
            // If it's not reserved, mark it as reserved
            setReservedBooks((prevState) => ({
                ...prevState,
                [postId]: true,
            }));
        }
    };

    const statusUpdate = async () => {

        const status = 1;

        try{
            const response = await 
                fetch("http://127.0.0.1:5000/api/v1/admin/books/4", {

                method:'PUT', 
                headers: {
                    'Content-Type':'application/json',
                },

                body:JSON.stringify({'id': 4, 'status': status}),


                })

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }

                const responseData = await response.json();
                console.log('Data sent successfully:', responseData);
               
        }
        catch(error) {
            console.error('There was a problem with the fetch operation:', error);
          }

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
      <Nav />
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1 className='text-white text-4xl font-semibold'>Books</h1>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>

                {posts.map((post) => (
                    <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '250px' }}>
                        <img src={post.image} alt="Book Cover" style={{ maxWidth: '100%', height: 'auto' }} />
                        <div>

                            <p>Genre: {post.genre}</p>
                            <p>ISBN: {post.isbn}</p>
                            <p>Publication Year: {post.publication_year}</p>
                            {/* {reservedBooks[post.status] ? (
                                <p>Reserved</p>
                            ) : (
                                <button onClick={() => handleReserve(post.id)}>
                                    {reservedBooks[post.id] ? "Reserved" : "Reserve"}
                                </button>
                            )} */}

                            {(post.status === 0) ? 

                            (<button onClick={statusUpdate} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Reserve</button>) : (<button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" >Reserved</button>)}




                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}
