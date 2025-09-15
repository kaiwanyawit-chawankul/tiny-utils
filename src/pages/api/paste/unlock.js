import bcrypt from 'bcryptjs';
import { prisma } from '@lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { id, password } = req.body;

  const paste = await prisma.paste.findUnique({ where: { id } });
  if (!paste) return res.status(404).json({ error: 'Paste not found' });

  if (!paste.password) return res.status(400).json({ error: 'Paste has no password' });

  const valid = await bcrypt.compare(password, paste.password);
  if (!valid) return res.status(403).json({ error: 'Incorrect password' });

  if (paste.burnAfterRead) {
    await prisma.paste.update({
      where: { id },
      data: { hasBeenRead: true },
    });
  }

  res.status(200).json({ content: paste.content });
}
