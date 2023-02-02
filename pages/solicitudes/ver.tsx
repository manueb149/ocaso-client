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
import type { ColumnsType } from 'antd/es/table/interface';
import type { ISolicitud } from '../../src/models/interfaces.model';
import GeneralTable from '../../src/Components/Table/GeneralTable';
import { verSolicitudes } from '../../slices/solicitud.slice';

interface Props {}

const columns: ColumnsType<ISolicitud> = [
  {
    title: 'No. Solicitud',
    dataIndex: 'numSolicitud',
    key: 'numSolicitud',
    sorter: true,
    width: '20%',
  },
  {
    title: 'Contratante',
    dataIndex: 'contratante',
    key: 'contratante',
    sorter: true,
    width: '20%',
  },
  {
    title: 'Vendedor',
    dataIndex: 'vendedor',
    key: 'vendedor',
    sorter: true,
    width: '20%',
  },
  { title: 'Desde', dataIndex: 'desde', key: 'desde' },
  { title: 'Hasta', dataIndex: 'hasta', key: 'hasta' },
];

/**
 * Solicitudes module
 * @return {JSX.Element} Solicitudes module JSX
 */
function SolicitudesVer({}: Props): JSX.Element {
  const { isMainSectionLoading } = useSelector((state: RootState) => state.layout);
  const { solicitudes } = useSelector((state: RootState) => state.solicitud);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setMainSectionLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isMainSectionLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Plan Ocaso | Ver Solicitudes</title>
      </Head>
      <h3 style={{ textAlign: 'center', padding: '20px' }}>Listado de Solicitudes</h3>
      <section className="ver-solicitudes">
        <GeneralTable
          columns={columns}
          data={solicitudes.results}
          getValues={verSolicitudes}
          rowKey={(record, i) => record.contratante + i}
        />
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

SolicitudesVer.layout = AppContainer;

export default SolicitudesVer;
