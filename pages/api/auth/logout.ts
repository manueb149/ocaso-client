// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import { authOptions, BASE_URL } from './[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      body: JSON.stringify({ refreshToken: session?.user?.refreshToken }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user?.refreshToken}`,
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
