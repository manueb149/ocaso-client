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
import { Button, Form, Input, Select, DatePicker, Space, Result, Segmented } from 'antd';
import { formItemLayout, tailFormItemLayout } from '../../src/data/pages/contactos/crear/formData';
import { IContactoState } from '../../slices/models/interfaces';
import { editarContacto, setEditContacto } from '../../slices/contacto.slice';
import dayjs, { Dayjs } from 'dayjs';
import { Provincias } from '../../src/data/pages/contactos/crear/Provincias.constants';
import { useRouter } from 'next/router';

interface Props {}
/**
 * Contactos module
 * @return {JSX.Element} Contactos module JSX
 */
function ContactosEditar({}: Props): JSX.Element {
  const { isMainSectionLoading } = useSelector((state: RootState) => state.layout);
  const { editContacto } = useSelector((state: RootState) => state.contacto);

  const [empresaChecked, setEmpresaChecked] = useState<boolean>(editContacto?.empresa ?? false);
  // eslint-disable-next-line no-unused-vars
  const [_, setVendedorChecked] = useState<boolean>(editContacto?.vendedor ?? false);
  const [pais, setPais] = useState<string | undefined>(editContacto?.direccion?.pais?.nombre ?? undefined);
  const [municipios, setMunicipios] = useState<{ value: string; label: string }[]>(
    Provincias.find((p) => p.nombre === editContacto?.direccion?.provincia?.nombre)?.municipios.map((p) => ({
      value: p.codigo,
      label: p.nombre,
    })) ?? []
  );
  const [tipoContacto, setTipoContacto] = useState<string>(
    editContacto?.empresa ? 'EMPRESA' : editContacto?.vendedor ? 'VENDEDOR' : 'CLIENTE'
  );

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Form management
  const [form] = Form.useForm<IContactoState['contacto']>();

  const onFinish = (contacto: IContactoState['editContacto']) => {
    const dob = empresaChecked
      ? contacto?.dob && '01/01/2000'
      : contacto?.dob && (contacto.dob! as Dayjs).locale('es-DO').format('DD/MM/YYYY');
    // form.setFieldValue('id', contactoId);
    dispatch(
      editarContacto({
        contacto: { ...contacto!, dob, id: editContacto?.id },
        form,
        setEmpresaChecked,
        setVendedorChecked,
      })
    );
  };

  const handleClear = () => {
    router.push('/contactos/ver');
  };
  // End Form management

  useEffect(() => {
    dispatch(setMainSectionLoading(false));
    return () => {
      setEditContacto(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isMainSectionLoading) {
    return <Loading />;
  }
  if (!editContacto) {
    return (
      <Result
        status="500"
        title="Ups!"
        subTitle="Lo sentimos, al parecer no ha elegido un contacto para editar."
        extra={
          <Button
            type="primary"
            onClick={() => {
              router.push('/contactos/ver');
            }}
          >
            Volver
          </Button>
        }
      />
    );
  }

  return (
    <>
      <Head>
        <title>Plan Ocaso | Editar Contacto</title>
      </Head>

      <h3 style={{ textAlign: 'center', padding: '20px' }}>Creación de Contacto</h3>

      <section id="editar-contacto" style={{ padding: '10px 30px 10px 0px' }}>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Segmented
            style={{ fontWeight: 'bold', marginBottom: '40px' }}
            block
            value={tipoContacto}
            onChange={(value) => {
              switch (value as string) {
                case 'CLIENTE':
                  if (empresaChecked) form.setFieldValue('eCivil', undefined);
                  if (empresaChecked) form.setFieldValue('sexo', undefined);
                  if (empresaChecked) form.setFieldValue('dob', undefined);
                  form.setFieldValue('empresa', false);
                  form.setFieldValue('vendedor', false);
                  dispatch(
                    setEditContacto({
                      ...editContacto,
                      empresa: false,
                      vendedor: false,
                    })
                  );
                  setEmpresaChecked(false);
                  setVendedorChecked(false);

                  break;
                case 'EMPRESA':
                  form.setFieldValue('empresa', true);
                  form.setFieldValue('vendedor', false);
                  form.setFieldValue('eCivil', 'OTRO');
                  form.setFieldValue('sexo', 'O');
                  setEmpresaChecked(true);
                  setVendedorChecked(false);
                  dispatch(
                    setEditContacto({
                      ...editContacto,
                      empresa: true,
                      vendedor: false,
                    })
                  );
                  break;
                case 'VENDEDOR':
                  if (empresaChecked) form.setFieldValue('eCivil', undefined);
                  if (empresaChecked) form.setFieldValue('sexo', undefined);
                  if (empresaChecked) form.setFieldValue('dob', undefined);
                  form.setFieldValue('empresa', false);
                  form.setFieldValue('vendedor', true);
                  dispatch(
                    setEditContacto({
                      ...editContacto,
                      empresa: false,
                      vendedor: true,
                    })
                  );
                  setEmpresaChecked(false);
                  setVendedorChecked(true);

                  break;
              }
              setTipoContacto(value as string);
            }}
            options={['CLIENTE', 'EMPRESA', 'VENDEDOR']}
            onResize={undefined}
            onResizeCapture={undefined}
          />
        </Space>
        <Form
          {...formItemLayout}
          form={form}
          name="editContacto"
          initialValues={{
            ...editContacto,
            dob: editContacto?.dob && dayjs(editContacto.dob, 'DD/MM/YYYY'),
          }}
          onFinish={onFinish}
          onChange={() => {
            const contacto: IContactoState['contacto'] = form.getFieldsValue();
            const dob = contacto.dob && (contacto.dob! as Dayjs).format('DD/MM/YYYY');
            dispatch(setEditContacto({ ...contacto, dob, direccion: contacto.direccion }));
          }}
        >
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
                    pattern: new RegExp(/^[A-Za-z0-9_@./#&+-\s]*$/),
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
                    pattern: new RegExp(/^\d{3}-{0,1}\d{7}-{0,1}\d{1}$/),
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
                  <DatePicker
                    placeholder="DD/MM/YYYY"
                    format="DD/MM/YYYY"
                    onChange={(value) => {
                      dispatch(
                        setEditContacto({
                          ...editContacto!,
                          dob: value?.format('DD/MM/YYYY'),
                        })
                      );
                    }}
                  />
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
                      { value: 'SOLTERO(A)', label: 'SOLTERO(A)' },
                      { value: 'CASADO(A)', label: 'CASADO(A)' },
                      { value: 'DIVORCIADO(A)', label: 'DIVORCIADO(A)' },
                      { value: 'VIUDO(A)', label: 'VIUDO(A)' },
                      { value: 'UNION LIBRE', label: 'UNION LIBRE' },
                      { value: 'OTRO', label: 'OTRO' },
                    ]}
                    onChange={(record) => {
                      dispatch(setEditContacto({ ...editContacto!, eCivil: record }));
                    }}
                  />
                </Form.Item>
              )}

              {empresaChecked ? null : (
                <Form.Item name="sexo" label="Género" rules={[{ required: true, message: 'Favor escoger una opción' }]}>
                  <Select
                    allowClear
                    placeholder="selecciona un género"
                    options={[
                      { value: 'M', label: 'MASCULINO' },
                      { value: 'F', label: 'FEMENINO' },
                      { value: 'O', label: 'OTRO' },
                    ]}
                    onChange={(record) => {
                      dispatch(setEditContacto({ ...editContacto!, sexo: record }));
                    }}
                  />
                </Form.Item>
              )}

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: false,
                    type: 'email',
                    message: 'email no válido',
                  },
                ]}
                required={false}
              >
                <Input
                  onInput={(e) =>
                    ((e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.toLowerCase())
                  }
                  autoComplete="off"
                  placeholder="correo electrónico"
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
                  onChange={(record) => {
                    setPais(record);
                    // eslint-disable-next-line no-unused-vars
                    const { pais, ...rest } = editContacto!.direccion;
                    dispatch(
                      setEditContacto({
                        ...editContacto!,
                        direccion: { ...rest, pais: { nombre: record } },
                      })
                    );
                  }}
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
                    onChange={(record) => {
                      // eslint-disable-next-line no-unused-vars
                      const { region, ...rest } = editContacto!.direccion;
                      dispatch(
                        setEditContacto({
                          ...editContacto!,
                          direccion: { ...rest, ...(record && { region: { nombre: record } }) },
                        })
                      );
                    }}
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
                    onChange={(record) => {
                      const value = Provincias.find(
                        (p) => p.nombre === form.getFieldValue('direccion')?.provincia?.nombre
                      )?.municipios.map((p) => ({ value: p.codigo, label: p.nombre }));
                      setMunicipios(value || []);
                      // eslint-disable-next-line no-unused-vars
                      const { provincia, municipio, ...rest } = editContacto!.direccion;
                      dispatch(
                        setEditContacto({
                          ...editContacto!,
                          direccion: { ...rest, ...(record && { provincia: { nombre: record } }) },
                        })
                      );
                      form.setFieldValue(['direccion', 'municipio', 'nombre'], undefined);
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
                  <Select
                    allowClear
                    placeholder="selecciona un municipio"
                    options={municipios}
                    onChange={(record) => {
                      dispatch(
                        setEditContacto({
                          ...editContacto!,
                          direccion: { ...editContacto!.direccion, municipio: { nombre: record } },
                        })
                      );
                    }}
                  />
                </Form.Item>
              ) : null}

              {pais ? (
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
              ) : null}

              {pais ? (
                <Form.Item
                  name={['direccion', 'calle']}
                  label="Calle"
                  tooltip="Nombre de la calle donde reside"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      pattern: new RegExp(/^[A-Za-z0-9_@.,/#&+-\s]*$/),
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
              ) : null}

              {pais ? (
                <Form.Item name={['direccion', 'referencia']} label="Punto de referencia" rules={[{}]}>
                  <Input.TextArea
                    onInput={(e) =>
                      ((e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.toUpperCase())
                    }
                    placeholder="CASI ESQUINA CON LA SALVIA, DETRAS DEL BRAVO."
                  />
                </Form.Item>
              ) : null}

              {pais ? (
                <Form.Item
                  name={['direccion', 'zip']}
                  label="Código postal"
                  tooltip="Código postal del sector donde reside"
                  hasFeedback
                  rules={[{ pattern: new RegExp(/^[\d]{0,5}$/), message: 'Formato inválido' }]}
                >
                  <Input placeholder="11000" />
                </Form.Item>
              ) : null}
              <Form.Item style={{ visibility: 'hidden' }} name="id" label="ID"></Form.Item>
              <Form.Item style={{ visibility: 'hidden' }} name="empresa" label="ID"></Form.Item>
              <Form.Item style={{ visibility: 'hidden' }} name="vendedor" label="ID"></Form.Item>
            </div>
          </div>

          <Form.Item {...tailFormItemLayout}>
            <Space style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="primary" htmlType="submit">
                Actualizar
              </Button>
              <Button onClick={handleClear}>Volver</Button>
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

ContactosEditar.layout = AppContainer;

export default ContactosEditar;
