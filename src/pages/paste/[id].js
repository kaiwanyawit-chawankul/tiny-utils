import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { prisma } from '@lib/prisma';

export async function getServerSideProps({ params, req, res }) {
  const paste = await prisma.paste.findUnique({ where: { id: params.id } });

  if (!paste) return { notFound: true };

  const now = new Date();

  if (paste.expiresAt && now > new Date(paste.expiresAt)) {
    await prisma.paste.delete({ where: { id: paste.id } });
    return { notFound: true };
  }

  if (paste.burnAfterRead && paste.hasBeenRead) {
    await prisma.paste.delete({ where: { id: paste.id } });
    return { notFound: true };
  }

  return {
    props: {
      id: paste.id,
      content: paste.password ? null : paste.content,
      hasPassword: !!paste.password,
      burnAfterRead: paste.burnAfterRead,
    },
  };
}

export default function PastePage({ id, content, hasPassword, burnAfterRead }) {
  const [enteredPassword, setEnteredPassword] = useState('');
  const [revealContent, setRevealContent] = useState(content);

  const handleUnlock = async () => {
    const res = await fetch(`/api/paste/unlock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, password: enteredPassword }),
    });

    const data = await res.json();
    if (res.ok) {
      setRevealContent(data.content);
    } else {
      alert(data.error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Paste Viewer</h1>
      {revealContent ? (
        <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{revealContent}</pre>
      ) : hasPassword ? (
        <div>
          <input
            type="password"
            placeholder="Enter password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <button onClick={handleUnlock} className="btn btn-primary ml-2">Unlock</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
