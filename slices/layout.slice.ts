import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Modules } from '../src/models/enums.model';
import { ILayoutState } from './models/interfaces';

const initialState: ILayoutState = {
  isSidebarClosed: false,
  isMainSectionLoading: false,
  selectedModule: Modules.Solicitudes,
  isAlertsModalOpen: false,
  isConfigModalOpen: false,
  isNewPasswordModalOpen: false,
  isViewContactoModalOpen: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialState,
  reducers: {
    setSidebarClosed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarClosed = action.payload;
    },
    setMainSectionLoading: (state, action: PayloadAction<boolean>) => {
      state.isMainSectionLoading = action.payload;
    },
    setSelectedModule: (state, action: PayloadAction<Modules>) => {
      state.selectedModule = action.payload;
    },
    setToggleAlertsModal: (state, action: PayloadAction<boolean>) => {
      state.isAlertsModalOpen = action.payload;
    },
    setToggleConfigModal: (state, action: PayloadAction<boolean>) => {
      state.isConfigModalOpen = action.payload;
    },
    setToggleNewPasswordModal: (state, action: PayloadAction<boolean>) => {
      state.isNewPasswordModalOpen = action.payload;
    },
    setViewContactoModal: (state, action: PayloadAction<boolean>) => {
      state.isViewContactoModalOpen = action.payload;
    },
  },
});

export const {
  setSidebarClosed,
  setMainSectionLoading,
  setSelectedModule,
  setToggleAlertsModal,
  setToggleConfigModal,
  setToggleNewPasswordModal,
  setViewContactoModal,
} = layoutSlice.actions;

export default layoutSlice.reducer;
