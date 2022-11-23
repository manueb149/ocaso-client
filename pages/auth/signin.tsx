import { Fragment, useState } from 'react';
import { NextPage } from 'next';
import { signIn, SignInResponse } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ILoginForm } from '../../src/models/interfaces.model';
import { Button, Card, Col, Form, Input, Row, Spin, Typography } from 'antd';
import { Modules } from '../../src/models/enums.model';
import { Notify } from '../../config/notifications';
const { Title } = Typography;

import styles from '../../src/styles/Pages/Auth/Signin.module.scss';

interface Props {}

/**
 * SignIn page
 * @return {JSX.Element} Solicitudes module JSX
 */
const SignIn: NextPage<Props> = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm<ILoginForm>();

  const onSubmit = (values: ILoginForm) => {
    const lastTab = (localStorage.getItem('lastTab') as Modules) || Modules.Solicitudes;
    setLoading(true);
    signIn('credentials', {
      redirect: false,
      ...values,
    })
      .then((result: SignInResponse | undefined) => {
        setLoading(false);
        if (result?.error) {
          Notify('error', `${result?.error}`);
        } else {
          router.push(`/${lastTab}`);
        }
      })
      .catch((error) => {
        Notify('error', `${error}`);
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <section className={styles['login-container']}>
        <div className={styles['overlay']}></div>
        <Row
          justify="center"
          align="middle"
          style={{
            height: '100vh',
          }}
        >
          <Col xs={22}>
            <div className="container" style={{ maxWidth: '408px', margin: 'auto' }}>
              <Card
                className={styles['login-form']}
                title={
                  <Title level={2} className="title" style={{ textAlign: 'center', color: '#77ade7' }}>
                    Iniciar Sesión
                  </Title>
                }
                headStyle={{ borderBottom: 0 }}
                bodyStyle={{ padding: '24px', textAlign: 'center' }}
              >
                <Form<ILoginForm> layout="vertical" form={form} onFinish={onSubmit} requiredMark={false}>
                  <Form.Item
                    name="email"
                    label="Usuario"
                    rules={[{ required: true, message: 'Ingrese su usuario' }]}
                    style={{ color: '#050550' }}
                  >
                    <Input type="email" size="large" placeholder="usuario" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Clave"
                    rules={[{ required: true, message: 'Ingrese su clave' }]}
                    style={{ marginBottom: '12px' }}
                  >
                    <Input.Password placeholder="escriba su clave aquí" size="large" />
                  </Form.Item>
                  <div style={{ height: '12px', color: '#050550' }}></div>
                  <Button
                    className={styles['ant-btn-primary']}
                    type="primary"
                    size="large"
                    htmlType="submit"
                    block
                    disabled={loading}
                  >
                    {loading ? <Spin size="small" /> : 'Entrar'}
                  </Button>
                </Form>
              </Card>
            </div>
          </Col>
        </Row>
      </section>
    </Fragment>
  );
};

export default SignIn;
