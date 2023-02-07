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
import { Button, Form, Input, Select, DatePicker, Space, Checkbox } from 'antd';
import { formItemLayout, tailFormItemLayout } from '../../src/data/pages/contactos/crear/formData';
import { IContactoState } from '../../slices/models/interfaces';
import { guardarContacto, setContacto } from '../../slices/contacto.slice';
import { Dayjs } from 'dayjs';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Provincias } from '../../src/data/pages/contactos/crear/Provincias.constants';

/**
 * TODO
 * [X] TODO MAYUSCULA
 * [X] checkbox de empresa (agregar campo nombre empresa)
 */

interface Props {}
/**
 * Contactos module
 * @return {JSX.Element} Contactos module JSX
 */
function ContactosCrear({}: Props): JSX.Element {
  // State management
  const [empresaChecked, setEmpresaChecked] = useState<boolean>(false);
  const [pais, setPais] = useState<string | undefined>(undefined);
  const [municipios, setMunicipios] = useState<{ value: string; label: string }[]>([]);
  const { isMainSectionLoading } = useSelector((state: RootState) => state.layout);
  const dispatch = useDispatch<AppDispatch>();

  // Form management
  const [form] = Form.useForm<IContactoState['contacto']>();

  const onFinish = (contacto: IContactoState['contacto']) => {
    dispatch(
      setContacto({
        ...contacto,
        dob: empresaChecked ? new Date('2000-01-01').toISOString() : (contacto.dob! as Dayjs).toISOString(),
      })
    );
    dispatch(guardarContacto({ form, setEmpresaChecked }));
  };
  // End Form management

  const handleEmpresaChange = (e: CheckboxChangeEvent) => {
    setEmpresaChecked(e.target.checked);
    if (e.target.checked) {
      form.setFieldValue('eCivil', 'OTRO');
      form.setFieldValue('sexo', 'O');
    } else {
      form.setFieldValue('eCivil', undefined);
      form.setFieldValue('sexo', undefined);
      form.setFieldValue('dob', undefined);
      // form.resetFields();
    }
  };

  const handleVendedorChange = (e: CheckboxChangeEvent) => {
    form.setFieldValue('vendedor', e.target.checked);
  };

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

      <h3 style={{ textAlign: 'center', padding: '20px' }}>Creación de Contacto</h3>

      <section id="crear-contacto" style={{ padding: '10px 30px 10px 0px' }}>
        <Form {...formItemLayout} form={form} name="createContacto" onFinish={onFinish}>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <Form.Item
                name="nombres"
                label={empresaChecked ? 'Nombre' : 'Nombres'}
                tooltip="Primer y/o segundo nombre"
                hasFeedback
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(/^[A-Za-z0-9_@./#&+-]*$/),
                    message: 'Favor ingresar solo letras',
                  },
                  { required: true, message: 'Favor ingrese un nombre', whitespace: true },
                ]}
              >
                <Input
                  onInput={(e) =>
                    ((e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.toUpperCase())
                  }
                  placeholder={empresaChecked ? 'SOLUSERVICES SRL' : 'JOSE JOSE'}
                />
              </Form.Item>

              {empresaChecked ? null : (
                <Form.Item
                  name="apellidos"
                  label="Apellidos"
                  tooltip="Primer y segundo apellido"
                  hasFeedback
                  required={!empresaChecked}
                  rules={[
                    {
                      required: !empresaChecked,
                      pattern: new RegExp(/^[a-zA-Z\s]*$/),
                      message: 'Favor ingresar solo letras',
                    },
                    {
                      required: !empresaChecked,
                      message: 'Favor ingrese un apellido',
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    onInput={(e) =>
                      ((e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.toUpperCase())
                    }
                    placeholder="PEREZ PEREZ"
                  />
                </Form.Item>
              )}

              <Form.Item
                name="cedula"
                label="Cédula"
                tooltip="Cédula Electoral"
                hasFeedback
                rules={[
                  { required: true, message: 'Favor ingrese la cédula' },
                  { max: 13, message: 'No se permiten más dígitos' },
                  {
                    pattern: new RegExp(/^\d{3}-\d{7}-\d{1}$/),
                    message: 'Usar formato xxx-xxxxxxx-x',
                  },
                ]}
              >
                <Input placeholder="XXX-XXXXXXX-X" />
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
                <Input placeholder="XXXXXXXXXXX" allowClear />
              </Form.Item>

              {empresaChecked ? null : (
                <Form.Item
                  name="dob"
                  label="Fecha de nacimiento"
                  rules={[{ type: 'object' as const, required: true, message: 'Favor ingresar una fecha' }]}
                  hasFeedback
                >
                  <DatePicker placeholder="YYYY-MM-DD" />
                </Form.Item>
              )}

              {empresaChecked ? null : (
                <Form.Item
                  name="eCivil"
                  label="Estado Civil"
                  rules={[{ required: true, message: 'Favor escoger una opción' }]}
                >
                  <Select
                    placeholder="estado civil"
                    allowClear
                    options={[
                      { value: 'SO', label: 'Soltero' },
                      { value: 'CA', label: 'Casado' },
                      { value: 'DI', label: 'Divorciado' },
                      { value: 'VI', label: 'Viudo' },
                      { value: 'UN', label: 'Unión libre' },
                      { value: 'OTRO', label: 'Otro' },
                    ]}
                  />
                </Form.Item>
              )}

              {empresaChecked ? null : (
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
              )}

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    type: 'email',
                    message: 'email no válido',
                  },
                ]}
              >
                <Input
                  onInput={(e) =>
                    ((e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.toLowerCase())
                  }
                  autoComplete="off"
                  placeholder="Correo electrónico"
                />
              </Form.Item>

              <Form.Item
                name="cel"
                label="Celular"
                tooltip="Número de celular"
                hasFeedback
                rules={[
                  { min: 10, message: 'No se permiten más dígitos' },
                  {
                    required: true,
                    pattern: new RegExp(/^(\+\d{1,3}[\s-])?\(?\d{3}\)?-\d{3}-\d{4}$/),
                    message: 'Usar formato xxx-xxx-xxxx',
                  },
                  // {
                  //   required: true,
                  //   pattern: new RegExp(/^(\+\d{1,3}[\s-])?[8][0,2,4].*$/),
                  //   message: 'Usar solo 809/829/849',
                  // },
                ]}
              >
                <Input placeholder="xxx-xxx-xxxx" />
              </Form.Item>

              <Form.Item
                name="tel"
                label="Telefono"
                tooltip="Número de telefono residencial/referencia"
                hasFeedback
                rules={[
                  { max: 12, message: 'No se permiten más dígitos' },
                  {
                    required: false,
                    pattern: new RegExp(/^(\+\d{1,3}[\s-])?\(?\d{3}\)?-\d{3}-\d{4}$/),
                    message: 'Usar formato xxx-xxx-xxxx',
                  },
                  // {
                  //   pattern: new RegExp(/^[8][0,2,4].*$/),
                  //   message: 'Usar solo 809/829/849',
                  // },
                ]}
              >
                <Input placeholder="xxx-xxx-xxxx" />
              </Form.Item>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <Form.Item
                name={['direccion', 'pais', 'nombre']}
                label="País"
                tooltip="País en el que reside"
                rules={[{ required: true, message: 'Favor escoger una opción' }]}
              >
                <Select
                  placeholder="selecciona un pais"
                  allowClear
                  options={[{ value: 'REPUBLICA DOMINICANA', label: 'REPUBLICA DOMINICANA' }]}
                  onChange={(record) => setPais(record)}
                />
              </Form.Item>

              {pais ? (
                <Form.Item
                  name={['direccion', 'region', 'nombre']}
                  label="Región"
                  rules={[{ required: true, message: 'Favor escoger una opción' }]}
                >
                  <Select
                    placeholder="selecciona una región"
                    allowClear
                    options={[
                      { value: 'NORTE (CIBAO)', label: 'NORTE (CIBAO)' },
                      { value: 'SUR', label: 'SUR' },
                      { value: 'ESTE', label: 'ESTE' },
                    ]}
                  />
                </Form.Item>
              ) : null}

              {pais ? (
                <Form.Item
                  name={['direccion', 'provincia', 'nombre']}
                  label="Provincia"
                  rules={[{ required: true, message: 'Favor escoger una opción' }]}
                >
                  <Select
                    showSearch
                    allowClear
                    placeholder="selecciona un provincia"
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    options={[
                      ...Provincias.map((item) => ({ value: item.codigo, label: item.nombre })),
                      { value: 'OTRO', label: 'OTRO' },
                    ]}
                    onChange={() => {
                      const value = Provincias.find(
                        (p) => p.nombre === form.getFieldValue('direccion').provincia.nombre
                      )?.municipios.map((p) => ({ value: p.codigo, label: p.nombre }));
                      setMunicipios(value || []);
                    }}
                  />
                </Form.Item>
              ) : null}

              {municipios.length > 0 ? (
                <Form.Item
                  name={['direccion', 'municipio', 'nombre']}
                  label="Municipio"
                  rules={[{ required: true, message: 'Favor escoger una opción' }]}
                >
                  <Select allowClear placeholder="selecciona un municipio" options={municipios} />
                </Form.Item>
              ) : null}

              <Form.Item
                name={['direccion', 'sector']}
                label="Sector/Barrio"
                tooltip="Nombre del sector donde reside"
                hasFeedback
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(/^[a-zA-z0-9\s.#]*$/),
                    message: 'Formato inválido',
                  },
                  { required: true, message: 'Favor ingrese un sector', whitespace: true },
                ]}
              >
                <Input
                  onInput={(e) =>
                    ((e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.toUpperCase())
                  }
                  placeholder="VILLA JUANA"
                />
              </Form.Item>

              <Form.Item
                name={['direccion', 'calle']}
                label="Calle"
                tooltip="Nombre de la calle donde reside"
                hasFeedback
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(/^[a-zA-z0-9\s.#]*$/),
                    message: 'Formato inválido',
                  },
                  { required: true, message: 'Favor ingrese una calle', whitespace: true },
                ]}
              >
                <Input
                  onInput={(e) =>
                    ((e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.toUpperCase())
                  }
                  placeholder="CALLE AMAPOLA #7"
                />
              </Form.Item>

              <Form.Item name="referencia" label="Punto de referencia" rules={[{}]}>
                <Input.TextArea
                  onInput={(e) =>
                    ((e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.toUpperCase())
                  }
                  placeholder="CASI ESQUINA CON LA SALVIA, DETRAS DEL BRAVO."
                />
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

              <Form.Item valuePropName="checked" name="empresa" label="Es una empresa">
                <Checkbox onChange={handleEmpresaChange} />
              </Form.Item>

              <Form.Item valuePropName="checked" name="vendedor" label="Es vendedor">
                <Checkbox onChange={handleVendedorChange} />
              </Form.Item>
            </div>
          </div>

          <Form.Item {...tailFormItemLayout}>
            <Space style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="primary" htmlType="submit">
                Crear
              </Button>
              <Button
                onClick={() => {
                  form.resetFields();
                  setEmpresaChecked(false);
                  // setVendedorChecked(false);
                }}
              >
                Limpiar
              </Button>
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
