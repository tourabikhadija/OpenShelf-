"use client";
import Link from "next/link";

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
    <div className="book-card">
      <h2>{book.title}</h2>

      <p>Author: {book.author}</p>
      <p>Category: {book.category}</p>
      <p>Year: {book.publicationYear}</p>
      <p>Status: {book.available ? "Available" : "Borrowed"}</p>

      <Link href={`/books/${book._id}`}>
        View Details
      </Link>

      <Link href={`/books/edit/${book._id}`}>
        Edit
      </Link>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}