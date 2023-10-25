import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Booklist = () => {
  const [booklist, setBooklist] = useState([])

  useEffect(()=>{
    const fetchAllBooklist = async ()=> {
      try {
        const res = await axios.get("http://localhost:3333/books/")
        setBooklist(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchAllBooklist();
  },[])

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3333/books/"+id)
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1>Book Shop</h1>
      <div>
        <button>
          <Link to="/add">Add new book</Link>
        </button>
      </div>
      <div className="booklist">
        {booklist.map((book)=>(
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt=''/>}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price} ฿</span>
            <div>
              <button className='update'><Link to={`/update/${book.id}`}>Update</Link></button>
              <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Booklist