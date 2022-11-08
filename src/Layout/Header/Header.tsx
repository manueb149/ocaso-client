import { createElement, Fragment, useState } from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Avatar from '../../Components/Avatar/Avatar';

const { Header: HeaderLayour } = Layout;

/**
 * Set the layout for the Header section.
 * @return {JSX.Element} Header Section JSX
 */
const Header: React.FC = (): JSX.Element => {
  const [collapsed, setCollapsed] = useState(false);
  const autoClosedSidebar = false;

  return (
    <Fragment>
      <HeaderLayour
        className="app-header site-layout-background"
        style={{
          padding: 0,
        }}
      >
        {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => {
            if (!autoClosedSidebar) setCollapsed((state) => !state);
          },
        })}
        <Avatar />
      </HeaderLayour>
    </Fragment>
  );
};

export default Header;
