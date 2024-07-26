import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IModalState {
    modalHeader: boolean;
}

const initialState: IModalState = {
    modalHeader: false,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        toggleModalHeader: (state) => {
            state.modalHeader = !state.modalHeader;
        },
    },
});

export const getModalState = (state: RootState) => state.modal;
export const { toggleModalHeader } = modalSlice.actions;
export default modalSlice.reducer;