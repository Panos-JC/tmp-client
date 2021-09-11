import { createSlice } from "@reduxjs/toolkit";

interface DrawerState {
  isOpen: boolean;
}

const initialState: DrawerState = {
  isOpen: false,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    toggleOpen(state: DrawerState) {
      state.isOpen = !state.isOpen;
    },
    closeDrawer(state: DrawerState) {
      state.isOpen = false;
    },
  },
});

export const { toggleOpen, closeDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
