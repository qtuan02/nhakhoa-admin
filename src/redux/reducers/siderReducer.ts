import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ISiderState {
    isSiderOpen: boolean;
}

const initialState: ISiderState = {
    isSiderOpen: true,
};

const siderSlice = createSlice({
    name: 'sider',
    initialState,
    reducers: {
        toggleSider: (state) => {
          state.isSiderOpen = !state.isSiderOpen;
        },
    },
});

export const getSiderState = (state: RootState) => state.sider;
export const { toggleSider } = siderSlice.actions;
export default siderSlice.reducer;