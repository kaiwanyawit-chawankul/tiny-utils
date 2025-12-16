// import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
// import { getByUser } from '@lib/db';
import { getSession } from '@lib/auth';
import { getByUser } from '@lib/db';
import { getPastesByUser } from '@lib/pasteDb';
import Profile from '@components/Profile';


export default function Dashboard({ urls, pastes }) {
  // const urls = [{
  //   shortCode: 'abc123',
  //   originalUrl: 'https://example.com',
  //   createdAt: '2024-01-01T12:00:00Z'
  // }]; // Placeholder for URLs fetched from the database

  return (

    <div style={{ padding: '2rem' }}>
      <Profile />
      <h1>Your Pastes</h1>
      <ul style={{ marginTop: '1rem' }}>
        {pastes.map(paste => (
          <li key={paste.id}>
            <a href={`/paste/${paste.id}`} target="_blank" rel="noreferrer">
              {paste.id}
            </a>
            <span style={{ marginLeft: '1rem', color: '#888' }}>
              {new Date(paste.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
      <h1>Your Shortened URLs</h1>
      <ul style={{ marginTop: '1rem' }}>
        {urls.map(url => (
          <li key={url.shortCode}>
            <a href={`/${url.shortCode}`} target="_blank" rel="noreferrer">
              {`${url.shortCode}`}
            </a>
            <span style={{ marginLeft: '1rem', color: '#888' }}>
              {url.originalUrl}
            </span>
            <span style={{ marginLeft: '1rem', color: '#888' }}>
              {new Date(url.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context.req, context.res);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false,
      },
    };
  }
  console.log('User session:', session);
  const userId = session.user?.id;
  console.log('Authenticated user ID:', userId);

  const urlsFromDb = await getByUser(userId);
  const pastesFromDb = await getPastesByUser(userId);

  // Convert Date to ISO string
  const urls = urlsFromDb.map(url => ({
    ...url,
    createdAt: url.createdAt instanceof Date
      ? url.createdAt.toISOString()
      : url.createdAt,
  }));

  const pastes = pastesFromDb.map(url => ({
    ...url,
    createdAt: url.createdAt instanceof Date
      ? url.createdAt.toISOString()
      : url.createdAt,
  }));

  return {
    props: { urls, pastes },
  };
}
