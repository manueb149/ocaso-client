import { DatePicker, Form, FormInstance, Input, Select } from 'antd';
import { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../config/configureStore';
import { formItemLayout } from '../../data/pages/contactos/crear/formData';
import Autocomplete from '../Autocomplete/Autocomplete';
import { IPlan } from '../../models/interfaces.model';

interface Props {
  name: string;
  form: FormInstance;
  planes: IPlan[];
  next: () => void;
}

/**
 * Contratante form step screen.
 * @return {JSX.Element} Loading screen JSX
 */
const Contratante: React.FC<Props> = ({ name, form, planes = [], next }): JSX.Element => {
  const [desde, setFechaInicio] = useState<Dayjs | null>(null);
  const [hasta, setFechaTermino] = useState<Dayjs | null>(null);
  const [montos, setMontos] = useState<number[]>([]);
  const [prima, setPrima] = useState<number | null>(null);
  const { selectedContacto } = useSelector((state: RootState) => state.contacto);

  const onFechaChange = (date: Dayjs | null, type: 'inicio' | 'termino') => {
    if (date) {
      if (type === 'inicio') {
        setFechaInicio(date as Dayjs);
        setFechaTermino((date as Dayjs).add(1, 'y'));
        form.setFieldValue('desde', date as Dayjs);
        form.setFieldValue('hasta', (date as Dayjs).add(1, 'y'));
      } else {
        setFechaTermino(date as Dayjs);
        form.setFieldValue('hasta', (date as Dayjs).add(1, 'y'));
      }
    } else {
      type === 'inicio' ? setFechaInicio(null) : setFechaTermino(null);
      form.setFieldValue('desde', undefined);
      form.setFieldValue('hasta', undefined);
    }
    form.validateFields();
  };

  useEffect(() => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      cedula: selectedContacto?.cedula,
      cel: selectedContacto?.cel,
      email: selectedContacto?.email,
      direccion: {
        calle: selectedContacto?.direccion?.calle,
        sector: selectedContacto?.direccion?.sector,
        municipio: { codigo: selectedContacto?.direccion?.municipio.codigo },
      },
    });
    form.validateFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedContacto]);

  useEffect(() => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      cedula: '',
      cel: '',
      email: '',
      direccion: {
        calle: '',
        sector: '',
        municipio: { codigo: '' },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form name={name} form={form} autoComplete="off" {...formItemLayout} onFinish={next}>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
          <Autocomplete type="Contratante" />
          <Form.Item name="cedula" label="Cédula">
            <Input placeholder="XXX-XXXXXXX-X" value={selectedContacto?.cedula || ''} required disabled />
          </Form.Item>

          <Form.Item name={['direccion', 'calle']} label="Calle">
            <Input placeholder="" value={selectedContacto?.direccion.calle || ''} required disabled />
          </Form.Item>

          <Form.Item name={['direccion', 'sector']} label="Sector">
            <Input placeholder="" value={selectedContacto?.direccion?.sector || ''} required disabled />
          </Form.Item>

          <Form.Item name={['direccion', 'municipio', 'codigo']} label="Municipio">
            <Input placeholder="" value={selectedContacto?.direccion?.municipio.codigo || ''} required disabled />
          </Form.Item>

          <Form.Item name="cel" label="Celular">
            <Input placeholder="" value={selectedContacto?.cel || ''} disabled />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input placeholder="" value={selectedContacto?.email || ''} disabled />
          </Form.Item>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
          <Autocomplete type="Vendedor" form={form} disabled={!!!form.getFieldValue('contratante')} />

          <Form.Item
            name="plan"
            label="Plan"
            rules={[
              {
                required: true,
                message: `Seleccione un plan`,
              },
            ]}
          >
            <Select
              allowClear
              options={planes.map((item) => ({ value: item.nombre, label: item.nombre }))}
              onChange={(plan) => {
                form.setFieldValue('valor', undefined);
                form.setFieldValue('prima', undefined);
                if (plan) {
                  const montos = planes.filter((item) => item.nombre === plan)[0].valor;
                  setMontos(montos);
                  setPrima(null);
                } else {
                  setMontos([]);
                  setPrima(null);
                }
              }}
              placeholder="Elija una cobertura"
            />
          </Form.Item>

          {!!form.getFieldValue('plan') ? (
            <Form.Item
              name="valor"
              label="Monto Asegurado"
              rules={[
                {
                  required: true,
                  message: `Seleccione un valor`,
                },
              ]}
            >
              <Select
                allowClear
                options={montos?.map((item) => ({ value: item, label: item }))}
                onChange={(valor) => {
                  form.setFieldValue('prima', null);
                  if (valor) {
                    const plan = planes.filter((item) => item.nombre === form.getFieldValue('plan'))[0];
                    const index = plan.valor.findIndex((value) => value === valor);
                    setPrima(plan.prima[index]);
                    form.setFieldValue('prima', plan.prima[index]);
                  } else {
                    setPrima(null);
                  }
                }}
                placeholder="Elija un valor para asegurar"
              />
            </Form.Item>
          ) : null}

          {!!form.getFieldValue('valor') ? (
            <Form.Item name="prima" label="Prima">
              <Input placeholder={prima?.toLocaleString() || ''} value={prima?.toLocaleString() || 0} disabled />
            </Form.Item>
          ) : null}

          <Form.Item
            name="desde"
            label="Fecha de inicio"
            rules={[
              {
                required: true,
                message: `Seleccione una fecha de inicio`,
              },
            ]}
          >
            <DatePicker
              onChange={(e) => {
                onFechaChange(e, 'inicio');
              }}
              value={desde}
              format="DD/MM/YYYY"
              placeholder="Inicio"
            />
          </Form.Item>
          <Form.Item
            name="hasta"
            label="Fecha de término"
            rules={[
              {
                required: true,
                message: `Seleccione una fecha de término`,
              },
            ]}
          >
            <DatePicker
              onChange={(e) => {
                onFechaChange(e, 'termino');
              }}
              value={hasta}
              format="DD/MM/YYYY"
              placeholder="Término"
            />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default Contratante;
