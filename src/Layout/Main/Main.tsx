import { Layout } from 'antd';
import Modals from '../../Components/Modals';

const { Content } = Layout;

interface Props extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

/**
 * Set the layout for the Main section.
 * @return {JSX.Element} Main Section JSX
 */
const Main: React.FC<Props> = ({ children, ...rest }): JSX.Element => {
  return (
    <Content>
      <main {...rest}>{children}</main>
      <Modals />
    </Content>
  );
};

export default Main;
