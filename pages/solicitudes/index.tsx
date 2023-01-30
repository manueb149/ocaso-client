import { GetServerSideProps } from 'next';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import Head from 'next/head';
import { authOptions } from '../api/auth/[...nextauth]';
import AppContainer from '../../src/Layout/AppContainer/AppContainer';

interface Props {}

/**
 * Solicitudes module
 * @return {JSX.Element} Solicitudes module JSX
 */
function Solicitudes({}: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>Plan Ocaso | Solicitudes</title>
      </Head>
      <h3 style={{ textAlign: 'center', padding: '20px' }}>Gestión de Solicitudes</h3>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

Solicitudes.layout = AppContainer;

export default Solicitudes;
