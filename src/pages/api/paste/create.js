// POST /api/paste
import { savePaste } from '@lib/pasteDb'
import { getUser } from '@lib/getUser'
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const user = await getUser(req);

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { content, password, burnAfterRead, expiresAt } = req.body

  const hashedPassword = password ? await bcrypt.hash(password, 10) : null

  const paste = await savePaste({
    data: {
      content,
      password: hashedPassword,
      burnAfterRead: !!burnAfterRead,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    },
    userId: user.id // Use Auth0 user ID from the database
  })

  res.status(200).json({ id: paste.id })
}
