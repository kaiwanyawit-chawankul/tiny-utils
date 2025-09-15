import { getSession } from '@lib/auth.js';
import { saveUrl } from '@lib/db.js';
import QRCode from 'qrcode';

export default async function handler(req, res) {
  const session = await getSession(req, res);
  if (!session || !session.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ error: 'Missing originalUrl' });
  }

  const record = await saveUrl({
    originalUrl,
    userId: session.id
  });

  const shortUrl = `${req.headers.origin}/${record.shortCode}`;
  const qr = await QRCode.toDataURL(shortUrl);

  res.status(200).json({ ...record, shortUrl, qr });
}
