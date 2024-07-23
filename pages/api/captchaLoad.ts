import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { captchaName } = req.query;

  if (!captchaName) {
    return res.status(400).json({ error: 'captchaName parameter is required' });
  }

  const db = await openDB();
  const query = `SELECT answer, image FROM images WHERE type = "captcha" AND answer = "${captchaName}" LIMIT 1`;
  const images = await db.all(query);

  if (images.length === 0) {
    return res.status(404).json({ error: 'Captcha not found' });
  }

  res.status(200).json(images.map(img => ({
    answer: img.answer,
    image: Buffer.from(img.image).toString('base64')
  })));
}
