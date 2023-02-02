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
import { PaginatedResult } from '../../src/models/types.model';
import type { IContacto } from '../../src/models/interfaces.model';
import type { ColumnsType } from 'antd/es/table/interface';
import { verContactos } from '../../slices/contacto.slice';
import GeneralTable from '../../src/Components/Table/GeneralTable';

interface Props {
  initialData?: PaginatedResult<IContacto>;
}

const columns: ColumnsType<IContacto> = [
  {
    title: 'Nombres',
    dataIndex: 'nombres',
    key: 'nombres',
    sorter: true,
    width: '20%',
  },
  {
    title: 'Apellidos',
    dataIndex: 'apellidos',
    key: 'apellidos',
    sorter: true,
    width: '20%',
  },
  {
    title: 'Sexo',
    dataIndex: 'sexo',
    key: 'sexo',
    filterMultiple: false,
    filters: [
      { text: 'Masculino', value: 'M' },
      { text: 'Femenino', value: 'F' },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Es Empresa',
    dataIndex: 'empresa',
    key: 'empresa',
    filterMultiple: false,
    filters: [
      { text: 'Si', value: true },
      { text: 'No', value: false },
    ],
    width: '20%',
    render: (value) => (value ? 'Si' : 'No'),
  },
];

/**
 * Contactos module
 * @return {JSX.Element} Contactos module JSX
 */
function ContactosVer({ initialData }: Props): JSX.Element {
  const { isMainSectionLoading } = useSelector((state: RootState) => state.layout);
  const { contactos } = useSelector((state: RootState) => state.contacto);

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
        <title>Plan Ocaso | Ver Contactos</title>
      </Head>
      <h3 style={{ textAlign: 'center', padding: '20px' }}>Listado de Contactos</h3>
      <section className="ver-contactos">
        <GeneralTable
          columns={columns}
          data={contactos.results}
          getValues={verContactos}
          rowKey={(record) => record.cedula}
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

ContactosVer.layout = AppContainer;

export default ContactosVer;
