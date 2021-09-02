import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  title: string;
  status: string;
  duration: number;
  isClosable: boolean;
  isOpen: boolean;
}

const initialState: ToastState = {
  title: "",
  status: "success",
  duration: 5000,
  isClosable: true,
  isOpen: false,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    open(state, action: PayloadAction<ToastState>) {
      state.title = action.payload.title;
      state.status = action.payload.status;
      state.isOpen = true;
    },
  },
});

export const { open } = toastSlice.actions;
export default toastSlice.reducer;
