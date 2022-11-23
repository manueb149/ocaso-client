import { FormProps } from 'antd';

export const residencesFormItemData = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

export const formItemLayout: FormProps = {
  // labelCol: {
  //   xs: { span: 24 },
  //   sm: { span: 24 },
  //   md: { span: 16 },
  //   lg: { span: 8 },
  // },
  // wrapperCol: {
  //   xs: { span: 24 },
  //   sm: { span: 24 },
  //   md: { span: 16 },
  //   lg: { span: 8 },
  // },
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
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
