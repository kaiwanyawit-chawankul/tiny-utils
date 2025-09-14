// /components/Navbar.js
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link href="/">Home</Link> |{' '}
      {user ? (
        <>
          <Link href="/dashboard">Dashboard</Link> |{' '}
          <Link href="/auth/logout">Logout</Link>
        </>
      ) : (
        <Link href="/auth/login">Login</Link>
      )}
    </nav>
  );
}
