import type { AppProps } from 'next/app';
import type { MenuProps } from 'antd';

export type CustomAppProps<T> = AppProps<T> & {
  Component: NextPageWithLayout;
};

export type NextPageWithLayout = AppProps['Component'] & {
  layout?: React.ElementType;
};

export type PaginatedResult<T> = {
  results: T[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
};

// LAYOUT
export type MenuItem = Required<MenuProps>['items'][number];

// NOTIFICAION
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

// CONTACTS
export type TipoContacto = 'EMPRESA' | 'VENDEDOR' | 'CLIENTE';
