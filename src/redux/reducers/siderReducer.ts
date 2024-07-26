import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ISiderState {
    sider: boolean;
}

const initialState: ISiderState = {
    sider: true,
};

const siderSlice = createSlice({
    name: "sider",
    initialState,
    reducers: {
        toggleSider: (state) => {
          state.sider = !state.sider;
        },
    },
});

export const getSiderState = (state: RootState) => state.sider;
export const { toggleSider } = siderSlice.actions;
export default siderSlice.reducer;