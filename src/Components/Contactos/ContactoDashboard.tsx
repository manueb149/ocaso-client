import { Card, Col, Row } from 'antd';
import Image from 'next/image';

interface Props {}

const dashboardItems: {
  title: string;
  icon: string;
  quantity: string;
}[] = [
  {
    title: 'Contactos Afiliados (mes)',
    icon: 'https://icongr.am/material/account-check.svg?size=128&color=000000',
    quantity: '45',
  },
  {
    title: 'Contactos Nuevos (mes)',
    icon: 'https://icongr.am/material/account-plus.svg?size=128&color=000000',
    quantity: '93',
  },
  {
    title: 'Contactos totales',
    icon: 'https://icongr.am/material/account-group.svg?size=128&color=000000',
    quantity: '1,350',
  },
];
/**
 * Contactos module
 * @return {JSX.Element} Contactos module JSX
 */
function ContactoDashboard({}: Props): JSX.Element {
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        {dashboardItems.map(({ title, icon, quantity }) => (
          <Col key={title + quantity} span={8}>
            <Card bordered={false}>
              <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <span>{title}</span>
                  <h3>{quantity}</h3>
                </div>
                <Image src={icon} style={{ width: '4rem', height: 'auto' }} alt={'dashboard Item'} />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ContactoDashboard;
