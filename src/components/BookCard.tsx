
"use client";
import Link from "next/link";
import "@/style/BookCard.css";
import Image from "next/image";

type Book = {
  _id: string;
  title: string;
  author: string;
  category: string;
  publicationYear: number;
  available: boolean;
};

type BookCardProps = {
  book: Book;
  onDelete: (bookId: string) => void;
};

export default function BookCard({ book, onDelete }: BookCardProps) {

  async function handleDelete() {
    try {
      const res = await fetch(`/api/books/${book._id}`, { method: "DELETE" });
      if (res.ok) {
        onDelete(book._id);
      }
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  }
  return (
  <div className="archive-card">

    <div className="ribbon"></div>

    <div className="bracket bl"></div>
    <div className="bracket br"></div>

    <div className={`status-badge ${book.available ? "available" : "borrowed"}`}>
      {book.available ? "Available" : "Borrowed"}
    </div>

    <div className="watermark">
      OPEN SHELF
    </div>

    <div className="title-box">
      <h2>{book.title}</h2>
      <div className="subtitle">
        {book.category}
      </div>
    </div>

    <div className="meta-row">
      <span>{book.author}</span>
      <span>{book.publicationYear}</span>
    </div>

    <div className="actions">

      <Link 
        href={`/books/${book._id}`} 
        className="action-btn edit"
      >
        <Image 
          src="/images/Afficher.png"
          alt="Afficher"
          width={30}
          height={30}
           title="Afficher le livre"
        />
      </Link>

      <Link 
        href={`/books/edit/${book._id}`} 
        className="action-btn"
      >
       <Image 
          src="/images/Modifier.png"
          alt="Modifier"
          width={30}
          height={30}
          title="Modifier le livre"
        />
      </Link>

      <button 
        onClick={handleDelete}
        className="action-btn delete"
      >
       <Image 
          src="/images/Supprime.png"
          alt="Supprime"
          width={30}
          height={30}
          title="Supprime le livre"
        />
      </button>

    </div>

  </div>
);
}