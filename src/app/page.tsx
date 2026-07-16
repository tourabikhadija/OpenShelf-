"use client"
import { useEffect, useState } from "react";
import BookCard from "@/components/BookCard";

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
    // const filteredBooks = books.filter((book) => {
    // const query = searchQuery.toLowerCase();
    // const title = book.title.toLowerCase();
    // const author = book.author.toLowerCase();
    // const matchesSearch = title.includes(query) || author.includes(query);

    // let matchesFilter = true;
    // if (filterStatus === 'available') {
    //   matchesFilter = book.available === true;
    // } else if (filterStatus === 'borrowed') {
    //   matchesFilter = book.available === false;
    // }

    // return matchesSearch && matchesFilter;
  // });

  return(
    <div>
      <h1>OpenShelf </h1>

      <p>Application de gestion de bibliothèque permettant de gérer efficacement les livres, les utilisateurs et les emprunts.
         Elle facilite le suivi des ouvrages disponibles, l’ajout et la modification des livres, ainsi que la gestion des opérations
          d’emprunt et de retour grâce à une interface simple et intuitive.
      </p>
      
      <div>
        {books.map((book)=>(
          <BookCard key={book._id} book={book} onDelete={handleDelete}/>
        ))}
      </div>


    </div>
  );
}