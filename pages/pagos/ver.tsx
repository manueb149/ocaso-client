import { GetServerSideProps } from 'next';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import Head from 'next/head';
import { authOptions } from '../api/auth/[...nextauth]';
import AppContainer from '../../src/Layout/AppContainer/AppContainer';

interface Props {}

/**
 * Pagos module
 * @return {JSX.Element} Pagos module JSX
 */
function PagosVer({}: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>Plan Ocaso | Ver Pagos</title>
      </Head>
      <h3 style={{ textAlign: 'center', padding: '20px' }}>Listado de Pagos</h3>
      <section className="ver-pagos"></section>
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

PagosVer.layout = AppContainer;

export default PagosVer;
