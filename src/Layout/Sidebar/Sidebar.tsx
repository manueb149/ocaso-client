import { useEffect } from 'react';
import { Menu, Layout } from 'antd';
import { CopyOutlined, FileAddOutlined, UserOutlined, UserAddOutlined, SearchOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';
import { Modules } from '../../models/enums.model';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../config/configureStore';
import { MenuItem } from '../../models/types.model';
import { setMainSectionLoading, setSelectedModule } from '../../../slices/layout.slice';
import { getItem } from '../../../utils/getItem';

const { Sider } = Layout;

/**
 * Set the layout for the Sidebar section.
 * @return {JSX.Element} Sidebar section JSX
 */
const Sidebar: React.FC = (): JSX.Element => {
  const items: MenuItem[] = [
    getItem('Solicitudes', Modules.Solicitudes, <CopyOutlined style={{ fontSize: '15px' }} />, [
      getItem('Ver', `${Modules.Solicitudes}/ver`, <SearchOutlined style={{ fontSize: '15px' }} />),
      getItem('Crear', `${Modules.Solicitudes}/crear`, <FileAddOutlined style={{ fontSize: '15px' }} />),
    ]),
    getItem('Contactos', Modules.Contactos, <UserOutlined style={{ fontSize: '15px' }} />, [
      getItem('Ver', `${Modules.Contactos}/ver`, <SearchOutlined style={{ fontSize: '15px' }} />),
      getItem('Crear', `${Modules.Contactos}/crear`, <UserAddOutlined style={{ fontSize: '15px' }} />),
    ]),
  ];

  const { isSidebarClosed, isMainSectionLoading } = useSelector((state: RootState) => state.layout);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    dispatch(setSelectedModule((localStorage.getItem('lastTab') as Modules) || Modules.Solicitudes));
    // if (pageWidth <= 992) dispatch(setEnableClosedSidebar(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangePath = (event: MenuInfo) => {
    const currentPath = `${event.key}`;
    dispatch(setSelectedModule(event.key as Modules));
    if (currentPath !== router.asPath.slice(1)) {
      dispatch(setMainSectionLoading(true));
    }
    router.push(`/${currentPath}`);
  };

  return (
    <aside>
      <Sider
        theme="dark"
        trigger={null}
        collapsible
        collapsed={isSidebarClosed}
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
          selectedKeys={[router.asPath.slice(1)]}
          items={items}
          onClick={(e) => onChangePath(e)}
          style={{ fontWeight: '500' }}
          disabled={isMainSectionLoading}
        />
      </Sider>
    </aside>
  );
};

export default Sidebar;
