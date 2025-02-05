// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Session, unstable_getServerSession as getServerSession } from 'next-auth';
import { authOptions, BASE_URL } from '../auth/[...nextauth]';
import qs from 'querystring';
import { PaginatedResult } from '../../../src/models/types.model';
import { IContacto } from '../../../src/models/interfaces.model';

export const contactosVer = async (req: any, res: any, session: Session | null) => {
  try {
    const query = req.query ? qs.stringify(req.query) : 'limit=10&page1';
    const response = await fetch(`${BASE_URL}/contactos?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });
    const data = (await response.json()) as PaginatedResult<IContacto>;
    return { response, data };
  } catch (error) {
    return { error: error };
  }
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const { response, data, error } = await contactosVer(req, res, session);
  if (error) {
    return res.status(500).json({ error });
  }
  return res.status(response?.status!).json({ contactos: data });
};

export default handler;
