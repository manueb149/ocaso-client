import { createSlice } from '@reduxjs/toolkit';
import { Modules } from '../src/models/enums.model';
import { ILayoutState } from './models/interfaces';

const initialState: ILayoutState = {
  isSidebarClosed: false,
  isMainSectionLoading: false,
  selectedModule: Modules.Solicitudes,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialState,
  reducers: {
    setSidebarClosed: (state, action) => {
      state.isSidebarClosed = action.payload;
    },
    setMainSectionLoading: (state, action) => {
      state.isMainSectionLoading = action.payload;
    },
    setSelectedModule: (state, action) => {
      state.selectedModule = action.payload;
    },
  },
});

export const { setSidebarClosed, setMainSectionLoading, setSelectedModule } = layoutSlice.actions;

export default layoutSlice.reducer;
