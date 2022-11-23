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
// import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, DatePicker, Space } from 'antd';
import { formItemLayout, tailFormItemLayout } from '../../src/data/pages/contactos/crear/formData';
import { IContactoState } from '../../slices/models/interfaces';
import { guardarContacto, setContacto } from '../../slices/contacto.slice';
import { Dayjs } from 'dayjs';

const { Option } = Select;

interface Props {}

/**
 * Contactos module
 * @return {JSX.Element} Contactos module JSX
 */
function ContactosCrear({}: Props): JSX.Element {
  // State management
  const { isMainSectionLoading } = useSelector((state: RootState) => state.layout);
  const dispatch = useDispatch<AppDispatch>();

  // Form management

  const [form] = Form.useForm<IContactoState['contacto']>();

  const onFinish = (contacto: IContactoState['contacto']) => {
    dispatch(
      setContacto({
        ...contacto,
        dob: (contacto.dob! as Dayjs).toISOString(),
      })
    );
    dispatch(guardarContacto(form));
  };

  // End Form management
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
        <title>Plan Ocaso | Crear Contacto</title>
      </Head>

      <h3 style={{ textAlign: 'center', padding: '20px' }}>Creación de Contacto/Contratante</h3>

      <section id="crear-contacto" style={{ padding: '10px 10px 10px 0px' }}>
        <Form {...formItemLayout} form={form} name="createContact" onFinish={onFinish}>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Form.Item
                name="nombres"
                label="Nombres"
                tooltip="Primer y/o segundo nombre"
                hasFeedback
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(/^[a-zA-Z\s]*$/),
                    message: 'Favor ingresar solo letras',
                  },
                  { required: true, message: 'Favor ingrese un nombre', whitespace: true },
                ]}
              >
                <Input placeholder="Juan José" />
              </Form.Item>

              <Form.Item
                name="apellidos"
                label="Apellidos"
                tooltip="Primer y segundo apellido"
                hasFeedback
                rules={[
                  { required: true, pattern: new RegExp(/^[a-zA-Z\s]*$/), message: 'Favor ingresar solo letras' },
                  { required: true, message: 'Favor ingrese un apellido', whitespace: true },
                ]}
              >
                <Input placeholder="Perez Perez" />
              </Form.Item>

              <Form.Item
                name="cedula"
                label="Cédula"
                tooltip="Cédula Electoral"
                rules={[
                  { required: true, message: 'Favor ingrese la cédula' },
                  { max: 13, message: 'No se permiten más dígitos' },
                  {
                    pattern: new RegExp(/^\d{3}-\d{7}-\d{1}$/),
                    message: 'Usar formato xxx-xxxxxxx-x',
                  },
                ]}
              >
                <Input placeholder="xxx-xxxxxxx-x" />
              </Form.Item>

              <Form.Item
                name="rnc"
                label="RNC"
                tooltip="Número de Registro Nacional de Contribuyentes"
                required={false}
                rules={[
                  { max: 11, message: 'No se permiten más dígitos' },
                  { required: false, pattern: new RegExp(/^[0-9]*$/), message: 'Favor ingresar solo números' },
                ]}
              >
                <Input placeholder="22300344078" />
              </Form.Item>

              <Form.Item
                name="dob"
                label="Fecha de nacimiento"
                rules={[{ type: 'object' as const, required: true, message: 'Favor ingresar una fecha' }]}
                hasFeedback
              >
                <DatePicker placeholder="YYYY-MM-DD" />
              </Form.Item>

              <Form.Item
                name="eCivil"
                label="Estado Civil"
                rules={[{ required: true, message: 'Favor escoger una opción' }]}
              >
                <Select placeholder="estado civil" allowClear>
                  <Option value="SO">Soltero</Option>
                  <Option value="CA">Casado</Option>
                  <Option value="DI">Divorciado</Option>
                  <Option value="VI">Viudo</Option>
                  <Option value="UN">Unión libre</Option>
                  <Option value="O">Otro</Option>
                </Select>
              </Form.Item>

              <Form.Item name="sexo" label="Género" rules={[{ required: true, message: 'Favor escoger una opción' }]}>
                <Select
                  allowClear
                  placeholder="selecciona un género"
                  options={[
                    { value: 'M', label: 'Masculino' },
                    { value: 'F', label: 'Femenino' },
                    { value: 'O', label: 'Otro' },
                  ]}
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                hasFeedback
                rules={[
                  {
                    type: 'email',
                    message: 'email no válido',
                  },
                  {
                    required: true,
                    message: 'Favor ingresar un email',
                  },
                ]}
              >
                <Input autoComplete="off" placeholder="Correo electrónico" />
              </Form.Item>

              <Form.Item
                name="cel"
                label="Celular"
                tooltip="Número de celular"
                hasFeedback
                rules={[
                  { max: 12, message: 'No se permiten más dígitos' },
                  {
                    required: true,
                    pattern: new RegExp(/^\d{3}-\d{3}-\d{4}$/),
                    message: 'Usar formato xxx-xxx-xxxx',
                  },
                  {
                    required: true,
                    pattern: new RegExp(/^[8][0,2,4].*$/),
                    message: 'Usar solo 809/829/849',
                  },
                ]}
              >
                <Input placeholder="xxx-xxx-xxxx" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name={['direccion', 'calle']}
                label="Calle"
                tooltip="Nombre de la calle donde reside"
                hasFeedback
                rules={[
                  { required: true, pattern: new RegExp(/^[a-zA-z0-9\s.#]*$/), message: 'Formato inválido' },
                  { required: true, message: 'Favor ingrese una calle', whitespace: true },
                ]}
              >
                <Input placeholder="Calle Amapola #7" />
              </Form.Item>

              <Form.Item
                name={['direccion', 'sector']}
                label="Sector"
                tooltip="Nombre del sector donde reside"
                hasFeedback
                rules={[
                  { required: true, pattern: new RegExp(/^[a-zA-z0-9\s.#]*$/), message: 'Formato inválido' },
                  { required: true, message: 'Favor ingrese un sector', whitespace: true },
                ]}
              >
                <Input placeholder="Villa Juana" />
              </Form.Item>

              <Form.Item
                name={['direccion', 'zip']}
                label="Código postal"
                tooltip="Código postal del sector donde reside"
                hasFeedback
                rules={[{ pattern: new RegExp(/^[\d]{0,5}$/), message: 'Formato inválido' }]}
              >
                <Input placeholder="11000" />
              </Form.Item>

              <Form.Item
                name={['direccion', 'pais', 'codigo']}
                label="pais"
                rules={[{ required: true, message: 'Favor escoger una opción' }]}
              >
                <Select placeholder="selecciona un pais" allowClear>
                  <Option value="RD">República Dominicana</Option>
                  <Option value="O">Otro</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name={['direccion', 'region', 'codigo']}
                label="Región"
                rules={[{ required: true, message: 'Favor escoger una opción' }]}
              >
                <Select placeholder="selecciona una región" allowClear>
                  <Option value="N">Norte/Cibao</Option>
                  <Option value="S">Sur</Option>
                  <Option value="E">Este</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name={['direccion', 'provincia', 'codigo']}
                label="Provincia"
                rules={[{ required: true, message: 'Favor escoger una opción' }]}
              >
                <Select placeholder="selecciona un provincia" allowClear>
                  <Option value="SD">Santo Domingo</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name={['direccion', 'municipio', 'codigo']}
                label="Municipio"
                rules={[{ required: true, message: 'Favor escoger una opción' }]}
              >
                <Select placeholder="selecciona un municipio" allowClear>
                  <Option value="DN">Distrito Nacional</Option>
                  <Option value="SDN">Santo Domingo Norte</Option>
                  <Option value="SDE">Santo Domingo Este</Option>
                  <Option value="SDO">Santo Domingo Oeste</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="tel"
                label="Telefono"
                tooltip="Número de telefono residencial"
                hasFeedback
                rules={[
                  { max: 12, message: 'No se permiten más dígitos' },
                  {
                    pattern: new RegExp(/^\d{3}-\d{3}-\d{4}$/),
                    message: 'Usar formato xxx-xxx-xxxx',
                  },
                  {
                    pattern: new RegExp(/^[8][0,2,4].*$/),
                    message: 'Usar solo 809/829/849',
                  },
                ]}
              >
                <Input placeholder="xxx-xxx-xxxx" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item {...tailFormItemLayout}>
            <Space style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="primary" htmlType="submit">
                Crear
              </Button>
              <Button onClick={() => form.resetFields()}>Limpiar</Button>
            </Space>
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

ContactosCrear.layout = AppContainer;

export default ContactosCrear;
