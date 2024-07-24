import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOAST_ERROR, TOAST_SUCCESS, TOAST_WARNING } from "@/utils/FunctionUiHelpers";
import { IHistory } from "@/interfaces/IHistory";
import { IService } from "@/interfaces/IService";
import { RootState } from "../store";
import { createHistory, editHistory, getHistories } from "../slices/historySlice";

interface IHistoryState {
    loading: boolean;
    status: 'pending' | 'completed' | 'rejected';
    edit: 'wait' | 'success' | 'fail';
    data?: IHistory[];
    drawer: boolean;
    history_id?: string;
    modal: boolean;
    services?: IService[];
};

const initialState: IHistoryState = {
    loading: false,
    status: 'completed',
    edit: 'success',
    data: [],
    drawer: false,
    history_id: '',
    modal: false,
    services: [],
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        toggleDrawer: (state) => {
            state.drawer = !state.drawer;
        },
        setHistoryId: (state, action: PayloadAction<string>) => {
            state.history_id = action.payload;
        },
        toggleModal: (state) => {
            state.modal = !state.modal;
        },
        addService: (state, action: PayloadAction<IService>) => {
            const service = action.payload;
            if(state.services?.find(s => s.id === service.id)) {
                TOAST_WARNING("Dịch vụ đã được thêm!");
            }else{
                state.services?.push(service);
            }
        },
        removeService: (state, action: PayloadAction<number>) => {
            const service_id = action.payload;
            const index = state.services?.findIndex(s => s.id === service_id);
            if (index) {
                state.services?.splice(index, 1);
            }
        },
        editService: (state, action: PayloadAction<IService>) => {
            const service = action.payload;
            const index = state.services?.findIndex(s => s.id === service.id);
            if (index && state.services) {
                state.services[index].price = service.price;
                state.services[index].quantity = service.quantity;
            } else {
                TOAST_WARNING("Dịch vụ không tồn tại!");
            }
        },
        clearService: (state) => {
            state.services = [];
        },
        setServices: (state, action: PayloadAction<IService[]>) => {
            state.services = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getHistories.pending, (state) => {
                state.status = 'pending';
                state.loading = true;
            })
            .addCase(getHistories.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(getHistories.rejected, (state, action: any) => {
                state.data = [];
                state.loading = false;
                TOAST_ERROR(action.error?.message)
            })
            .addCase(createHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(createHistory.fulfilled, (state, action) => {
                state.status = 'completed';
                state.loading = false;
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(createHistory.rejected, (state, action: any) => {
                state.status = 'rejected';
                state.loading = false;
                TOAST_ERROR(action.error?.message)
            })
            .addCase(editHistory.pending, (state) => {
                state.edit = 'wait';
            })
            .addCase(editHistory.fulfilled, (state, action) => {
                state.status = 'completed';
                state.edit = 'success';
                TOAST_SUCCESS(action.payload.message);
            })
            .addCase(editHistory.rejected, (state, action: any) => {
                state.status = 'rejected';
                state.edit = 'fail';
                TOAST_ERROR(action.error?.message)
            })
    }
});

export const getHistoryState = (state: RootState) => state.history;
export const { toggleDrawer, setHistoryId, toggleModal, addService, removeService, editService, clearService, setServices } = historySlice.actions;
export default historySlice.reducer;