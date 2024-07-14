import { GetServerSideProps } from 'next';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import Head from 'next/head';
import { authOptions } from '../api/auth/[...nextauth]';
import AppContainer from '../../src/Layout/AppContainer/AppContainer';
import { AppDispatch, RootState } from '../../config/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setMainSectionLoading } from '../../slices/layout.slice';
import Loading from '../../src/Components/Loading/Loading';
import { Segmented, Space } from 'antd';
import Individual from '../../src/Components/Solicitudes/Individual/Individual';
import Colectivo from '../../src/Components/Solicitudes/Colectivo/Colectivo';
import { IPlan } from '../../src/models/interfaces.model';
import { planesGet } from '../api/planes';

interface Props {
  planes: IPlan[];
}

/**
 * Solicitudes module
 * @return {JSX.Element} Solicitudes module JSX
 */
function SolicitudesCrear({ planes }: Props): JSX.Element {
  // State management
  const [plan, setPlan] = useState<string>('PLAN INDIVIDUAL/FAMILIAR');
  const { isMainSectionLoading } = useSelector((state: RootState) => state.layout);
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
        <title>Plan Ocaso | Crear Solicitud</title>
      </Head>
      <h3 style={{ textAlign: 'center', padding: '20px' }}>Creación de Solicitud</h3>
      <section id="crear-solicitud" style={{ padding: '10px 0px 0px 10px' }}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Segmented
            style={{ fontWeight: 'bold' }}
            block
            value={plan}
            onChange={(value) => {
              setPlan(value as string);
            }}
            options={['PLAN INDIVIDUAL/FAMILIAR', 'PLAN EMPRESARIAL/COLECTIVO']}
            onResize={undefined}
            onResizeCapture={undefined}
          />
          {plan === 'PLAN INDIVIDUAL/FAMILIAR' ? <Individual planes={planes} plan={plan} /> : <Colectivo />}
        </Space>
      </section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  const { response, data, error } = await planesGet(req, res, session);

  if (!session || !response?.ok || error) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: { planes: JSON.parse(JSON.stringify(data)) },
  };
};

SolicitudesCrear.layout = AppContainer;

export default SolicitudesCrear;
