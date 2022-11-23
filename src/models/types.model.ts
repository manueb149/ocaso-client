import type { AppProps } from 'next/app';
import type { MenuProps } from 'antd';

export type CustomAppProps<T> = AppProps<T> & {
  Component: NextPageWithLayout;
};

export type NextPageWithLayout = AppProps['Component'] & {
  layout?: React.ElementType;
};

// LAYOUT
export type MenuItem = Required<MenuProps>['items'][number];

// NOTIFICAION
export type NotificationType = 'success' | 'info' | 'warning' | 'error';
