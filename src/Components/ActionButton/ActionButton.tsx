import { Button, Popconfirm, Tooltip } from 'antd';
import { IContacto, ISolicitud } from '../../models/interfaces.model';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../config/configureStore';
import { eliminarContacto, setEditContacto, setViewContacto, verContactos } from '../../../slices/contacto.slice';
import { ITableParams } from '../../../slices/models/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { setViewContactoModal, setViewSolicitudModal } from '../../../slices/layout.slice';
import { useRouter } from 'next/router';
import { setViewSolicitud } from '../../../slices/solicitud.slice';

interface Props extends React.HTMLProps<HTMLElement> {
  record: IContacto | ISolicitud;
  confirmModal?: boolean;
  title?: string;
  action: 'Ver' | 'Editar' | 'Eliminar';
  icon: IconDefinition;
  danger?: boolean;
  table: 'solicitudes' | 'contactos';
}

const ActionButton = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = (params?: ITableParams) => {
    dispatch(verContactos(params));
  };

  const handleAction = () => {
    if (props.table === 'contactos') {
      switch (props.action) {
        case 'Ver':
          dispatch(setViewContacto(props.record as IContacto));
          dispatch(setViewContactoModal(true));
          break;
        case 'Editar':
          dispatch(setEditContacto(props.record as IContacto));
          router.push('/contactos/editar');
          break;
        case 'Eliminar':
          dispatch(eliminarContacto({ id: (props.record as IContacto).id!, fetchData }));
          break;
        default:
          break;
      }
    }
    if (props.table === 'solicitudes') {
      switch (props.action) {
        case 'Ver':
          dispatch(setViewSolicitud(props.record as ISolicitud));
          dispatch(setViewSolicitudModal(true));
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
          description={<p>Seguro que desea {props.action.toLowerCase()} este dato?</p>}
          onConfirm={() => handleAction()}
          okText="Si"
          cancelText="No"
        >
          <Button shape="circle" style={{ margin: 0, padding: '0' }} danger={props.danger}>
            <FontAwesomeIcon icon={props.icon} />
          </Button>
        </Popconfirm>
      )}
      {!props.confirmModal && (
        <Button shape="circle" style={{ margin: 0, padding: '0' }} onClick={() => handleAction()} danger={props.danger}>
          <FontAwesomeIcon icon={props.icon} />
        </Button>
      )}
    </Tooltip>
  );
};

export default ActionButton;
