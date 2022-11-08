import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loading from '../src/Components/Loading/Loading';
import Login from '../src/Components/Login/Login';

/**
 * Index page where we host the login.
 * @return {JSX.Element} Index page JSX
 */
const Index = (): JSX.Element => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/solicitudes');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (status !== 'unauthenticated') return <Loading />;
  return (
    <>
      <Head>
        <title>Plan Ocaso | Login</title>
      </Head>
      <Login />
    </>
  );
};

export default Index;
