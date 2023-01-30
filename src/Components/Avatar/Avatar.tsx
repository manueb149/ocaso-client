import { Avatar as AvatarIcon, Button, Popover } from 'antd';
import UserBox from '../UserBox/UserBox';
import { useSession } from 'next-auth/react';

/**
 * Avatar icon for the header.
 * @return {JSX.Element} Avatar icon JSX
 */
const Avatar: React.FC = (): JSX.Element => {
  const { data } = useSession();

  return (
    <Popover placement="bottomRight" content={<UserBox />} trigger="click">
      <Button
        style={{
          width: '35px',
          height: '35px',
          position: 'relative',
          borderRadius: '50%',
          border: 'none',
          marginRight: '25px',
          padding: '0',
        }}
      >
        <AvatarIcon
          style={{
            background: '#001628',
            fontSize: '19px',
            width: '35px',
            height: '35px',
            position: 'relative',
            top: '50%',
            left: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {data?.user?.name![0].toUpperCase()}
        </AvatarIcon>
      </Button>
    </Popover>
  );
};
export default Avatar;
