import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Card, Button, Input } from '../components/Neo';
import { useNavigate } from 'react-router-dom';

interface Book {
  id: number;
  title: string;
  author: string;
  file_type: string;
}

const Library = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/books', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setBooks(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    // Optional: Prompt for title/author

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/books/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        fetchBooks();
      } else {
        alert('Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading');
    } finally {
      setUploading(false);
    }
  };

  const openBook = (id: number, type: string) => {
    navigate(`/read/${id}?type=${type}`);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-black uppercase">My Library</h2>
        <div className="relative">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleUpload}
            accept=".pdf,.md,.txt,.epub"
          />
          <label htmlFor="file-upload">
            <Button as="span" className="cursor-pointer" disabled={uploading}>
              {uploading ? 'UPLOADING...' : '+ UPLOAD BOOK'}
            </Button>
          </label>
        </div>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-20 opacity-50 font-bold text-xl">
          NO BOOKS FOUND. UPLOAD ONE TO START.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map(book => (
            <Card key={book.id} className="flex flex-col h-64 justify-between transition-transform hover:rotate-1 cursor-pointer" onClick={() => openBook(book.id, book.file_type)}>
              <div className="bg-neo-secondary h-32 w-full border-2 border-black mb-4 flex items-center justify-center font-bold text-white text-3xl uppercase">
                 {book.file_type}
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight line-clamp-2">{book.title}</h3>
                <p className="text-sm opacity-70 mt-1">{book.author}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Library;
