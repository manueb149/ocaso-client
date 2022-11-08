import { useEffect, useState } from 'react';
import { Menu, Layout } from 'antd';
import { CopyOutlined, FileDoneOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';
import { Modules } from '../../models/enums.model';
import { useRouter } from 'next/router';

const { Sider } = Layout;

/**
 * Set the layout for the Sidebar section.
 * @return {JSX.Element} Sidebar section JSX
 */
const Sidebar: React.FC = (): JSX.Element => {
  const [collapsed] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Modules>(
    Modules.Solicitudes
  );
  const router = useRouter();

  const onChangePath = (event: MenuInfo) => {
    localStorage.setItem('lastTab', event.key);
    setSelectedModule(event.key as Modules);
    router.push(`/${event.key}`);
  };

  useEffect(() => {
    setSelectedModule(
      (localStorage.getItem('lastTab') as Modules) || Modules.Solicitudes
    );
    // if (pageWidth <= 992) dispatch(setEnableClosedSidebar(true));
  }, []);

  return (
    <aside>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          // dispatch(setEnableClosedSidebar(broken));
          // dispatch(setAutoClosedSidebar(broken));
        }}
        collapsedWidth="70px"
      >
        {/* <div className="logo" /> */}
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[Modules.Solicitudes]}
          selectedKeys={[selectedModule]}
          items={[
            {
              key: Modules.Solicitudes,
              icon: <CopyOutlined />,
              label: 'Solicitudes',
            },
            {
              key: Modules.Contratos,
              icon: <FileDoneOutlined />,
              label: 'Contratos',
            },
          ]}
          onClick={(e) => onChangePath(e)}
        />
      </Sider>
    </aside>
  );
};

export default Sidebar;
