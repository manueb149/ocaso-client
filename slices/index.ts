import contactoSlice from './contacto.slice';
import layoutSlice from './layout.slice';
import tableSlice from './table.slice';

const reducers = {
  layout: layoutSlice,
  contacto: contactoSlice,
  table: tableSlice,
};

export default reducers;
