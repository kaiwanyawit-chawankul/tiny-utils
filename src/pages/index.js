// pages/index.js
import Navbar from '../components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ textAlign: 'center', padding: '4rem' }}>
        <h1>📝 PasteBin + 🔗 TinyURL</h1>
        <p>Securely share text or shorten links, all in one place.</p>

        <div style={{ marginTop: '2rem' }}>
          <Link href="/paste/new">
            <button style={buttonStyle}>Create Paste</button>
          </Link>
          <Link href="/shorten">
            <button style={buttonStyle}>Shorten URL</button>
          </Link>
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
