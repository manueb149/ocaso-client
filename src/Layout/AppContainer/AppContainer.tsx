import { ReactNode } from 'react';
import { Layout } from 'antd';

import AppSidebar from '../Sidebar/Sidebar';
import AppHeader from '../Header/Header';
import AppMain from '../Main/Main';

/**
 * Set the layout for the whole App.
 * @return {JSX.Element} App Layout container JSX
 */
const AppContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Layout className="app-container">
      <AppHeader />
      <Layout className="site-layout">
        <AppSidebar />
        <AppMain>{children}</AppMain>
      </Layout>
    </Layout>
  );
};

export default AppContainer;
