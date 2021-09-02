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
  },
});

export const { toggleOpen } = drawerSlice.actions;
export default drawerSlice.reducer;
