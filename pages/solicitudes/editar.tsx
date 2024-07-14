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
import { Button, Form, Space, Result, Steps } from 'antd';
import { setEditContacto } from '../../slices/contacto.slice';
import { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import { planesGet } from '../api/planes';
import { IDependientes, IPlan, ISolicitud } from '../../src/models/interfaces.model';
import Contratante from '../../src/Components/Contratante/Contratante';
import Dependientes from '../../src/Components/Dependientes/Dependientes';
import Review from '../../src/Components/Solicitudes/Individual/Review';
import { editarSolicitud } from '../../slices/solicitud.slice';

const steps = [
  {
    title: 'Datos del contratante',
  },
  {
    title: 'Detalles del dependiente',
  },
  {
    title: 'Revisión',
  },
];

interface Props {
  planes: IPlan[];
}
/**
 * Solicitudes module
 * @return {JSX.Element} Solicitudes module JSX
 */
function SolicitudesEditar({ planes }: Props): JSX.Element {
  // State management
  const { isMainSectionLoading } = useSelector((state: RootState) => state.layout);
  const { editSolicitud } = useSelector((state: RootState) => state.solicitud);
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const handleClear = () => {
    router.push('/contactos/ver');
  };
  // End Form management

  useEffect(() => {
    console.log(planes);
    dispatch(setMainSectionLoading(false));
    return () => {
      setEditContacto(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isMainSectionLoading) {
    return <Loading />;
  }
  // if (!editSolicitud) {
  //   return (
  //     <Result
  //       status="500"
  //       title="Ups!"
  //       subTitle="Lo sentimos, al parecer no ha elegido un contacto para editar."
  //       extra={
  //         <Button
  //           type="primary"
  //           onClick={() => {
  //             router.push('/contactos/ver');
  //           }}
  //         >
  //           Volver
  //         </Button>
  //       }
  //     />
  //   );
  // }

  return (
    <>
      <Head>
        <title>Plan Ocaso | Editar Solicitud Individual/Familiar </title>
      </Head>
      <h3 style={{ textAlign: 'center', padding: '20px' }}>Edición de Solicitud</h3>
      <section id="crear-solicitud" style={{ padding: '10px 0px 0px 10px' }}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <IndividualSol planes={planes} plan={'PLAN INDIVIDUAL/FAMILIAR'} />
        </Space>
      </section>
    </>
  );
}

interface IndividualProps {
  planes: IPlan[];
  plan: string;
}
// eslint-disable-next-line require-jsdoc
function IndividualSol({ planes, plan }: IndividualProps) {
  const [formContratante] = Form.useForm();
  const [formDependientes] = Form.useForm();
  const [current, setCurrent] = useState<number>(0);

  const { saving } = useSelector((state: RootState) => state.solicitud);
  const dispatch = useDispatch<AppDispatch>();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div className="row" style={{ margin: '0' }}>
      <div className="col-12">
        <Steps progressDot current={current} items={items} style={{ marginTop: '20px' }} />
        <div className="steps-content" style={{ padding: '25px 0px' }}>
          <Form.Provider>
            <div className="row" style={{ display: current === 0 ? 'flex' : 'none' }}>
              <Contratante name="contratante" form={formContratante} planes={planes} next={next} />
            </div>
            <div className="row" style={{ display: current === 1 ? 'flex' : 'none' }}>
              <Dependientes name="dependiente" form={formDependientes} next={next} />
            </div>
            <div className="row" style={{ display: current === 2 ? 'flex' : 'none' }}>
              <Review
                contratanteInfo={formContratante.getFieldsValue()}
                dependientesInfo={formDependientes.getFieldsValue()?.inscritos ?? []}
              />
            </div>
            <div className="steps-action" style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 0 0' }}>
              {current < steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={() => {
                    if (current === 0) formContratante.submit();
                    if (current === 1) formDependientes.submit();
                  }}
                >
                  Siguiente
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button
                  htmlType="submit"
                  type="primary"
                  disabled={saving}
                  onClick={() => {
                    console.log(plan);
                    const solicitud: ISolicitud = {
                      ...(formContratante.getFieldValue('desde') && {
                        desde: (formContratante.getFieldValue('desde') as Dayjs).format('DD/MM/YYYY'),
                      }),
                      ...(formContratante.getFieldValue('hasta') && {
                        hasta: (formContratante.getFieldValue('hasta') as Dayjs).format('DD/MM/YYYY'),
                      }),
                      inscritos:
                        formDependientes.getFieldValue('inscritos')?.map((inscrito: IDependientes) => ({
                          ...inscrito,
                          dob: (inscrito.dob as Dayjs).format('DD/MM/YYYY'),
                        })) || [],
                      contratante: formContratante.getFieldValue('contratante'),
                      vendedor: formContratante.getFieldValue('vendedor'),
                      plan: {
                        nombre: formContratante.getFieldValue('plan'),
                        valor: formContratante.getFieldValue('valor'),
                        pago: formContratante.getFieldValue('pago'),
                        prima: formContratante.getFieldValue('prima'),
                      },
                      tipoPlan: plan,
                      vigencia: (formContratante.getFieldValue('hasta') as Dayjs)
                        .diff(formContratante.getFieldValue('desde') as Dayjs, 'years', true)
                        .toFixed(1),
                    };
                    dispatch(editarSolicitud({ solicitud, formContratante, formDependientes, setCurrent }));
                  }}
                >
                  Finalizar
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                  Anterior
                </Button>
              )}
            </div>
          </Form.Provider>
        </div>
      </div>
      <div className="col-12"></div>
    </div>
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

SolicitudesEditar.layout = AppContainer;

export default SolicitudesEditar;
