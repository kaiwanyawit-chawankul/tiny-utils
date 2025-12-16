// src/lib/getUser.js
// Helper function to get authenticated user in API routes

import { auth0 } from './auth0.js';
import { prisma } from './prisma.js';

export async function getUser(req) {
  try {
    const session = await auth0.getSession(req);

    if (!session) {
      return null;
    }

    // Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: session.user.sub }
    });

    return user;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

export async function requireAuth(req, res) {
  const user = await getUser(req);

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  return user;
}
