import { FormProps } from 'antd';

export const formItemLayout: FormProps = {
  labelCol: { xs: { span: 12 }, sm: { span: 8 }, md: { span: 8 }, lg: { span: 5 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 24 }, md: { span: 12 }, lg: { span: 16 } },
  colon: false,
  layout: 'horizontal',
  labelWrap: true,
  // labelAlign: 'left',
  requiredMark: true,
  scrollToFirstError: true,
};

export const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
    md: {
      span: 24,
    },
    lg: {
      span: 24,
    },
  },
};
