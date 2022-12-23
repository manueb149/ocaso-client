import React from 'react';
import { Descriptions } from 'antd';
import { IDependientes } from '../../../models/interfaces.model';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../config/configureStore';
import type { Dayjs } from 'dayjs';
import { Table as TableAnt } from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';

interface ContratanteInfo {
  hasta: Dayjs | string;
  desde: Dayjs | string;
  plan: string;
  prima: string;
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
    render: (value) => value.toLocaleString(),
  },
  {
    title: 'Sexo',
    dataIndex: 'sexo',
    key: 'sexo',
  },
  {
    title: 'Parentezco',
    dataIndex: 'parentezco',
    key: 'parentezco',
  },
  {
    title: 'Prima',
    dataIndex: 'prima',
    key: 'prima',
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
      <Descriptions title="User Info" layout="horizontal" bordered column={2}>
        <Descriptions.Item label="Contratante">
          {nombres} {apellidos}
        </Descriptions.Item>
        <Descriptions.Item label="Cedula">{cedula}</Descriptions.Item>
        <Descriptions.Item label="Direccion">
          {direccion?.calle}, {direccion?.sector}
        </Descriptions.Item>
        <Descriptions.Item label="Municipio">{direccion?.municipio?.nombre}</Descriptions.Item>
        <Descriptions.Item label="Telefono">{tel}</Descriptions.Item>
        <Descriptions.Item label="Correo Elec.">{email}</Descriptions.Item>
      </Descriptions>
      <Descriptions title="Prima/Plan" layout="vertical" bordered column={3}>
        <Descriptions.Item label="Plan">{contratanteInfo.plan}</Descriptions.Item>
        <Descriptions.Item label="Prima">{contratanteInfo.prima}</Descriptions.Item>
        <Descriptions.Item label="Valor Asegurado">{contratanteInfo.valor}</Descriptions.Item>
      </Descriptions>
      <Descriptions title="Detalle de Pendendientes" layout="vertical" bordered column={3}></Descriptions>
      <TableAnt columns={columns} dataSource={dependientesInfo} pagination={false} />
    </>
  );
};

export default Review;
