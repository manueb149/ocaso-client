import { Spin } from 'antd';
import styles from './Loading.module.scss';

/**
 * Loading screen.
 * @return {JSX.Element} Loading screen JSX
 */
const Loading = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Spin />
    </div>
  );
};

export default Loading;
