import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { getByUser } from '../lib/db';

function Dashboard({ urls }) {
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

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);
    const userId = session.user.sub;
    const urls = await getByUser(userId);
    return { props: { urls } };
  },
});

export default Dashboard;
