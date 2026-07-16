'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import BookForm from '@/components/BookForm';

type BookFormData = {
  title: string;
  author: string;
  isbn: string;
  category: string;
  publicationYear: number;
  description: string;
};

export default function EditBookPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params.id;

  const [initialValues, setInitialValues] = useState<BookFormData | null>(null);
  const [serverError, setServerError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await fetch(`/api/books/${bookId}`);
        const data = await res.json();
        setInitialValues({
          title: data.title,
          author: data.author,
          isbn: data.isbn,
          category: data.category,
          publicationYear: data.publicationYear,
          description: data.description,
        });
      } catch {
        setServerError("Failed to load book data.");
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [bookId]);

  async function handleUpdate(data: BookFormData) {
    setServerError("");
    try {
      const res = await fetch(`/api/books/${bookId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const result = await res.json();
        if (Array.isArray(result.error)) {
          setServerError(result.error[0].message);
        } else {
          setServerError(result.error);
        }
        return;
      }
      router.push("/");
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Book</h1>
      {serverError && <div className="server-error">{serverError}</div>}
      {initialValues && <BookForm initialValues={initialValues} onSubmit={handleUpdate} />}
    </div>
  );
}
