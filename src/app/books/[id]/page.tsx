'use client';

import { useState, useEffect, use } from 'react';
import { useParams } from 'next/navigation';
import DetailCard from '@/components/DetailCard';

type Book = {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publicationYear: number;
  description: string;
  available: boolean;
};

export default function BookDetails(){

    const params = useParams();
    const bookId = params.id;
    

    const [book, setBook] = useState<Book | null> (null);
    
    useEffect(()=>{
        async function getBook(){
            try{
            const res = await fetch(`/api/books/${bookId}`);
            const data = await res.json();
            setBook(data);

            }catch (error){
             console.error("Failed to fetch books:",error);
            }
        }
     getBook();
    }, [bookId]);
    
    if (!book){
        return <p>Loading...</p>
    }

    return(
        <div className="book-details-page">
            <DetailCard key={book._id} book={book}/>


        </div>
    );
}
