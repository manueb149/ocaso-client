import { ContactoQuery, ITableParams } from '../slices/models/interfaces';

export const getContactoParams = (params?: ITableParams): ContactoQuery => {
  let filters: {
    limit: number;
    page: number;
    sortBy?: string;
    sexo?: string;
  } = {
    limit: params?.pagination?.pageSize ?? 10,
    page: params?.pagination?.current ?? 1,
  };

  if (params?.filters) {
    for (const filter in params?.filters) {
      if (params?.filters[filter]) {
        filters = {
          ...filters,
          [filter]: !!params?.filters[filter] ? `${params?.filters[filter]![0]}` : undefined,
        };
      }
    }
  }

  if (params?.sorter && !Array.isArray(params?.sorter)) {
    filters = {
      ...filters,
      ...(params?.sorter?.order && { sortBy: `${params?.sorter.field}:${params?.sorter?.order?.substring(0, 4)}` }),
    };
  }
  return {
    ...filters,
  };
};
