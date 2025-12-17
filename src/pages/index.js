// pages/index.js
import Navbar from '@components/Navbar';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

export default function Home() {
  const { user, isLoading } = useUser();

  return (
    <>
      <Navbar />
      <main style={{ textAlign: 'center', padding: '4rem' }}>
        <h1>📝 PasteBin + 🔗 TinyURL</h1>
        <p>Securely share text or shorten links, all in one place.</p>

        <div style={{ marginTop: '2rem' }}>
          {isLoading ? (
            <p>Loading...</p>
          ) : user ? (
            <>
              <Link href="/paste/new">
                <button style={buttonStyle}>Create Paste</button>
              </Link>
              <Link href="/shorten">
                <button style={buttonStyle}>Shorten URL</button>
              </Link>
            </>
          ) : (
            <div>
              <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                Please log in to access these features.
              </p>
              <Link href="/auth/login">
                <button style={buttonStyle}>Login</button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

const buttonStyle = {
  margin: '1rem',
  padding: '1rem 2rem',
  fontSize: '1rem',
  cursor: 'pointer'
};
