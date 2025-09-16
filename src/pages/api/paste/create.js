// POST /api/paste
import { savePaste } from '@lib/pasteDb'
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@lib/auth'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const session = await getSession(req, res);
  const userId = session.user.sub;

  const { content, password, burnAfterRead, expiresAt } = req.body

  const hashedPassword = password ? await bcrypt.hash(password, 10) : null

  const paste = await savePaste({
    data: {
      content,
      password: hashedPassword,
      burnAfterRead: !!burnAfterRead,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    },
    userId
  })

  res.status(200).json({ id: paste.id })
}
