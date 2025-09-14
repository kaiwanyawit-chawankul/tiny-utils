// src/lib/db.js
import { nanoid } from 'nanoid';
import { prisma } from './prisma.js';

export async function saveUrl({ originalUrl, userId }) {
  const shortCode = nanoid(8);

  const record = await prisma.shortUrl.create({
    data: {
      originalUrl,
      shortCode,
      userId
    }
  });

  return record;
}

export async function getByShortCode(shortCode) {
  return await prisma.shortUrl.findUnique({
    where: { shortCode }
  });
}

export async function getByUser(userId) {
  return await prisma.shortUrl.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
}
