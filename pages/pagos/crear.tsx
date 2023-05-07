import { GetServerSideProps } from 'next';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import Head from 'next/head';
import { authOptions } from '../api/auth/[...nextauth]';
import AppContainer from '../../src/Layout/AppContainer/AppContainer';

/**
 * Pagos module
 * @return {JSX.Element} Pagos module JSX
 */
function PagosCrear(): JSX.Element {
  return (
    <>
      <Head>
        <title>Plan Ocaso | Pagos</title>
      </Head>
      <h3 style={{ textAlign: 'center', padding: '20px' }}>Creación de Pagos</h3>
      <section id="crear-pagos" style={{ padding: '10px 0px 0px 10px' }}></section>
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

PagosCrear.layout = AppContainer;

export default PagosCrear;
