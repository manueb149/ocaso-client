import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect } from 'react';

interface Props {}

const Protected: NextPage<Props> = (): JSX.Element => {
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') Router.replace('/auth/signin');
  }, [status]);

  if (status === 'authenticated') return <div>All users area!</div>;

  return <div>.....loading!</div>;
};

export default Protected;
