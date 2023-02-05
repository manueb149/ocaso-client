import { GetServerSideProps } from 'next';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import Head from 'next/head';
import { authOptions } from '../api/auth/[...nextauth]';
import AppContainer from '../../src/Layout/AppContainer/AppContainer';
import ContactoDashboard from '../../src/Components/Contactos/ContactoDashboard';

interface Props {}

/**
 * Contactos module
 * @return {JSX.Element} Contactos module JSX
 */
function Contactos({}: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>Plan Ocaso | Contactos</title>
      </Head>
      <h3 style={{ textAlign: 'center', padding: '20px' }}>Gestión de Contactos</h3>
      <ContactoDashboard />
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

Contactos.layout = AppContainer;

export default Contactos;
