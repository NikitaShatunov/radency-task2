import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isModal: Boolean;
  isEdit: Boolean;
  currentEdit: number | null;
}

const initialState: InitialState = {
  isModal: false,
  isEdit: false,
  currentEdit: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalState(state, action) {
      state.isModal = action.payload;
    },
    setIsEdit(state, action) {
      state.isEdit = action.payload;
    },
    setCurrentEdit(state, action) {
      state.currentEdit = action.payload
    }
  },
});
export const { setModalState, setIsEdit, setCurrentEdit } = modalSlice.actions;
export default modalSlice.reducer;
