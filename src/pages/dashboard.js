// import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
// import { getByUser } from '@lib/db';
import { getSession } from '@lib/auth';
import { getByUser } from '@lib/db';

export default function Dashboard({ urls }) {
  // const urls = [{
  //   shortCode: 'abc123',
  //   originalUrl: 'https://example.com',
  //   createdAt: '2024-01-01T12:00:00Z'
  // }]; // Placeholder for URLs fetched from the database

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Your Shortened URLs</h1>
      <ul style={{ marginTop: '1rem' }}>
        {urls.map(url => (
          <li key={url.shortCode}>
            <a href={`/${url.shortCode}`} target="_blank" rel="noreferrer">
              {url.originalUrl}
            </a>
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

  const userId = session.user.sub;
  const urlsFromDb = await getByUser(userId);

  // Convert Date to ISO string
  const urls = urlsFromDb.map(url => ({
    ...url,
    createdAt: url.createdAt instanceof Date
      ? url.createdAt.toISOString()
      : url.createdAt,
  }));

  return {
    props: { urls },
  };
}
