// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import { IContactoState } from '../../../slices/models/interfaces';
import { authOptions } from '../auth/[...nextauth]';
// import { IContacto } from '../../../src/models/interfaces.model';

export const BASE_URL = process.env['PUBLIC_SERVER_ENDPOINT'];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  try {
    const contacto = req.body as IContactoState;
    const response = await fetch(`${BASE_URL}/contactos`, {
      method: 'POST',
      body: JSON.stringify({
        ...contacto,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ data });
    }
    return res.status(response.status).json({ data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export default handler;
