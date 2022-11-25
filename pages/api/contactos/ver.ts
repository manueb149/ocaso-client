// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import qs from 'querystring';
// import { IContacto } from '../../../src/models/interfaces.model';

export const BASE_URL = process.env['PUBLIC_SERVER_ENDPOINT'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  try {
    console.log('aaa', `${BASE_URL}/contactos?${qs.stringify(req.query)}`);
    const response = await fetch(`${BASE_URL}/contactos?${qs.stringify(req.query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });
    const contactos = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ contactos });
    }
    return res.status(response.status).json({ contactos });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export default handler;
