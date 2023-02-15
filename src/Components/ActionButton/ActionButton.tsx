import { Button, Popconfirm, Tooltip } from 'antd';
import { IContacto } from '../../models/interfaces.model';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../config/configureStore';
import { eliminarContacto, setViewContacto, verContactos } from '../../../slices/contacto.slice';
import { ITableParams } from '../../../slices/models/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { setViewContactoModal } from '../../../slices/layout.slice';

interface Props extends React.HTMLProps<HTMLElement> {
  record: IContacto;
  confirmModal?: boolean;
  title?: string;
  action: 'Ver' | 'Editar' | 'Eliminar';
  icon: IconDefinition;
  danger?: boolean;
  table: 'solicitudes' | 'contactos';
}

const ActionButton = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = (params?: ITableParams) => {
    dispatch(verContactos(params));
  };

  const handleActionContacto = (contacto: IContacto) => {
    if (props.table === 'contactos') {
      switch (props.action) {
        case 'Ver':
          dispatch(setViewContacto(props.record));
          dispatch(setViewContactoModal(true));
          break;
        case 'Editar':
          break;
        case 'Eliminar':
          dispatch(eliminarContacto({ id: contacto.id!, fetchData }));
          break;
        default:
          break;
      }
    }
    if (props.table === 'solicitudes') {
      switch (props.action) {
        case 'Ver':
          break;
        case 'Editar':
          break;
        case 'Eliminar':
          break;
        default:
          break;
      }
    }
  };

  return (
    <Tooltip title={props.action} placement="bottom">
      {props.confirmModal && (
        <Popconfirm
          placement="topLeft"
          title={props.title}
          description={<p>Seguro que desea {props.action.toLowerCase()} este contacto?</p>}
          onConfirm={() => handleActionContacto(props.record)}
          okText="Si"
          cancelText="No"
        >
          <Button shape="circle" style={{ margin: 0, padding: '0' }} danger={props.danger}>
            <FontAwesomeIcon icon={props.icon} />
          </Button>
        </Popconfirm>
      )}
      {!props.confirmModal && (
        <Button
          shape="circle"
          style={{ margin: 0, padding: '0' }}
          onClick={() => handleActionContacto(props.record)}
          danger={props.danger}
        >
          <FontAwesomeIcon icon={props.icon} />
        </Button>
      )}
    </Tooltip>
  );
};

export default ActionButton;
