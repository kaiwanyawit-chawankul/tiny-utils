import { getSession } from '@auth0/nextjs-auth0';
import { savePaste } from '../../../lib/pasteDb';

export default async function handler(req, res) {
  const session = await getSession(req, res);
  if (!session?.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { content } = req.body;

  if (!content || content.trim().length === 0) {
    return res.status(400).json({ error: 'Content is required' });
  }

  const paste = await savePaste({
    content,
    userId: session.user.sub,
  });

  res.status(200).json({ paste });
}
