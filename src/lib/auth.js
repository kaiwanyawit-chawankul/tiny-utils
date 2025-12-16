// src/lib/auth.js

import { auth0 } from './auth0.js';
import { prisma } from './prisma.js';

export async function getSession(req) {
  // Get the session from Auth0
  const session = await auth0.getSession(req);

  if (!session) {
    return null;
  }

  // Extract Auth0 user ID from the session
  const auth0UserId = session.user.sub; // Auth0 provides 'sub' as the unique user identifier
  const email = session.user.email;
  const name = session.user.name;

  // Find or create user in database
  let user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    // Create new user if they don't exist
    user = await prisma.user.create({
      data: {
        id: auth0UserId, // Use Auth0 user ID as the primary ID
        email,
        name
      }
    });
  } else if (user.id !== auth0UserId) {
    // Update user ID if it doesn't match (migrating from old system)
    user = await prisma.user.update({
      where: { email },
      data: { id: auth0UserId }
    });
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    auth0Id: auth0UserId
  };
}
