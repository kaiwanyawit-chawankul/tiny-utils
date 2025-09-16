import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NewPastePage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [password, setPassword] = useState('');
  const [burnAfterRead, setBurnAfterRead] = useState(false);
  const [expiresIn, setExpiresIn] = useState(''); // In hours

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/paste/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, password, burnAfterRead, expiresIn }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push(`/paste/${data.id}`);
    } else {
      alert(data.error || 'Failed to create paste.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>Create a Paste</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Paste content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Optional password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Expires in (hours)"
          value={expiresIn}
          onChange={(e) => setExpiresIn(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <label>
          <input
            type="checkbox"
            checked={burnAfterRead}
            onChange={(e) => setBurnAfterRead(e.target.checked)}
          />
          {' '}Burn after read
        </label>

        <button type="submit" className="btn btn-primary">Create Paste</button>
      </form>
    </div>
  );
}
