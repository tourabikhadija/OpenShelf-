'use client';

import Link from 'next/link';

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


export default function DetailCard({book}:Book){
    return(
          <div className="book-detail">
      <div className="book-detail-card">
        <h1 className="book-detail-title">{book.title}</h1>

        <div className="book-detail-info">
          <div className="book-detail-row">
            <span className="book-detail-label">Author</span>
            <span className="book-detail-value">{book.author}</span>
          </div>
          <div className="book-detail-row">
            <span className="book-detail-label">ISBN</span>
            <span className="book-detail-value">{book.isbn}</span>
          </div>
          <div className="book-detail-row">
            <span className="book-detail-label">Category</span>
            <span className="book-detail-value">{book.category}</span>
          </div>
          <div className="book-detail-row">
            <span className="book-detail-label">Year</span>
            <span className="book-detail-value">{book.publicationYear}</span>
          </div>
          <div className="book-detail-row">
            <span className="book-detail-label">Status</span>
            <span className="book-detail-value">
              {book.available ? 'Available' : 'Borrowed'}
            </span>
          </div>
        </div>

        <div className="book-detail-description">
          <span className="book-detail-label">Description</span>
          <span className="book-detail-value">{book.description}</span>
        </div>
      </div>

      <Link href="/" className="back-link">
        &#8592; Back to Catalog
      </Link>
    </div>
  );
}