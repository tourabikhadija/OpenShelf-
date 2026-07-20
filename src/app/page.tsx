"use client"
import { useEffect, useState } from "react";
import BookCard from "@/components/BookCard";
import SearchBar from "@/components/SearchBar";
import  "@/style/Home.css";
import Image from "next/image";
import Link from "next/link";

type Book = {
    _id: string;
    title: string;
    author: string;
    category: string;
    publicationYear: number;
    available: boolean;
  };

export default function App(){


  const [books , setBooks] = useState<Book[]>([]);
  const [search , setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    async function getBooks(){
    try{
       const res = await fetch("/api/books");
       const data = await res.json();

       if (res.ok) {
         setBooks(data);
       } else {
         console.error("API error:", data.error);
       }
    }catch (error){
      console.error("Failed to fetch books:",error);
    }
    }
    getBooks();
  },[]);
  
    function handleDelete(bookId: string){
      setBooks((prev) =>
        prev.filter((book) =>book._id !==bookId)
      );
    }
    const filteredBooks = books.filter((book) => {
    const query = search.toLowerCase();
    const title = book.title.toLowerCase();
    const author = book.author.toLowerCase();
    const matchesSearch = title.includes(query) || author.includes(query);

    let matchesFilter = true;
    if (filter === 'available') {
      matchesFilter = book.available === true;
    } else if (filter === 'borrowed') {
      matchesFilter = book.available === false;
    }

     return matchesSearch && matchesFilter;
 });

  return(
    <main className="container">
    <div>
      <section className="section-hero">
        <div className="hero-content">
         <h1>Explore ancient manuscripts and timeless knowledge. </h1>

         <p>A private catalogue of the permanent collection
         , curated and cared for by the Ashworth Athenaeum.  
         </p>
        <Link href="/books/create">
        <button className="Collection">Create Book</button>
        </Link>
         
        </div>

        <div className="hero-image-container">
           <Image src="/images/hero-new.png" alt="Hero" width={350} height={600}  className="hero-image"/>
         
          <div className="hero-overlay">
             <h1>The Grand Archive</h1>
             <p>Where every page preserves a piece of history, <br />
             and every book unlocks timeless knowledge.</p>
          </div>
       </div>

      </section>
      
      <div className="shelf-divider"></div>

      <SearchBar query={search} onSearch={setSearch} />
      
      {filteredBooks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">&#128218;</div>
          <p className="empty-state-text">
            No books found. Time to add some to your shelf!
          </p>
        </div>
      ) : (
        <div className="books-container">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
    </main>
  );
}