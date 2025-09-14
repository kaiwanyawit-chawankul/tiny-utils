// src/pages/shorten/history.js

import { useEffect, useState } from 'react';

export default function HistoryPage() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHistory() {
      const resp = await fetch('/api/shorten/history');
      const data = await resp.json();
      if (!resp.ok) {
        setError(data.error || 'Could not fetch history');
      } else {
        setUrls(data.urls);
      }
      setLoading(false);
    }
    fetchHistory();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{color:'red'}}>{error}</p>;

  return (
    <div>
      <h1>Your URLs</h1>
      <table>
        <thead>
          <tr>
            <th>Short Code</th>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {urls.map(u => (
            <tr key={u.shortCode}>
              <td>{u.shortCode}</td>
              <td><a href={u.originalUrl} target="_blank" rel="noopener noreferrer">{u.originalUrl}</a></td>
              <td><a href={`/${u.shortCode}`} target="_blank" rel="noopener noreferrer">{window.location.origin}/{u.shortCode}</a></td>
              <td>{new Date(u.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
