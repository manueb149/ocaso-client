import { TableQuery, ITableParams } from '../slices/models/interfaces';

interface CustomTableQuery extends TableQuery {
  [key: string]: string | number | undefined;
}

export const getTableParams = (params?: ITableParams): TableQuery => {
  let filters: CustomTableQuery = {
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
