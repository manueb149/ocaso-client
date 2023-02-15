import React from 'react';
import { Descriptions } from 'antd';
import { IDependientes } from '../../../models/interfaces.model';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../config/configureStore';
import type { Dayjs } from 'dayjs';
import { Table as TableAnt } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import { DependientesOptions, SexoOptions } from '../../Dependientes/Dependientes';

interface ContratanteInfo {
  hasta: Dayjs | string;
  desde: Dayjs | string;
  plan: string;
  prima: string;
  pago: string;
  valor: number;
  vendedor: string;
}

interface Props {
  contratanteInfo: ContratanteInfo;
  dependientesInfo: IDependientes[];
}

const columns: ColumnsType<IDependientes> = [
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
  },
  {
    title: 'Cédula',
    dataIndex: 'cedula',
    key: 'cedula',
  },
  {
    title: 'Fecha de Nacimiento',
    dataIndex: 'dob',
    key: 'dob',
    render: (value) => new Date(value).toLocaleDateString(),
  },
  {
    title: 'Sexo',
    dataIndex: 'sexo',
    key: 'sexo',
    render: (value) => SexoOptions.find((item) => item.value === value)?.label,
  },
  {
    title: 'Parentezco',
    dataIndex: 'parentezco',
    key: 'parentezco',
    render: (value) => DependientesOptions.find((item) => item.value === value)?.label,
  },
];

/**
 * Review form step screen.
 * @return {JSX.Element} Loading screen JSX
 */
const Review: React.FC<Props> = ({ contratanteInfo, dependientesInfo }) => {
  const { selectedContacto } = useSelector((state: RootState) => state.contacto);

  if (!selectedContacto) return <div></div>;
  const { nombres, apellidos, cedula, direccion, tel, email } = selectedContacto;

  return (
    <>
      <Descriptions title="Datos del Cliente" layout="horizontal" bordered column={2} size="small">
        <Descriptions.Item label="Contratante">
          {nombres} {apellidos}
        </Descriptions.Item>
        <Descriptions.Item label="Cédula" span={1}>
          {cedula}
        </Descriptions.Item>
        <Descriptions.Item label="Dirección" span={1}>
          {direccion?.calle ?? ''}, {direccion?.sector ?? ''}, {direccion?.municipio?.nombre ?? ''}
        </Descriptions.Item>
        <Descriptions.Item label="País" span={1}>
          {direccion?.pais?.nombre}
        </Descriptions.Item>
        <Descriptions.Item label="Telefono" span={1}>
          {tel}
        </Descriptions.Item>
        <Descriptions.Item label="Correo Electrónico" span={1}>
          {email}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="Plan/Prima" layout="vertical" bordered column={4} style={{ marginTop: '20px' }} size="small">
        <Descriptions.Item label="Plan">{contratanteInfo.plan}</Descriptions.Item>
        <Descriptions.Item label="Valor Asegurado">{Number(contratanteInfo.valor).toLocaleString()}</Descriptions.Item>
        <Descriptions.Item label="Forma de pago">{contratanteInfo.pago}</Descriptions.Item>
      </Descriptions>
      <Descriptions
        title="Detalle de Dependientes"
        layout="vertical"
        bordered
        column={1}
        style={{ marginTop: '20px' }}
      ></Descriptions>
      <TableAnt columns={columns} dataSource={dependientesInfo} pagination={false} />
      <Descriptions
        title="Pago"
        layout="horizontal"
        bordered
        column={1}
        style={{ marginTop: '20px', width: '400px' }}
        size="small"
      >
        <Descriptions.Item label="Prima">0</Descriptions.Item>
        <Descriptions.Item label="Extra Prima">0</Descriptions.Item>
        <Descriptions.Item label="ITBS">0</Descriptions.Item>
        <Descriptions.Item label={<b>TOTAL</b>}>0</Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default Review;
