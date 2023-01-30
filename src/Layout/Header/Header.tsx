import { createElement, Fragment } from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Avatar from '../../Components/Avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../config/configureStore';
import { setSidebarClosed } from '../../../slices/layout.slice';

const { Header: HeaderLayour } = Layout;

/**
 * Set the layout for the Header section.
 * @return {JSX.Element} Header Section JSX
 */
const Header: React.FC = (): JSX.Element => {
  const { isSidebarClosed } = useSelector((state: RootState) => state.layout);
  const dispatch = useDispatch<AppDispatch>();
  const autoClosedSidebar = false;

  return (
    <Fragment>
      <HeaderLayour
        className="app-header site-layout-background"
        style={{
          padding: 0,
        }}
      >
        {createElement(isSidebarClosed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => {
            if (!autoClosedSidebar) dispatch(setSidebarClosed(!isSidebarClosed));
          },
        })}
        <Avatar />
      </HeaderLayour>
    </Fragment>
  );
};

export default Header;
