import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, FormInstance, Input, Select, Space } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

interface Props {
  name: string;
  form: FormInstance;
  next: () => void;
}

export const DependientesOptions: DefaultOptionType[] = [
  { value: 'AB', label: 'Abuelo/Abuela' },
  { value: 'PM', label: 'Padre/Madre' },
  { value: 'HE', label: 'Hermano/Hermana' },
  { value: 'HI', label: 'Hijo/Hija' },
  { value: 'NI', label: 'Nieto/Nieta' },
  { value: 'TI', label: 'Tío/Tía' },
  { value: 'SO', label: 'Sobrino/Sobrina' },
  { value: 'ES', label: 'Esposo/Esposa' },
  { value: 'YN', label: 'Yerno/Nuera' },
  { value: 'SU', label: 'Suegro/Suegra' },
  { value: 'CU', label: 'Cuñado/Cuñada' },
  { value: 'OTRO', label: 'Otro' },
];

export const SexoOptions: DefaultOptionType[] = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
  { value: 'O', label: 'Otro' },
];

/**
 * Dependientes form step screen.
 * @return {JSX.Element} Loading screen JSX
 */
const Dependientes: React.FC<Props> = ({ name, form, next }): JSX.Element => {
  return (
    <Form name={name} form={form} autoComplete="off" onFinish={next}>
      <Form.List name="inscritos">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: 'flex',
                }}
                align="start"
                size="small"
                wrap
              >
                <Form.Item
                  {...restField}
                  hasFeedback
                  name={[name, 'nombre']}
                  style={{ width: '300px', padding: '0 4px', marginBottom: '0' }}
                  rules={[{ required: true, message: 'Favor ingresar el nombre' }]}
                >
                  <Input
                    onInput={(e) =>
                      ((e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.toUpperCase())
                    }
                    placeholder="NOMBRE Y APELLIDO"
                  />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'cedula']}
                  rules={[
                    { max: 13, message: 'No se permiten más dígitos' },
                    {
                      pattern: new RegExp(/^\d{3}-\d{7}-\d{1}$/),
                      message: 'Usar formato xxx-xxxxxxx-x',
                    },
                  ]}
                >
                  <Input placeholder="XXX-XXXXXXXX-X" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  hasFeedback
                  name={[name, 'dob']}
                  style={{ width: '150px', padding: '0 4px', marginBottom: '0' }}
                  rules={[{ required: true, message: 'Favor ingresar una fecha' }]}
                >
                  <DatePicker placeholder="DD/MM/YYYY" format="DD/MM/YYYY" allowClear />
                </Form.Item>

                <Form.Item
                  {...restField}
                  hasFeedback
                  name={[name, 'sexo']}
                  style={{ width: '140px', padding: '0 4px', marginBottom: '0' }}
                  rules={[{ required: true, message: 'Favor escoger una opción' }]}
                >
                  <Select placeholder="selecciona un género" options={SexoOptions} />
                </Form.Item>

                <Form.Item
                  {...restField}
                  hasFeedback
                  name={[name, 'parentezco']}
                  style={{ width: '190px', padding: '0 4px', marginBottom: '0' }}
                  rules={[{ required: true, message: 'Favor llenar el campo' }]}
                >
                  <Select placeholder="selecciona un parentezco" options={DependientesOptions} />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Añadir Dependiente
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default Dependientes;
