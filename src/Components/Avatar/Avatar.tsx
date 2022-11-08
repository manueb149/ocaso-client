import { Avatar as AvatarIcon, Button, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UserBox from '../UserBox/UserBox';

import styles from './Avatar.module.scss';

/**
 * Avatar icon for the header.
 * @return {JSX.Element} Avatar icon JSX
 */
const Avatar: React.FC = (): JSX.Element => (
  <Popover placement="bottomRight" content={<UserBox />} trigger="click">
    <Button className={styles['avatar-button']}>
      <AvatarIcon className={styles['ant-avatar']} icon={<UserOutlined />} />
    </Button>
  </Popover>
);

export default Avatar;
