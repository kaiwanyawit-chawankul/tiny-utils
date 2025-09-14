// src/pages/shorten/index.js

import { useState } from 'react';
import Image from 'next/image';
export default function ShortenPage() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setResult(null);
    const resp = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // If your auth uses cookies/sessions, those are included automatically; else adapt
      body: JSON.stringify({ originalUrl })
    });
    const data = await resp.json();
    if (!resp.ok) {
      setError(data.error || 'Something went wrong');
    } else {
      setResult(data);
    }
  }

  return (
    <div>
      <h1>Create Short URL</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Original URL"
          value={originalUrl}
          onChange={e => setOriginalUrl(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>

      {error && <p style={{color:'red'}}>{error}</p>}

      {result && (
        <div>
          <p>Original: {result.originalUrl}</p>
          <p>Short URL: <a href={result.shortUrl}>{result.shortUrl}</a></p>
          <Image src={result.qr} alt="QR code" width={200} height={200} />
          <p>Created At: {new Date(result.createdAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
