import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await openDB();
  const images = await db.all('SELECT answer, image FROM images ORDER BY RANDOM() LIMIT 3');

  res.status(200).json(images.map(img => ({
    answer: img.answer,
    image: Buffer.from(img.image).toString('base64')
  })));
}
