import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { id } = req.query

  if (typeof id !== 'string') return res.status(400).end()

  const paste = await prisma.paste.findUnique({ where: { id } })
  if (!paste) return res.status(404).json({ error: 'Not found' })

  if (paste.expiresAt && new Date(paste.expiresAt) < new Date()) {
    await prisma.paste.delete({ where: { id } })
    return res.status(410).json({ error: 'Expired' })
  }

  if (req.method === 'POST') {
    const { password } = req.body
    if (paste.password) {
      const valid = await bcrypt.compare(password || '', paste.password)
      if (!valid) return res.status(401).json({ error: 'Incorrect password' })
    }

    if (paste.burnAfterRead) {
      await prisma.paste.delete({ where: { id } })
    }

    return res.status(200).json({ content: paste.content })
  }

  return res.status(405).end()
}
