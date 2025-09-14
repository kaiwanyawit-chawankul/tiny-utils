// src/pages/api/shorten/history.js

import { getByUser } from '../../../lib/db';
import { getSession } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const session = await getSession(req);
  if (!session) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  const userId = session.id;
  const records = await getByUser(userId);
  // Optionally, you can sort by date descending
  records.sort((a,b) => b.createdAt - a.createdAt);
  res.status(200).json({ urls: records });
}
