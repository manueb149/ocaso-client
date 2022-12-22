// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Session, unstable_getServerSession as getServerSession } from 'next-auth';
import { authOptions, BASE_URL } from '../auth/[...nextauth]';
import { PaginatedResult } from '../../../src/models/types.model';
import { IPlan } from '../../../src/models/interfaces.model';

export const planesGet = async (req: any, _res: any, session: Session | null) => {
  try {
    const response = await fetch(`${BASE_URL}/planes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });
    const data = (await response.json()) as PaginatedResult<IPlan>;
    return { response, data };
  } catch (error) {
    return { error: error };
  }
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.url);
  const session = await getServerSession(req, res, authOptions);
  const { response, data, error } = await planesGet(req, res, session);
  if (error) {
    return res.status(500).json({ error });
  }
  return res.status(response?.status!).json({ ...data });
};

export default handler;
