import contactoSlice from './contacto.slice';
import layoutSlice from './layout.slice';
import solicitudSlice from './solicitud.slice';
import tableSlice from './table.slice';

const reducers = {
  layout: layoutSlice,
  contacto: contactoSlice,
  table: tableSlice,
  solicitud: solicitudSlice,
};

export default reducers;
