import { GetServerSideProps } from 'next';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import Head from 'next/head';
import { authOptions } from '../api/auth/[...nextauth]';
import AppContainer from '../../src/Layout/AppContainer/AppContainer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../config/configureStore';
import { setMainSectionLoading } from '../../slices/layout.slice';
import { useEffect } from 'react';
import Loading from '../../src/Components/Loading/Loading';
import TableContacto from '../../src/Components/Table/TableContacto';

/**
 * Contactos module
 * @return {JSX.Element} Contactos module JSX
 */
function ContactosVer(): JSX.Element {
  const { isMainSectionLoading } = useSelector((state: RootState) => state.layout);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setMainSectionLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isMainSectionLoading) {
    return <Loading />;
  }
  // console.log(contactos);
  return (
    <>
      <Head>
        <title>Plan Ocaso | Ver Contactos</title>
      </Head>
      <h3 style={{ textAlign: 'center', padding: '20px 20px 10px 20px' }}>Listado de Contactos</h3>
      <section className="ver-contactos">
        <TableContacto />
      </section>
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

ContactosVer.layout = AppContainer;

export default ContactosVer;
