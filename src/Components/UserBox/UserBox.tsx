import { Badge } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faPowerOff, faKey, faCog } from '@fortawesome/free-solid-svg-icons';
import { signOut, useSession } from 'next-auth/react';

import styles from './UserBox.module.scss';

/**
 * UserBox section for user options.
 * @return {JSX.Element} UserBox section JSX
 */
const UserBox: React.FC = (): JSX.Element => {
  const { data } = useSession();

  const handleLogOut = () => {
    fetch(`/api/auth/logout`).finally(() => signOut());
  };

  return (
    <section className={styles['user-box']}>
      <h6 style={{ marginBottom: '20px', fontWeight: '800', textAlign: 'center' }}>{data?.user?.name!}</h6>
      <h6>Actividades</h6>
      <div className={styles['alerts']}>
        <span className="pointer" onClick={() => {}}>
          <FontAwesomeIcon style={{ marginRight: '5px' }} icon={faExclamationCircle} />
          Alertas
        </span>
        <Badge count={[].length} size="default" style={{ backgroundColor: '#1890ff' }} />
      </div>
      <h6 style={{ marginTop: '15px' }}>Mi Cuenta</h6>
      <div className={styles['account']}>
        <div className="pointer">
          <FontAwesomeIcon style={{ marginRight: '5px' }} icon={faCog} />
          Configurar
        </div>
        <div className="pointer">
          <FontAwesomeIcon style={{ marginRight: '5px' }} icon={faKey} />
          Recuperar Clave
        </div>
        <div className="pointer" onClick={handleLogOut}>
          <FontAwesomeIcon style={{ marginRight: '5px' }} icon={faPowerOff} />
          Salir
        </div>
      </div>
    </section>
  );
};

export default UserBox;
