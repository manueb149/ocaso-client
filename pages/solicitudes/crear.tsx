import { GetServerSideProps } from 'next';
import { unstable_getServerSession as getServerSession } from 'next-auth';
import Head from 'next/head';
import { authOptions } from '../api/auth/[...nextauth]';
import AppContainer from '../../src/Layout/AppContainer/AppContainer';
import { AppDispatch, RootState } from '../../config/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setMainSectionLoading } from '../../slices/layout.slice';
import Loading from '../../src/Components/Loading/Loading';
import { Button, DatePicker, Form, Select, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { RangePicker } = DatePicker;

interface Props {}

/**
 * Solicitudes module
 * @return {JSX.Element} Solicitudes module JSX
 */
function SolicitudesCrear({}: Props): JSX.Element {
  // State management
  const { isMainSectionLoading } = useSelector((state: RootState) => state.layout);
  const dispatch = useDispatch<AppDispatch>();

  // Form management

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
      <h3 style={{ textAlign: 'center' }}>Creación de Solicitudes</h3>
      <section id="crear-solicitud" style={{ padding: '10px 0px 0px 10px' }}>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="vertical"
          // initialValues={{ size: componentSize }}
          // onValuesChange={onFormLayoutChange}
          size="middle"
        >
          <Form.Item label="Contratante">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
              <Select.Option value="012-3456789-0">Juan Perez</Select.Option>
              <Select.Option value="012-3456789-1">Julia Perdomo Perez</Select.Option>
            </Select>
            <Tooltip title="search">
              <Button shape="circle" icon={<SearchOutlined />} />
            </Tooltip>
          </Form.Item>

          <Form.Item label="Plan">
            <Select>
              <Select.Option value="ocaso1">Ocaso I</Select.Option>
              <Select.Option value="ocaso2">Ocaso II</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Fecha de inicio y de término">
            <RangePicker placeholder={['Inicio', 'Término']} />
          </Form.Item>
        </Form>
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

SolicitudesCrear.layout = AppContainer;

export default SolicitudesCrear;
