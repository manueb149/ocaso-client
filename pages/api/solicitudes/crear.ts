// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Session, unstable_getServerSession as getServerSession } from 'next-auth';
import { authOptions, BASE_URL } from '../auth/[...nextauth]';
import { ISolicitud } from '../../../src/models/interfaces.model';

export const solicitudesCrear = async (req: any, _res: any, session: Session | null) => {
  try {
    const solicitud = req.body as ISolicitud;
    const response = await fetch(`${BASE_URL}/solicitudes`, {
      method: 'POST',
      body: JSON.stringify({ ...solicitud }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });
    const data = (await response.json()) as ISolicitud;
    return { response, data };
  } catch (error) {
    return { error: error };
  }
};

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  const { response, data, error } = await solicitudesCrear(req, res, session);
  if (error) {
    return res.status(500).json({ error });
  }
  return res.status(response?.status!).json({ solicitudes: data });
};

export default handler;
