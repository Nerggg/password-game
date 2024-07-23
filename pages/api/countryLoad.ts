import { NextApiRequest, NextApiResponse } from 'next';
import { openDB } from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { countryNames } = req.query;

  if (!countryNames) {
    return res.status(400).json({ error: 'countryNames parameter is required' });
  }

  const countryList = Array.isArray(countryNames) ? countryNames : [countryNames];

  const db = await openDB();
  const query = `SELECT answer, image FROM images WHERE type = "country" AND answer IN ("${countryList[0]}","${countryList[1]}","${countryList[2]}")`;
  const images = await db.all(query);

  res.status(200).json(images.map(img => ({
    answer: img.answer,
    image: Buffer.from(img.image).toString('base64')
  })));
}
