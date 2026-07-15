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
};

export default function BookCard({ book }: BookCardProps) {
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

      <button>Delete</button>
    </div>
  );
}