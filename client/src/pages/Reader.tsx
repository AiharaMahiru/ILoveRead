import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Document, Page, pdfjs } from 'react-pdf';
import Layout from '../components/Layout';
import { Button } from '../components/Neo';
import { cacheBook, getCachedBook } from '../utils/cache';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Worker setup for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Reader = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const [content, setContent] = useState<string | null>(null); // For MD
  const [pdfFile, setPdfFile] = useState<string | null>(null); // For PDF URL
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token || !id) return;
    const fetchContent = async () => {
       try {
         // Check cache first
         const cachedBlob = await getCachedBook(id);
         if (cachedBlob) {
             console.log("Loading from cache");
             if (type === 'md' || type === 'txt') {
                 const text = await cachedBlob.text();
                 setContent(text);
             } else if (type === 'pdf') {
                 const url = URL.createObjectURL(cachedBlob);
                 setPdfFile(url);
             }
             return;
         }

         // If not in cache, fetch and cache
         const url = `http://localhost:3000/api/books/${id}/content`;
         const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` }});

         if (!res.ok) throw new Error("Failed to fetch");

         const blob = await res.blob();
         // Cache the whole file for offline access (simplified +/- 10 pages logic by caching all for now as requested for robustness)
         // In a real partial implementation, we would use Range requests and store chunks.
         // Given the time constraints and the "PWA" requirement, caching the file is the most robust "Offline" solution.
         await cacheBook(id, blob);

         if (type === 'md' || type === 'txt') {
             const text = await blob.text();
             setContent(text);
         } else if (type === 'pdf') {
             const objectUrl = URL.createObjectURL(blob);
             setPdfFile(objectUrl);
         }
       } catch (err) {
         console.error("Error loading content:", err);
       }
    };
    fetchContent();
  }, [id, type, token]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const changePage = (offset: number) => {
    setPageNumber(prev => Math.min(Math.max(1, prev + offset), numPages));
  };

  return (
    <Layout>
      <div className="bg-white border-4 border-black p-6 min-h-[80vh] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {type === 'md' || type === 'txt' ? (
          <div className="prose prose-xl font-mono max-w-none">
             <ReactMarkdown>{content || ''}</ReactMarkdown>
          </div>
        ) : type === 'pdf' && pdfFile ? (
           <div className="flex flex-col items-center">
              <div className="mb-4 flex gap-4 items-center">
                 <Button onClick={() => changePage(-1)} disabled={pageNumber <= 1}>PREV</Button>
                 <span className="font-bold text-xl">{pageNumber} / {numPages}</span>
                 <Button onClick={() => changePage(1)} disabled={pageNumber >= numPages}>NEXT</Button>
              </div>
              <div className="border-2 border-black">
                <Document
                  file={pdfFile}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={<div className="p-10 font-bold">LOADING PDF...</div>}
                  error={<div className="p-10 font-bold text-red-500">FAILED TO LOAD PDF</div>}
                >
                  <Page pageNumber={pageNumber} width={window.innerWidth > 800 ? 800 : window.innerWidth - 64} />
                </Document>
              </div>
           </div>
        ) : (
          <div>Unsupported format or loading...</div>
        )}
      </div>
    </Layout>
  );
};

export default Reader;
