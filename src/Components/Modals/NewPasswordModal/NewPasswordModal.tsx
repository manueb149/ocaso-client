import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../config/configureStore';
import { useSelector } from 'react-redux';
import { Button, Form, Input, Modal } from 'antd';
import { useEffect } from 'react';
import { Notify } from '../../../../config/notifications';
import { setToggleNewPasswordModal } from '../../../../slices/layout.slice';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const NewPasswordModal = () => {
  const [form] = Form.useForm<{ password: string; confirm: string }>();
  const { isNewPasswordModalOpen } = useSelector((state: RootState) => state.layout);
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = (status: boolean = false) => {
    form.resetFields();
    dispatch(setToggleNewPasswordModal(status));
  };

  const onFinish = () => {
    form
      .validateFields()
      .then((value) => {
        console.log(value);
        handleClose(false);
      })
      .catch(() => {
        Notify('warn', 'Favor completar los campos correctamente', 5000);
      });
  };

  useEffect(() => {
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      destroyOnClose
      centered
      title="Recuperar clave"
      open={isNewPasswordModalOpen}
      onOk={onFinish}
      onCancel={() => {
        handleClose(false);
      }}
      bodyStyle={{
        padding: '10px 20px 0px 10px',
        width: '100%',
        height: '100%',
        overflowX: 'auto',
      }}
      footer={[
        <Button key="back" onClick={() => handleClose(false)}>
          Cerrar
        </Button>,
        <Button key="submit" type="primary" onClick={onFinish}>
          Cambiar
        </Button>,
      ]}
    >
      <Form {...formItemLayout} form={form} name="changePassword" onFinish={onFinish} scrollToFirstError>
        <Form.Item
          name="password"
          label="Clave nueva"
          rules={[
            {
              required: true,
              message: 'Favor ingresar una clave',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Repetir clave nueva"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Favor ingresar una clave',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Las dos claves que ingresó no coinciden'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewPasswordModal;
