// src/lib/pasteDb.js
import { prisma } from './prisma';

// Save a new paste
export async function savePaste({ data, userId }) {
  const {content} = data;
  return await prisma.paste.create({
    data: {
      content,
      userId
    },
  });
}

// Get paste by ID
export async function getPasteById(id) {
  return await prisma.paste.findUnique({
    where: { id },
  });
}

// Get all pastes by user
export async function getPastesByUser(userId) {
  return await prisma.paste.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
}
