// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import { IContactoState } from '../../../slices/models/interfaces';
import { authOptions, BASE_URL } from '../auth/[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  try {
    const contacto = req.body as IContactoState['editContacto'];
    const { id, ...restContacto } = contacto!;
    const response = await fetch(`${BASE_URL}/contactos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ ...restContacto }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });
    const data = await response.json();
    return res.status(response.status).json({ data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export default handler;
